/* Nitron.pref — preferências por tela (colunas, ordem, filtros, filtros salvos).
   Padrão: no navegador (localStorage). Para acompanhar o usuário em qualquer máquina:
     Nitron.pref.usarSankhya();   // antes de montar a grade; lê a view AD_VW_NITPREF e grava na AD_NITPREF
   ou qualquer outro armazenamento: Nitron.pref.usar({ ler: async (chave) => obj, gravar: async (chave, obj) => {} }).
   No Sankhya o navegador continua como cópia: se a tabela não existir ou a gravação falhar, a tela segue funcionando. */
(function (N) {
  var PREFIXO = "nitron-ui:";
  var local = {
    ler: async function (chave) {
      try { var t = window.localStorage.getItem(PREFIXO + chave); return t ? JSON.parse(t) : null; } catch (e) { return null; }
    },
    gravar: async function (chave, obj) {
      try { window.localStorage.setItem(PREFIXO + chave, JSON.stringify(obj)); } catch (e) {}
    }
  };

  /* Uma linha por usuário e chave. A view devolve as linhas do usuário logado e mais uma com ID vazio,
     que dá o CODUSU para a primeira gravação. Sem preferência no Sankhya ainda, vale a do navegador
     (quem já tinha arrumado a grade não perde nada) e a primeira gravação leva para o Sankhya. */
  function sankhya(o) {
    o = o || {};
    var view = o.view || "AD_VW_NITPREF", entidade = o.entidade || "AD_NITPREF", espera = o.espera == null ? 1500 : o.espera;
    var carga = null, codusu = null, linhas = {}, fora = false, avisado = false;
    var pendente = {}, tempo = {}, fila = {};

    function carrega() {
      if (!carga) carga = N.sankhya.loadView(view, { campos: "CODUSU,ID,CHAVE,CONTEUDO", numericos: ["CODUSU", "ID"] })
        .then(function (rs) {
          rs.forEach(function (r) {
            if (r.CODUSU != null) codusu = r.CODUSU;
            if (r.ID != null && r.CHAVE) linhas[r.CHAVE] = { id: r.ID, conteudo: r.CONTEUDO };
          });
          if (codusu == null) throw new Error("usuário logado não identificado");
        })
        .catch(function (e) {
          fora = true;
          if (window.console) window.console.warn("nitron-ui: preferências só no navegador (" + (e && e.message ? e.message : e) + ")");
        });
      return carga;
    }
    function avisa(e) {
      if (window.console) window.console.warn("nitron-ui: falha ao guardar preferência no Sankhya", e);
      if (avisado) return;
      avisado = true;
      N.ui.avisar("Não consegui guardar suas preferências no Sankhya: valem só neste navegador por enquanto.", "atencao");
    }
    async function envia(chave) {
      var obj = pendente[chave];
      delete pendente[chave];
      var txt = JSON.stringify(obj);
      if (txt.length > 4000) { avisa(new Error("preferência com " + txt.length + " caracteres (máx. 4000): apague filtros salvos")); return; }
      var l = linhas[chave];
      if (l && l.conteudo === txt) return;
      try {
        if (l) await N.sankhya.salvar(entidade, { ID: l.id }, { CONTEUDO: txt, DHALTER: new Date() });
        else {
          var r = await N.sankhya.inserir(entidade, { CODUSU: codusu, CHAVE: chave, CONTEUDO: txt, DHALTER: new Date() }, { retornar: ["ID"] });
          var id = r && r[0] ? Number(r[0].ID) : NaN;
          // Sem o ID não dá para alterar depois: relê a view na próxima gravação
          if (!id) { carga = null; return; }
          l = linhas[chave] = { id: id };
        }
        l.conteudo = txt;
      } catch (e) {
        // Inclusão recusada (ex.: outra aba gravou a mesma chave antes): relê a view, a próxima gravação vira alteração
        if (!l) carga = null;
        avisa(e);
      }
    }

    return {
      ler: async function (chave) {
        await carrega();
        var l = !fora && linhas[chave];
        if (!l) return local.ler(chave);
        try { return JSON.parse(l.conteudo); } catch (e) { return local.ler(chave); }
      },
      /* Cópia no navegador na hora; no Sankhya só a última depois de `espera` ms parada
         (arrastar coluna e marcar filtro geram várias gravações seguidas). Uma gravação por chave de cada vez. */
      gravar: async function (chave, obj) {
        await local.gravar(chave, obj);
        await carrega();
        if (fora) return;
        pendente[chave] = obj;
        clearTimeout(tempo[chave]);
        tempo[chave] = setTimeout(function () {
          fila[chave] = (fila[chave] || Promise.resolve()).then(function () { if (pendente[chave] !== undefined) return envia(chave); });
        }, espera);
      }
    };
  }

  var atual = local;
  N.pref = {
    usar: function (armazenamento) { atual = armazenamento || local; },
    usarSankhya: function (opcoes) { atual = sankhya(opcoes); },
    ler: function (chave) { return atual.ler(chave).catch(function () { return null; }); },
    gravar: function (chave, obj) { return atual.gravar(chave, obj).catch(function () {}); }
  };
})(window.Nitron);
