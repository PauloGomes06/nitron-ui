/* Nitron.ui.grade — tabela de dados padrão: busca, filtros (em modal), filtros salvos, colunas, ordenação,
   total, seleção e exportação .xlsx. Com `id`, guarda o que cada pessoa configurou (Nitron.pref).

   var g = Nitron.ui.grade(document.querySelector("#lista"), {
     id: "titulos-receber",                // chave das preferências; sem id, nada é guardado
     colunas: [
       { campo: "DTVENC", titulo: "Vencimento", tipo: "data" },
       { campo: "NOMEPARC", titulo: "Parceiro" },
       { campo: "VLRDESDOB", titulo: "Valor", tipo: "moeda", total: true },
       { campo: "SITUACAO", titulo: "Situação", tipo: "situacao",
         situacoes: { LIBERADO: { texto: "Liberado", cor: "ok" }, ATRASADO: { texto: "Atrasado", cor: "erro" } } },
       { campo: "NUFIN", titulo: "Nº único", tipo: "num", oculta: true }   // começa escondida; a pessoa pode mostrar
     ],
     chave: "NUFIN",                       // obrigatório com seleção
     selecao: true,
     acoes: [{ texto: "Trocar conta", tipo: "primario", acao: async (linhas) => {...} }],
     exportar: "titulos-receber",          // nome do arquivo; false esconde o botão
     vazio: "Nenhum título nesta situação.",
     tamPagina: 50,                        // 50 | 100 | 200; a pessoa troca e fica guardado
     aoClicar: (linha) => {...},
     selecionavel: (linha) => linha.NOSSONUM ? "Já tem boleto" : true,   // não-true trava a caixinha; texto vira a dica
     aoAtualizar: (g) => {...}             // depois de cada filtro/busca/carga (ex.: recontar cards de fora)
   });
   g.dados(linhas);   g.selecionadas();   g.visiveis();
   g.filtrar((linha) => ...);   g.filtrar(null);   g.semFiltroExterno();   // filtro de fora (cards), soma com os da grade

   Coluna com `html(v, linha)`: o HTML da célula (já escapado por quem monta); busca, filtro, ordem e Excel usam o texto.

   Tipos: texto (padrão) · codigo (nº de nota/título, sem separador) · num · moeda · pct · data · dataHora · situacao.  `formatar(v, linha)` sobrescreve a exibição. */
(function (N) {
  var F = N.fmt, esc = function (s) { return N.ui.esc(s); };
  var TAMANHOS = [50, 100, 200];
  var XLSX_URL = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";

  function norm(s) {
    return String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  function numero(v) {
    if (v == null || v === "") return null;
    var n = typeof v === "number" ? v : Number(String(v).replace(",", "."));
    return isFinite(n) ? n : null;
  }
  function ehNum(c) { return c.tipo === "num" || c.tipo === "moeda" || c.tipo === "pct" || c.tipo === "codigo"; }
  function ehData(c) { return c.tipo === "data" || c.tipo === "dataHora"; }
  function diaDe(v) { var d = F.paraData(v); return d ? F.data(d).split("/").reverse().join("-") : null; } // AAAA-MM-DD em SP

  function texto(c, v, linha) {
    if (c.formatar) return c.formatar(v, linha);
    switch (c.tipo) {
      case "num": return F.num(v, { casas: c.casas });
      case "codigo": return v == null || v === "" ? F.VAZIO : String(v);
      case "moeda": return F.moeda(v);
      case "pct": return F.pct(v, c.casas);
      case "data": return F.data(v);
      case "dataHora": return F.dataHora(v, { curto: c.curto });
      case "situacao": var s = (c.situacoes || {})[v]; return s ? s.texto : (v == null || v === "" ? F.VAZIO : String(v));
      default: return v == null || v === "" ? F.VAZIO : String(v);
    }
  }
  function celula(c, v, linha) {
    if (c.html) return c.html(v, linha);
    if (c.tipo === "situacao") {
      var s = (c.situacoes || {})[v];
      return '<span class="nui-sit nui-sit-' + (s && s.cor ? s.cor : "neutro") + '">' + esc(texto(c, v, linha)) + "</span>";
    }
    return esc(texto(c, v, linha));
  }

  function grade(alvo, o) {
    var cols = o.colunas || [];
    var porCampo = {};
    cols.forEach(function (c) { porCampo[c.campo] = c; });
    var todas = [], vis = [], sel = {}, busca = "", pagina = 1, externo = null;
    function podeMarcar(l) { return !o.selecionavel || o.selecionavel(l) === true; }
    // o que a pessoa configura (e o que é guardado): filtros = { CAMPO: { de, ate, contem, valores } }
    var estado = {
      ocultas: cols.filter(function (c) { return c.oculta; }).map(function (c) { return c.campo; }),
      ordem: null,
      tamPagina: TAMANHOS.indexOf(o.tamPagina) >= 0 ? o.tamPagina : 50,
      filtros: {},
      salvos: []
    };
    var chavePref = o.id ? "grade:" + o.id : null;
    var tGrava;
    function guarda() {
      if (!chavePref) return;
      clearTimeout(tGrava);
      tGrava = setTimeout(function () { N.pref.gravar(chavePref, estado); }, 300);
    }
    function vcols() { return cols.filter(function (c) { return estado.ocultas.indexOf(c.campo) < 0; }); }

    alvo.classList.add("nui-grade");
    alvo.innerHTML =
      '<div class="nui-g-barra">' +
        '<input class="nui-g-busca" type="search" placeholder="Buscar...">' +
        '<button class="nui-bt nui-bt-secundario nui-g-bfiltros">Filtros</button>' +
        '<button class="nui-bt nui-bt-secundario nui-g-bcolunas">Colunas</button>' +
        '<div class="nui-g-acoes"></div>' +
        (o.exportar === false ? "" : '<button class="nui-bt nui-bt-secundario nui-g-bexp">Exportar Excel</button>') +
      "</div>" +
      '<div class="nui-g-chips" hidden></div>' +
      '<div class="nui-g-rolagem"><table><thead></thead><tbody></tbody><tfoot></tfoot></table></div>' +
      '<div class="nui-g-rodape"><span class="nui-g-info"></span>' +
        '<div class="nui-g-pag">' +
          '<label>Por página <select class="nui-g-tam">' + TAMANHOS.map(function (t) { return '<option value="' + t + '">' + t + "</option>"; }).join("") + "</select></label>" +
          '<button class="nui-g-ir" data-ir="primeira" title="Primeira página">«</button>' +
          '<button class="nui-g-ir" data-ir="anterior" title="Página anterior">‹</button>' +
          '<span class="nui-g-npag"></span>' +
          '<button class="nui-g-ir" data-ir="proxima" title="Próxima página">›</button>' +
          '<button class="nui-g-ir" data-ir="ultima" title="Última página">»</button>' +
        "</div></div>";
    var $ = function (s) { return alvo.querySelector(s); };
    var thead = $("thead"), tbody = $("tbody"), tfoot = $("tfoot"), rodape = $(".nui-g-rodape"), chips = $(".nui-g-chips");

    // ações da seleção
    var botoesAcao = (o.acoes || []).map(function (a) {
      var b = document.createElement("button");
      b.className = "nui-bt nui-bt-" + (a.tipo || "secundario");
      b.onclick = async function () {
        var linhas = selecionadas();
        if (!linhas.length) return;
        b.disabled = true; b.classList.add("nui-girando");
        try { await a.acao(linhas, api); } catch (e) { N.ui.avisar(e && e.message ? e.message : String(e), "erro"); }
        finally { b.classList.remove("nui-girando"); atualizaAcoes(); }
      };
      $(".nui-g-acoes").appendChild(b);
      return { def: a, el: b };
    });
    function atualizaAcoes() {
      var n = Object.keys(sel).length;
      botoesAcao.forEach(function (b) { b.el.disabled = !n; b.el.textContent = b.def.texto + (n ? " (" + n + ")" : ""); });
    }

    function montaCabecalho() {
      var h = "<tr>";
      if (o.selecao) h += '<th class="nui-g-ck"><input type="checkbox" class="nui-g-todos" title="Marcar todas as linhas filtradas (de todas as páginas)"></th>';
      vcols().forEach(function (c) {
        var seta = estado.ordem && estado.ordem.campo === c.campo ? (estado.ordem.asc ? " ▲" : " ▼") : "";
        h += '<th data-campo="' + esc(c.campo) + '" class="' + (ehNum(c) && c.tipo !== "codigo" ? "nui-dir" : "") + '"' + (c.largura ? ' style="min-width:' + c.largura + 'px"' : "") +
             ' title="Clique para ordenar">' + esc(c.titulo || c.campo) + seta + "</th>";
      });
      thead.innerHTML = h + "</tr>";
      thead.querySelectorAll("th[data-campo]").forEach(function (th) {
        th.onclick = function () {
          var k = th.dataset.campo, ord = estado.ordem;
          estado.ordem = ord && ord.campo === k ? (ord.asc ? { campo: k, asc: false } : null) : { campo: k, asc: true };
          guarda();
          aplica();
        };
      });
      var todos = thead.querySelector(".nui-g-todos");
      if (todos) {
        var marcaveis = vis.filter(podeMarcar);
        var marcadas = marcaveis.filter(function (l) { return sel[l[o.chave]]; }).length;
        todos.checked = marcaveis.length > 0 && marcadas === marcaveis.length;
        todos.indeterminate = marcadas > 0 && marcadas < marcaveis.length;
        todos.disabled = !marcaveis.length;
        todos.onchange = function () {
          marcaveis.forEach(function (l) { if (todos.checked) sel[l[o.chave]] = l; else delete sel[l[o.chave]]; });
          desenha();
        };
      }
    }

    function passa(l, semExterno) {
      if (externo && !semExterno && !externo(l)) return false;
      if (busca) {
        var ok = vcols().some(function (c) { return norm(texto(c, l[c.campo], l)).indexOf(busca) >= 0; });
        if (!ok) return false;
      }
      for (var campo in estado.filtros) {
        var f = estado.filtros[campo], c = porCampo[campo], v = l[campo];
        if (!c) continue;
        if (f.valores) { if (f.valores.indexOf(v == null ? "" : String(v)) < 0) return false; }
        else if (ehNum(c)) {
          var n = numero(v);
          if (f.de != null && (n == null || n < f.de)) return false;
          if (f.ate != null && (n == null || n > f.ate)) return false;
        } else if (ehData(c)) {
          var d = diaDe(v);
          if (f.de && (!d || d < f.de)) return false;
          if (f.ate && (!d || d > f.ate)) return false;
        } else if (f.contem && norm(texto(c, v, l)).indexOf(norm(f.contem)) < 0) return false;
      }
      return true;
    }

    // manter = true só quando os dados são recarregados; filtro, busca e ordem voltam para a página 1
    function aplica(manter) {
      if (!manter) pagina = 1;
      vis = todas.filter(function (l) { return passa(l); });
      var ord = estado.ordem, c = ord && porCampo[ord.campo];
      if (c) {
        var m = ord.asc ? 1 : -1;
        vis.sort(function (a, b) {
          var x = a[c.campo], y = b[c.campo];
          if (ehNum(c)) { x = numero(x); y = numero(y); }
          else if (ehData(c)) { x = F.paraData(x); y = F.paraData(y); x = x && x.getTime(); y = y && y.getTime(); }
          else { x = norm(texto(c, x, a)); y = norm(texto(c, y, b)); }
          if (x == null) return 1; if (y == null) return -1;
          return x < y ? -m : x > y ? m : 0;
        });
      }
      desenha();
    }

    function desenha() {
      montaCabecalho();
      var tam = estado.tamPagina, paginas = Math.max(1, Math.ceil(vis.length / tam));
      pagina = Math.min(Math.max(1, pagina), paginas);
      var vc = vcols(), mostra = vis.slice((pagina - 1) * tam, pagina * tam), h = "";
      mostra.forEach(function (l, idx) {
        var k = l[o.chave];
        h += '<tr data-idx="' + idx + '"' + (sel[k] ? ' class="nui-g-marcada"' : "") + ">";
        if (o.selecao) {
          var pode = o.selecionavel ? o.selecionavel(l) : true;
          h += '<td class="nui-g-ck"><input type="checkbox"' + (sel[k] ? " checked" : "") +
               (pode === true ? "" : " disabled" + (typeof pode === "string" ? ' title="' + esc(pode) + '"' : "")) + "></td>";
        }
        vc.forEach(function (c) { h += '<td class="' + (ehNum(c) && c.tipo !== "codigo" ? "nui-dir" : "") + '">' + celula(c, l[c.campo], l) + "</td>"; });
        h += "</tr>";
      });
      if (!mostra.length) {
        var msg = todas.length ? "Nenhuma linha com esses filtros." : (o.vazio || "Nada para mostrar.");
        h = '<tr><td class="nui-g-vazio" colspan="' + (vc.length + (o.selecao ? 1 : 0)) + '">' + esc(msg) + "</td></tr>";
      }
      tbody.innerHTML = h;
      tbody.querySelectorAll("tr[data-idx]").forEach(function (tr) {
        var l = mostra[Number(tr.dataset.idx)];
        var ck = tr.querySelector("input[type=checkbox]");
        if (ck) ck.onclick = function (e) {
          e.stopPropagation();
          if (ck.checked) sel[l[o.chave]] = l; else delete sel[l[o.chave]];
          tr.classList.toggle("nui-g-marcada", ck.checked);
          montaCabecalho(); atualizaAcoes(); rodapeTexto();
        };
        if (o.aoClicar) { tr.classList.add("nui-g-clicavel"); tr.onclick = function () { o.aoClicar(l); }; }
      });

      var temTotal = vc.some(function (c) { return c.total; });
      if (temTotal && vis.length) {
        var f = "<tr>" + (o.selecao ? "<td></td>" : "");
        vc.forEach(function (c, i) {
          if (c.total) {
            var s = vis.reduce(function (a, l) { return a + (numero(l[c.campo]) || 0); }, 0);
            f += '<td class="nui-dir">' + esc(texto(c, s, {})) + "</td>";
          } else f += i === 0 ? "<td>Total</td>" : "<td></td>";
        });
        tfoot.innerHTML = f + "</tr>";
      } else tfoot.innerHTML = "";

      desenhaChips(); atualizaAcoes(); rodapeTexto();
      if (o.aoAtualizar) o.aoAtualizar(api);
    }

    function rodapeTexto() {
      var n = Object.keys(sel).length, tam = estado.tamPagina;
      var paginas = Math.max(1, Math.ceil(vis.length / tam));
      var ini = vis.length ? (pagina - 1) * tam + 1 : 0, fim = Math.min(pagina * tam, vis.length);
      var t = vis.length > tam ? F.num(ini) + "–" + F.num(fim) + " de " + F.num(vis.length) : F.num(vis.length);
      t += vis.length === 1 ? " linha" : " linhas";
      if (vis.length !== todas.length) t += " (filtradas de " + F.num(todas.length) + ")";
      if (n) t += " · " + F.num(n) + " marcada" + (n > 1 ? "s" : "");
      $(".nui-g-info").textContent = t;
      $(".nui-g-tam").value = String(tam);
      $(".nui-g-npag").textContent = "Página " + F.num(pagina) + " de " + F.num(paginas);
      $(".nui-g-pag").hidden = vis.length <= TAMANHOS[0];
      alvo.querySelectorAll(".nui-g-ir").forEach(function (b) {
        b.disabled = (b.dataset.ir === "primeira" || b.dataset.ir === "anterior") ? pagina <= 1 : pagina >= paginas;
      });
      var bexp = $(".nui-g-bexp");
      if (bexp) bexp.disabled = !vis.length;
    }

    function descreve(campo, f) {
      var c = porCampo[campo], nome = c.titulo || c.campo;
      if (f.valores) return nome + ": " + f.valores.map(function (v) { return texto(c, v, {}); }).join(", ");
      if (ehNum(c)) return nome + (f.de != null ? " ≥ " + texto(c, f.de, {}) : "") + (f.ate != null ? " ≤ " + texto(c, f.ate, {}) : "");
      if (ehData(c)) return nome + (f.de ? " de " + F.data(f.de + "T12:00:00") : "") + (f.ate ? " até " + F.data(f.ate + "T12:00:00") : "");
      return nome + " contém \"" + f.contem + "\"";
    }
    function desenhaChips() {
      var ks = Object.keys(estado.filtros).filter(function (k) { return porCampo[k]; });
      chips.innerHTML = ks.map(function (k) {
        return '<span class="nui-chip">' + esc(descreve(k, estado.filtros[k])) + '<button data-k="' + esc(k) + '" title="Tirar filtro">×</button></span>';
      }).join("") + (ks.length > 1 ? '<button class="nui-g-limpar">Limpar filtros</button>' : "");
      chips.hidden = !ks.length;
      chips.querySelectorAll("button[data-k]").forEach(function (b) {
        b.onclick = function () { delete estado.filtros[b.dataset.k]; guarda(); aplica(); };
      });
      var lp = chips.querySelector(".nui-g-limpar");
      if (lp) lp.onclick = function () { estado.filtros = {}; guarda(); aplica(); };
      $(".nui-g-bfiltros").textContent = "Filtros" + (ks.length ? " (" + ks.length + ")" : "");
      var ocultas = estado.ocultas.length;
      $(".nui-g-bcolunas").textContent = "Colunas" + (ocultas ? " (" + (cols.length - ocultas) + " de " + cols.length + ")" : "");
    }

    function clona(x) { return JSON.parse(JSON.stringify(x)); }

    // modal de filtros, montado a partir das colunas; em cima, os filtros salvos da pessoa
    function abreFiltros() {
      var filtraveis = cols.filter(function (c) { return c.filtro !== false; });
      var html = "";
      if (chavePref) {
        html += '<div class="nui-f-salvos"><div class="nui-f-nome">Meus filtros</div><div class="nui-f-lista">' +
          (estado.salvos.length ? estado.salvos.map(function (s, i) {
            return '<span class="nui-chip nui-chip-salvo"><button class="nui-f-usar" data-i="' + i + '">' + esc(s.nome) + '</button><button class="nui-f-apagar" data-i="' + i + '" title="Apagar">×</button></span>';
          }).join("") : '<span class="nui-f-dica">Nenhum ainda. Monte os filtros abaixo e salve com um nome.</span>') +
          "</div></div>";
      }
      html += '<div class="nui-filtros">';
      filtraveis.forEach(function (c, i) {
        var f = estado.filtros[c.campo] || {}, nome = esc(c.titulo || c.campo);
        var distintos = [];
        todas.forEach(function (l) { var v = l[c.campo] == null ? "" : String(l[c.campo]); if (distintos.indexOf(v) < 0) distintos.push(v); });
        var lista = c.tipo === "situacao" || (!ehNum(c) && !ehData(c) && distintos.length <= 12 && distintos.length > 1);
        html += '<div class="nui-f-linha" data-i="' + i + '"><div class="nui-f-nome">' + nome + "</div><div>";
        if (lista) {
          distintos.sort().forEach(function (v) {
            var marcado = f.valores ? f.valores.indexOf(v) >= 0 : false;
            html += '<label class="nui-f-op"><input type="checkbox" value="' + esc(v) + '"' + (marcado ? " checked" : "") + "> " + esc(texto(c, v, {})) + "</label>";
          });
        } else if (ehNum(c) || ehData(c)) {
          var tipo = ehData(c) ? "date" : "number";
          html += '<input class="nui-f-de" type="' + tipo + '" step="any" placeholder="de" value="' + esc(f.de == null ? "" : f.de) + '"> até ' +
                  '<input class="nui-f-ate" type="' + tipo + '" step="any" placeholder="até" value="' + esc(f.ate == null ? "" : f.ate) + '">';
        } else {
          html += '<input class="nui-f-contem" type="text" placeholder="contém..." value="' + esc(f.contem || "") + '">';
        }
        html += "</div></div>";
      });
      html += "</div>";
      if (chavePref) html += '<div class="nui-f-salvar"><input class="nui-f-nomesalvo" type="text" placeholder="Nome para salvar estes filtros (ex.: Vencidos da semana)"><button class="nui-bt nui-bt-secundario nui-f-bsalvar">Salvar filtro</button></div>';

      function lerFormulario(corpo) {
        var novos = {};
        corpo.querySelectorAll(".nui-f-linha").forEach(function (div) {
          var c = filtraveis[Number(div.dataset.i)];
          var cks = div.querySelectorAll("input[type=checkbox]");
          if (cks.length) {
            var vals = [].filter.call(cks, function (k) { return k.checked; }).map(function (k) { return k.value; });
            if (vals.length && vals.length < cks.length) novos[c.campo] = { valores: vals };
            return;
          }
          var de = div.querySelector(".nui-f-de"), ate = div.querySelector(".nui-f-ate"), ct = div.querySelector(".nui-f-contem");
          if (de) {
            var fd = ehNum(c) ? numero(de.value) : (de.value || null), fa = ehNum(c) ? numero(ate.value) : (ate.value || null);
            if (fd != null || fa != null) novos[c.campo] = { de: fd, ate: fa };
          } else if (ct && ct.value.trim()) novos[c.campo] = { contem: ct.value.trim() };
        });
        return novos;
      }

      var m = N.ui.modal({
        titulo: "Filtros",
        conteudo: html,
        tamanho: "m",
        botoes: [
          { texto: "Limpar", tipo: "secundario", acao: function () { estado.filtros = {}; guarda(); aplica(); } },
          { texto: "Aplicar", tipo: "primario", acao: function (mm) { estado.filtros = lerFormulario(mm.corpo); guarda(); aplica(); } }
        ]
      });
      m.corpo.querySelectorAll(".nui-f-usar").forEach(function (b) {
        b.onclick = function () { estado.filtros = clona(estado.salvos[Number(b.dataset.i)].filtros); guarda(); aplica(); m.fechar(); };
      });
      m.corpo.querySelectorAll(".nui-f-apagar").forEach(function (b) {
        b.onclick = function () { estado.salvos.splice(Number(b.dataset.i), 1); guarda(); m.fechar(); abreFiltros(); };
      });
      var bs = m.corpo.querySelector(".nui-f-bsalvar");
      if (bs) bs.onclick = function () {
        var nome = m.corpo.querySelector(".nui-f-nomesalvo").value.trim();
        var fs = lerFormulario(m.corpo);
        if (!nome) { m.erro("Dê um nome para o filtro."); return; }
        if (!Object.keys(fs).length) { m.erro("Marque pelo menos um filtro antes de salvar."); return; }
        estado.salvos = estado.salvos.filter(function (s) { return s.nome !== nome; }).concat([{ nome: nome, filtros: fs }]);
        estado.filtros = clona(fs);
        guarda(); aplica(); m.fechar();
        N.ui.avisar("Filtro \"" + nome + "\" salvo.", "ok");
      };
    }

    function abreColunas() {
      var html = '<div class="nui-f-dica">Escolha o que aparece na grade e na exportação.</div><div class="nui-colunas">' +
        cols.map(function (c) {
          return '<label class="nui-f-op"><input type="checkbox" value="' + esc(c.campo) + '"' + (estado.ocultas.indexOf(c.campo) < 0 ? " checked" : "") + "> " + esc(c.titulo || c.campo) + "</label>";
        }).join("") + "</div>";
      N.ui.modal({
        titulo: "Colunas",
        conteudo: html,
        tamanho: "p",
        botoes: [
          { texto: "Padrão", tipo: "secundario", acao: function () {
              estado.ocultas = cols.filter(function (c) { return c.oculta; }).map(function (c) { return c.campo; });
              guarda(); aplica();
          } },
          { texto: "Aplicar", tipo: "primario", acao: function (mm) {
              var marcadas = [].map.call(mm.corpo.querySelectorAll("input:checked"), function (k) { return k.value; });
              if (!marcadas.length) throw new Error("Deixe pelo menos uma coluna.");
              estado.ocultas = cols.filter(function (c) { return marcadas.indexOf(c.campo) < 0; }).map(function (c) { return c.campo; });
              guarda(); aplica();
          } }
        ]
      });
    }

    async function carregaXlsx() {
      if (window.XLSX) return window.XLSX;
      await new Promise(function (ok, falha) {
        var s = document.createElement("script");
        s.src = XLSX_URL; s.onload = ok; s.onerror = function () { falha(new Error("Não foi possível carregar o gerador de Excel.")); };
        document.head.appendChild(s);
      });
      return window.XLSX;
    }
    function nomeArquivo(ext) {
      var base = typeof o.exportar === "string" ? o.exportar : "exportacao";
      return base + "-" + F.data(new Date()).split("/").reverse().join("-") + "." + ext;
    }
    function valorExcel(c, v, l) {
      if (c.formatar) return c.formatar(v, l);
      if (ehNum(c)) { var n = numero(v); return n == null ? "" : (c.tipo === "pct" ? n / 100 : n); }
      if (ehData(c)) {
        var d = F.paraData(v);
        if (!d) return "";
        var p = F.dataHora(d, { segundos: true }).match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+):(\d+)/); // hora de SP, sem fuso
        var soDia = c.tipo === "data";
        return new Date(+p[3], +p[2] - 1, +p[1], soDia ? 0 : +p[4], soDia ? 0 : +p[5], soDia ? 0 : +p[6]);
      }
      var t = texto(c, v, l);
      return t === F.VAZIO ? "" : t;
    }
    function exportaCsv(vc) {
      var linhas = [vc.map(function (c) { return c.titulo || c.campo; })].concat(vis.map(function (l) {
        return vc.map(function (c) {
          if (ehNum(c)) { var n = numero(l[c.campo]); return n == null ? "" : String(n).replace(".", ","); }
          var t = texto(c, l[c.campo], l);
          return t === F.VAZIO ? "" : t;
        });
      }));
      var csv = "﻿" + linhas.map(function (r) { return r.map(function (x) { return /[";\n]/.test(x) ? '"' + String(x).replace(/"/g, '""') + '"' : x; }).join(";"); }).join("\r\n");
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      a.download = nomeArquivo("csv");
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
    }
    async function exporta() {
      var b = $(".nui-g-bexp"), vc = vcols();
      b.disabled = true; b.classList.add("nui-girando");
      try {
        var X = await carregaXlsx();
        var aoa = [vc.map(function (c) { return c.titulo || c.campo; })].concat(vis.map(function (l) {
          return vc.map(function (c) { return valorExcel(c, l[c.campo], l); });
        }));
        var ws = X.utils.aoa_to_sheet(aoa, { cellDates: true });
        vc.forEach(function (c, i) {
          var z = c.tipo === "codigo" ? "0" : c.tipo === "moeda" ? '"R$" #,##0.00' : c.tipo === "pct" ? "0.0%" : c.tipo === "num" ? (c.casas ? "#,##0." + "0".repeat(c.casas) : "#,##0") :
                  c.tipo === "data" ? "dd/mm/yyyy" : c.tipo === "dataHora" ? "dd/mm/yyyy hh:mm" : null;
          if (!z) return;
          for (var r = 1; r < aoa.length; r++) { var cel = ws[X.utils.encode_cell({ r: r, c: i })]; if (cel && cel.t !== "s") cel.z = z; }
        });
        ws["!cols"] = vc.map(function (c, i) {
          var w = aoa.slice(0, 200).reduce(function (m, r) { return Math.max(m, String(r[i] instanceof Date ? "00/00/0000 00:00" : r[i]).length); }, 6);
          return { wch: Math.min(w + 2, 60) };
        });
        ws["!autofilter"] = { ref: X.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: aoa.length - 1, c: vc.length - 1 } }) };
        var wb = X.utils.book_new();
        X.utils.book_append_sheet(wb, ws, "Dados");
        X.writeFile(wb, nomeArquivo("xlsx"));
      } catch (e) {
        N.ui.avisar((e && e.message ? e.message : "Falha no Excel.") + " Exportei em CSV.", "atencao");
        exportaCsv(vc);
      } finally { b.classList.remove("nui-girando"); b.disabled = !vis.length; }
    }

    $(".nui-g-tam").onchange = function (e) {
      var primeira = (pagina - 1) * estado.tamPagina;          // mantém a primeira linha visível
      estado.tamPagina = Number(e.target.value);
      pagina = Math.floor(primeira / estado.tamPagina) + 1;
      guarda(); desenha();
      $(".nui-g-rolagem").scrollTop = 0;
    };
    alvo.querySelectorAll(".nui-g-ir").forEach(function (b) {
      b.onclick = function () {
        var paginas = Math.max(1, Math.ceil(vis.length / estado.tamPagina));
        pagina = { primeira: 1, anterior: pagina - 1, proxima: pagina + 1, ultima: paginas }[b.dataset.ir];
        desenha();
        $(".nui-g-rolagem").scrollTop = 0;
      };
    });
    $(".nui-g-busca").oninput = function (e) { busca = norm(e.target.value.trim()); aplica(); };
    $(".nui-g-bfiltros").onclick = abreFiltros;
    $(".nui-g-bcolunas").onclick = abreColunas;
    if ($(".nui-g-bexp")) $(".nui-g-bexp").onclick = exporta;

    function selecionadas() { return Object.keys(sel).map(function (k) { return sel[k]; }); }
    var api = {
      el: alvo,
      dados: function (linhas) {
        todas = linhas || [];
        var existe = {};
        todas.forEach(function (l) { if (podeMarcar(l)) existe[l[o.chave]] = l; });
        Object.keys(sel).forEach(function (k) { if (existe[k]) sel[k] = existe[k]; else delete sel[k]; });
        aplica(true);
        return api;
      },
      selecionadas: selecionadas,
      limparSelecao: function () { sel = {}; desenha(); },
      visiveis: function () { return vis.slice(); },
      filtrar: function (fn) { externo = fn || null; aplica(); return api; },
      semFiltroExterno: function () { return todas.filter(function (l) { return passa(l, true); }); },
      exportar: exporta,
      /** resolve quando as preferências guardadas já foram aplicadas */
      pronta: null
    };
    api.dados(o.dados || []);
    api.pronta = chavePref ? N.pref.ler(chavePref).then(function (p) {
      if (!p) return api;
      if (Array.isArray(p.ocultas)) estado.ocultas = p.ocultas.filter(function (k) { return porCampo[k]; });
      if (p.ordem && porCampo[p.ordem.campo]) estado.ordem = p.ordem;
      if (p.filtros) estado.filtros = p.filtros;
      if (Array.isArray(p.salvos)) estado.salvos = p.salvos;
      if (TAMANHOS.indexOf(p.tamPagina) >= 0) estado.tamPagina = p.tamPagina;
      aplica();
      return api;
    }) : Promise.resolve(api);
    return api;
  }

  N.ui.grade = grade;
})(window.Nitron);
