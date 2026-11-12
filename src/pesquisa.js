/* Nitron.ui.pesquisa — campo de escolha com pesquisa, como o do Sankhya: digita o código ou parte do nome e aparece a
   lista; a lupa (ou F3) abre a pesquisa completa; ao sair do campo, o código é conferido (não existe ou inativo = vermelho).
   Os dados vêm do CRUDServiceProvider.loadRecords da entidade do dicionário, com a permissão de quem está logado.

   var p = Nitron.ui.pesquisa(document.querySelector("#natureza"), {
     tipo: "natureza",                       // natureza · centroResultado · tipoNegociacao · top · produto · parceiro · empresa
     filtro: "this.TIPMOV = 'O'",            // soma ao filtro do tipo (ex.: só TOP de pedido de compra)
     valor: 3010105,                         // código inicial (opcional)
     aoEscolher: function (codigo, registro) { ... }   // código (número) ou null quando limpa ou não acha
   });
   p.valor();  p.definir(10501);  p.registro();  p.valido();  p.focar();  p.habilitar(false);  p.destruir();

   Tipo próprio: { entidade: "Veiculo", codigo: "CODVEICULO", descricao: "PLACA", where: "this.ATIVO = 'S'", extra: ["MARCAMODELO"] }.
   Tabela versionada (TGFTPV, TGFTOP): versionada: true pega só a última DHALTER de cada código.

   O alvo pode ser um <input> (vira o campo) ou um elemento vazio (o campo nasce dentro dele). Em tela Vue, use um
   elemento vazio no template e grave o código no estado pelo aoEscolher: o Vue não mexe em filho que não criou. */
(function (N) {
  var S = N.sankhya, esc = N.ui.esc;

  var TIPOS = {
    natureza: { entidade: "Natureza", codigo: "CODNAT", descricao: "DESCRNAT", where: "this.ANALITICA = 'S' AND this.ATIVA = 'S'", titulo: "Natureza" },
    centroResultado: { entidade: "CentroResultado", codigo: "CODCENCUS", descricao: "DESCRCENCUS", where: "this.ANALITICO = 'S' AND this.ATIVO = 'S'", titulo: "Centro de resultado" },
    tipoNegociacao: { entidade: "TipoNegociacao", codigo: "CODTIPVENDA", descricao: "DESCRTIPVENDA", tabela: "TGFTPV", versionada: true, titulo: "Tipo de negociação" },
    top: { entidade: "TipoOperacao", codigo: "CODTIPOPER", descricao: "DESCROPER", tabela: "TGFTOP", versionada: true, extra: ["TIPMOV"], titulo: "Tipo de operação (TOP)" },
    produto: { entidade: "Produto", codigo: "CODPROD", descricao: "DESCRPROD", where: "this.ATIVO = 'S'", extra: ["CODVOL"], titulo: "Produto" },
    parceiro: { entidade: "Parceiro", codigo: "CODPARC", descricao: "NOMEPARC", where: "this.ATIVO = 'S'", titulo: "Parceiro" },
    empresa: { entidade: "Empresa", codigo: "CODEMP", descricao: "NOMEFANTASIA", titulo: "Empresa" }
  };

  var LUPA = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';

  function aspas(s) { return String(s).replace(/'/g, "''"); }
  function soDigitos(s) { return /^\d{1,12}$/.test(String(s).trim()); }

  /* Monta o where: filtro do tipo + filtro da tela + o que foi digitado (código exato/começando ou palavras na descrição). */
  function montarWhere(t, texto, exato) {
    var partes = [];
    if (t.where) partes.push("(" + t.where + ")");
    if (t.filtro) partes.push("(" + t.filtro + ")");
    if (t.versionada) partes.push("this.DHALTER = (SELECT MAX(V.DHALTER) FROM " + t.tabela + " V WHERE V." + t.codigo + " = this." + t.codigo + ")");
    if (t.versionada && t.ativo !== false) partes.push("this.ATIVO = 'S'");
    texto = String(texto == null ? "" : texto).trim();
    if (exato) partes.push("this." + t.codigo + " = " + Number(texto));
    else if (texto) {
      var palavras = texto.toUpperCase().split(/\s+/).filter(Boolean).slice(0, 5);
      var desc = palavras.map(function (p) { return "UPPER(this." + t.descricao + ") LIKE '%" + aspas(p) + "%'"; }).join(" AND ");
      partes.push(soDigitos(texto) ? "(this." + t.codigo + " = " + Number(texto) + " OR TO_CHAR(this." + t.codigo + ") LIKE '" + texto + "%' OR (" + desc + "))" : "(" + desc + ")");
    }
    return partes.join(" AND ");
  }

  async function buscar(t, texto, max, exato) {
    var campos = [t.codigo, t.descricao].concat(t.extra || []);
    if (t.versionada) campos.push("DHALTER");
    var regs = await S.loadRecords(t.entidade, {
      campos: campos.join(","), where: montarWhere(t, texto, exato), ordem: exato ? "" : "this." + t.descricao, max: max || 20, numericos: [t.codigo]
    });
    var vistos = {};
    return regs.filter(function (r) { if (vistos[r[t.codigo]]) return false; vistos[r[t.codigo]] = 1; return true; })
      .map(function (r) { return { codigo: r[t.codigo], descricao: r[t.descricao] || "", registro: r }; });
  }

  function pesquisa(alvo, o) {
    o = o || {};
    var t = Object.assign({}, TIPOS[o.tipo] || {}, o);
    if (!t.entidade || !t.codigo || !t.descricao) throw new Error("Nitron.ui.pesquisa: informe tipo (" + Object.keys(TIPOS).join(", ") + ") ou entidade, codigo e descricao.");

    var caixa = document.createElement("div");
    caixa.className = "nui-pq";
    var input;
    if (alvo.tagName === "INPUT") { input = alvo; alvo.parentNode.insertBefore(caixa, alvo); }
    else { input = document.createElement("input"); alvo.appendChild(caixa); }
    input.type = "text";
    input.autocomplete = "off";
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    if (o.placeholder) input.placeholder = o.placeholder;
    var linha = document.createElement("div");
    linha.className = "nui-pq-linha";
    var lupa = document.createElement("button");
    lupa.type = "button";
    lupa.className = "nui-pq-lupa";
    lupa.title = "Pesquisar " + (t.titulo || "") + " (F3)";
    lupa.setAttribute("aria-label", lupa.title);
    lupa.innerHTML = LUPA;
    var desc = document.createElement("div");
    desc.className = "nui-pq-desc";
    linha.appendChild(input);
    linha.appendChild(lupa);
    caixa.appendChild(linha);
    caixa.appendChild(desc);

    var lista = document.createElement("ul");
    lista.className = "nui-pq-lista";
    lista.setAttribute("role", "listbox");
    lista.hidden = true;

    var atual = null, estado = null, itens = [], marcado = -1, timer = 0, seq = 0, conferido = "";

    function mostrar(reg, st, msg) {
      atual = reg; estado = st;
      caixa.classList.toggle("nui-pq-invalido", st === false);
      desc.textContent = msg != null ? msg : (reg ? reg.descricao : "");
      desc.title = desc.textContent;
    }
    function escolher(reg, avisar) {
      input.value = reg ? String(reg.codigo) : "";
      conferido = input.value;
      mostrar(reg, reg ? true : null);
      fecharLista();
      if (avisar !== false && o.aoEscolher) o.aoEscolher(reg ? reg.codigo : null, reg ? reg.registro : null);
    }

    function posicionar() {
      var r = input.getBoundingClientRect();
      lista.style.left = r.left + "px";
      lista.style.top = r.bottom + 2 + "px";
      lista.style.width = Math.max(r.width + lupa.offsetWidth, 320) + "px";
    }
    function abrirLista(regs, texto) {
      itens = regs; marcado = regs.length ? 0 : -1;
      lista.innerHTML = regs.length ? regs.map(function (r, i) {
        return '<li role="option" data-i="' + i + '"' + (i === marcado ? ' class="nui-pq-marcado"' : "") + '><b>' + esc(r.codigo) + "</b> " + esc(r.descricao) + "</li>";
      }).join("") : '<li class="nui-pq-nada">Nada encontrado para "' + esc(texto) + '".</li>';
      if (!lista.parentNode) document.body.appendChild(lista);
      posicionar();
      lista.hidden = false;
      input.setAttribute("aria-expanded", "true");
    }
    function fecharLista() { lista.hidden = true; input.setAttribute("aria-expanded", "false"); }
    function marcar(i) {
      if (!itens.length) return;
      marcado = (i + itens.length) % itens.length;
      Array.prototype.forEach.call(lista.children, function (li, k) { li.classList.toggle("nui-pq-marcado", k === marcado); });
      var li = lista.children[marcado];
      if (li && li.scrollIntoView) li.scrollIntoView({ block: "nearest" });
    }

    async function sugerir() {
      var texto = input.value.trim(), meu = ++seq;
      if (!texto) { fecharLista(); return; }
      try {
        var regs = await buscar(t, texto, 20);
        if (meu === seq && document.activeElement === input) abrirLista(regs, texto);
      } catch (e) { if (meu === seq) mostrar(null, false, "Falha na pesquisa: " + (e.message || e)); }
    }

    /* Ao sair do campo: confere o que ficou digitado. Código que não existe (ou inativo) fica vermelho. */
    async function conferir() {
      var texto = input.value.trim();
      if (texto === conferido) return;
      if (!texto) { escolher(null); return; }
      if (!soDigitos(texto)) {
        var regs = await buscar(t, texto, 2);
        if (regs.length === 1) return escolher(regs[0]);
        return abrirPesquisa(texto);
      }
      var meu = ++seq;
      try {
        var r = await buscar(t, texto, 1, true);
        if (meu !== seq) return;
        conferido = texto;
        if (r.length) escolher(r[0]);
        else { mostrar(null, false, "Código " + texto + " não existe ou está inativo."); if (o.aoEscolher) o.aoEscolher(null, null); }
      } catch (e) { mostrar(null, false, "Falha ao conferir: " + (e.message || e)); }
    }

    /* Pesquisa completa num modal: busca por código ou nome, até 100 linhas. */
    function abrirPesquisa(inicial) {
      fecharLista();
      var corpo = document.createElement("div");
      corpo.className = "nui-pq-modal";
      corpo.innerHTML = '<input type="text" class="nui-pq-busca" placeholder="Código ou parte do nome" autocomplete="off"><div class="nui-pq-res"></div>';
      var busca = corpo.querySelector("input"), res = corpo.querySelector(".nui-pq-res"), regs = [], sel = 0, meu = 0;
      busca.value = inicial != null ? inicial : (estado ? "" : input.value.trim());
      var m = N.ui.modal({ titulo: "Pesquisar " + (t.titulo || t.entidade), conteudo: corpo, tamanho: "m", botoes: [{ texto: "Fechar", acao: "fechar" }],
        aoFechar: function () { setTimeout(function () { input.focus(); }, 0); } });
      function desenhar() {
        res.innerHTML = regs.length ? '<table><tbody>' + regs.map(function (r, i) {
          return '<tr data-i="' + i + '"' + (i === sel ? ' class="nui-pq-marcado"' : "") + '><td class="nui-pq-cod">' + esc(r.codigo) + "</td><td>" + esc(r.descricao) + "</td></tr>";
        }).join("") + "</tbody></table>" : '<p class="nui-pq-nada">Nada encontrado.</p>';
      }
      async function carregar() {
        var eu = ++meu;
        res.innerHTML = '<p class="nui-pq-nada"><span class="nui-roda"></span>Pesquisando…</p>';
        try { var r = await buscar(t, busca.value, 100); if (eu === meu) { regs = r; sel = 0; desenhar(); } }
        catch (e) { if (eu === meu) res.innerHTML = '<p class="nui-pq-nada nui-g-erro">' + esc(e.message || e) + "</p>"; }
      }
      var tm = 0;
      busca.addEventListener("input", function () { clearTimeout(tm); tm = setTimeout(carregar, 300); });
      busca.addEventListener("keydown", function (ev) {
        if (ev.key === "ArrowDown" || ev.key === "ArrowUp") { ev.preventDefault(); if (regs.length) { sel = (sel + (ev.key === "ArrowDown" ? 1 : -1) + regs.length) % regs.length; desenhar(); } }
        else if (ev.key === "Enter" && regs[sel]) { ev.preventDefault(); escolher(regs[sel]); m.fechar(); }
      });
      res.addEventListener("click", function (ev) {
        var tr = ev.target.closest("tr[data-i]");
        if (tr) { escolher(regs[+tr.getAttribute("data-i")]); m.fechar(); }
      });
      carregar();
    }

    input.addEventListener("input", function () {
      if (estado !== null) mostrar(null, null, "");
      clearTimeout(timer);
      timer = setTimeout(sugerir, 250);
    });
    input.addEventListener("keydown", function (ev) {
      if (ev.key === "F3") { ev.preventDefault(); abrirPesquisa(); return; }
      if (lista.hidden) return;
      if (ev.key === "ArrowDown") { ev.preventDefault(); marcar(marcado + 1); }
      else if (ev.key === "ArrowUp") { ev.preventDefault(); marcar(marcado - 1); }
      else if (ev.key === "Enter" && itens[marcado]) { ev.preventDefault(); escolher(itens[marcado]); }
      else if (ev.key === "Escape") { ev.preventDefault(); ev.stopPropagation(); fecharLista(); }
    });
    input.addEventListener("blur", function () {
      setTimeout(function () { if (document.activeElement !== input) { fecharLista(); clearTimeout(timer); conferir(); } }, 150);
    });
    lista.addEventListener("mousedown", function (ev) {
      ev.preventDefault();
      var li = ev.target.closest("li[data-i]");
      if (li) escolher(itens[+li.getAttribute("data-i")]);
    });
    lupa.addEventListener("click", function () { abrirPesquisa(); });
    function aoRolar(ev) { if (!lista.hidden && ev.target !== lista && !lista.contains(ev.target)) posicionar(); }
    window.addEventListener("scroll", aoRolar, true);
    window.addEventListener("resize", aoRolar);

    var api = {
      el: caixa,
      input: input,
      valor: function () { return atual ? atual.codigo : (soDigitos(input.value) ? Number(input.value) : null); },
      registro: function () { return atual ? atual.registro : null; },
      valido: function () { return estado; },
      /** Grava o código sem chamar aoEscolher e devolve a promessa da conferência. */
      definir: async function (codigo) {
        var meu = ++seq;
        if (codigo == null || codigo === "") { escolher(null, false); return null; }
        input.value = String(codigo);
        try {
          var r = await buscar(t, codigo, 1, true);
          if (meu !== seq) return null;
          conferido = input.value;
          if (r.length) { mostrar(r[0], true); return r[0].registro; }
          mostrar(null, false, "Código " + codigo + " não existe ou está inativo.");
        } catch (e) { mostrar(null, false, "Falha ao conferir: " + (e.message || e)); }
        return null;
      },
      focar: function () { input.focus(); },
      habilitar: function (sim) { input.disabled = !sim; lupa.disabled = !sim; },
      destruir: function () {
        window.removeEventListener("scroll", aoRolar, true);
        window.removeEventListener("resize", aoRolar);
        if (lista.parentNode) lista.parentNode.removeChild(lista);
        if (caixa.parentNode) caixa.parentNode.removeChild(caixa);
      }
    };
    linha.insertBefore(input, lupa);
    if (o.valor != null && o.valor !== "") api.definir(o.valor);
    return api;
  }

  pesquisa.tipos = TIPOS;
  pesquisa._montarWhere = montarWhere;
  N.ui.pesquisa = pesquisa;
})(window.Nitron);
