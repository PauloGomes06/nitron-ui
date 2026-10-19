/* Nitron.ui — modal, confirmar, aviso, carregando e moldura do gadget. O CSS vem embutido (estilo.css). */
(function (N) {
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function conteudo(alvo, c) {
    if (c == null) return;
    if (c instanceof Node) alvo.appendChild(c);
    else alvo.innerHTML = String(c);
  }

  var abertos = [];
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || !abertos.length) return;
    abertos[abertos.length - 1].fecharPorEsc();
  });

  /** Modal único das telas.
      Nitron.ui.modal({
        titulo, descricao, conteudo: "<html>" | Node, tamanho: "p" | "m" | "g",
        botoes: [{ texto, tipo: "primario" | "secundario" | "perigo", acao: async (m) => {...} | "fechar" }],
        fecharAoClicarFora: false, aoFechar: () => {}
      })
      → { el, corpo, fechar(), bloquear(bool) }
      Enquanto a ação de um botão roda, o modal fica bloqueado (Esc, X e botões) e o botão mostra carregando.
      Se a ação lançar erro, a mensagem aparece dentro do modal e ele continua aberto. */
  function modal(o) {
    o = o || {};
    var fundo = el("div", "nui-fundo");
    var caixa = el("div", "nui-modal nui-" + (o.tamanho || "m"));
    caixa.setAttribute("role", "dialog");
    caixa.setAttribute("aria-modal", "true");

    var topo = el("div", "nui-topo");
    var tit = el("div", "nui-titulos", '<div class="nui-titulo">' + esc(o.titulo) + "</div>" +
      (o.descricao ? '<div class="nui-descricao">' + esc(o.descricao) + "</div>" : ""));
    var x = el("button", "nui-x", "&times;");
    x.setAttribute("aria-label", "Fechar");
    topo.appendChild(tit);
    topo.appendChild(x);

    var corpo = el("div", "nui-corpo");
    conteudo(corpo, o.conteudo);
    var erro = el("div", "nui-erro");
    erro.hidden = true;

    var rodape = el("div", "nui-rodape");
    var botoes = (o.botoes || [{ texto: "Fechar", tipo: "secundario", acao: "fechar" }]).map(function (b) {
      var bt = el("button", "nui-bt nui-bt-" + (b.tipo || "secundario"), esc(b.texto));
      rodape.appendChild(bt);
      return { def: b, el: bt };
    });

    caixa.appendChild(topo);
    caixa.appendChild(corpo);
    caixa.appendChild(erro);
    if (botoes.length) caixa.appendChild(rodape);
    fundo.appendChild(caixa);

    var bloqueado = false;
    var api = {
      el: caixa,
      corpo: corpo,
      bloquear: function (sim) {
        bloqueado = !!sim;
        x.disabled = bloqueado;
        botoes.forEach(function (b) { b.el.disabled = bloqueado; });
      },
      erro: function (msg) { erro.textContent = msg || ""; erro.hidden = !msg; },
      fechar: function () {
        if (!fundo.parentNode) return;
        fundo.parentNode.removeChild(fundo);
        abertos.splice(abertos.indexOf(api), 1);
        if (o.aoFechar) o.aoFechar();
      },
      fecharPorEsc: function () { if (!bloqueado) api.fechar(); }
    };

    x.onclick = function () { if (!bloqueado) api.fechar(); };
    if (o.fecharAoClicarFora) fundo.onclick = function (e) { if (e.target === fundo && !bloqueado) api.fechar(); };

    botoes.forEach(function (b) {
      b.el.onclick = async function () {
        if (b.def.acao === "fechar" || !b.def.acao) return api.fechar();
        api.erro("");
        api.bloquear(true);
        b.el.classList.add("nui-girando");
        try {
          var r = await b.def.acao(api);
          if (r !== false) api.fechar();
        } catch (e) {
          api.erro(e && e.message ? e.message : String(e));
        } finally {
          b.el.classList.remove("nui-girando");
          api.bloquear(false);
        }
      };
    });

    document.body.appendChild(fundo);
    abertos.push(api);
    var foco = caixa.querySelector("input,select,textarea") || (botoes.length && botoes[botoes.length - 1].el);
    if (foco) setTimeout(function () { foco.focus(); }, 0);
    return api;
  }

  /** await Nitron.ui.confirmar({ titulo, mensagem, confirmar: "Excluir", perigo: true }) → true/false */
  function confirmar(o) {
    o = o || {};
    return new Promise(function (resolve) {
      var respondeu = false;
      modal({
        titulo: o.titulo || "Confirmar",
        conteudo: '<p class="nui-msg">' + esc(o.mensagem) + "</p>",
        tamanho: "p",
        aoFechar: function () { if (!respondeu) resolve(false); },
        botoes: [
          { texto: o.cancelar || "Cancelar", tipo: "secundario", acao: "fechar" },
          { texto: o.confirmar || "Confirmar", tipo: o.perigo ? "perigo" : "primario", acao: function () { respondeu = true; resolve(true); } }
        ]
      });
    });
  }

  var pilha;
  /** Nitron.ui.avisar("Salvo.", "ok" | "erro" | "atencao", ms) — erro fica até clicar */
  function avisar(msg, tipo, ms) {
    if (!pilha || !pilha.parentNode) { pilha = el("div", "nui-avisos"); document.body.appendChild(pilha); }
    tipo = tipo || "ok";
    var a = el("div", "nui-aviso nui-aviso-" + tipo, esc(msg));
    a.onclick = function () { if (a.parentNode) a.parentNode.removeChild(a); };
    pilha.appendChild(a);
    var tempo = ms != null ? ms : (tipo === "erro" ? 0 : 4000);
    if (tempo) setTimeout(a.onclick, tempo);
    return a;
  }

  /** var fim = Nitron.ui.carregando(elemento?, "Buscando..."); ... fim(); */
  function carregando(alvo, texto) {
    var cobre = el("div", "nui-carregando" + (alvo ? "" : " nui-tela"), '<span class="nui-roda"></span><span>' + esc(texto || "Carregando...") + "</span>");
    var pai = alvo || document.body;
    if (alvo && getComputedStyle(alvo).position === "static") alvo.style.position = "relative";
    pai.appendChild(cobre);
    return function () { if (cobre.parentNode) cobre.parentNode.removeChild(cobre); };
  }

  /** Esconde barras e botões do gadget do Sankhya (reaplica por ~2s para pegar render tardio). */
  function esconderMoldura() {
    function aplica() {
      var $;
      try { $ = window.$ || (window.parent && window.parent.$) || (window.parent.parent && window.parent.parent.$); } catch (e) {}
      if (!$) return;
      var docs = [];
      try { if (window.parent && window.parent.document) docs.push(window.parent.document); } catch (e) {}
      try { if (window.parent.parent && window.parent.parent.document) docs.push(window.parent.parent.document); } catch (e) {}
      docs.forEach(function (doc) {
        try {
          // Painel de filtro do dash pela estrutura: o nome ofuscado do GWT muda a cada versao
          // (4.35 = GI-BUHVBCWC, 4.36 = GLVY3WB...). E o filho do .dyna-gadget com "Esconder ao atualizar".
          $(".dyna-gadget", doc).children().each(function () {
            if (/Esconder ao atualizar/.test(this.textContent || "")) this.style.display = "none";
          });
          $(".GI-BUHVBCWC", doc).css("display", "none");
          $(".GI-BUHVBPVC", doc).css("padding", "0");
          $(".VCompactBar", doc).css("display", "none");
          $(".DashWindow-TopBar", doc).css("display", "none");
          $(".chartConfigButton", doc).css("display", "none");
          $(".DashWindow", doc).css("margin-top", "-22px");
          $(".dyna-gadget", doc).css("padding", "0");
        } catch (e) {}
      });
    }
    aplica();
    var n = 0;
    var t = setInterval(function () { aplica(); if (++n >= 6) clearInterval(t); }, 400);
  }

  N.ui = { modal: modal, confirmar: confirmar, avisar: avisar, carregando: carregando, esconderMoldura: esconderMoldura, esc: esc };
})(window.Nitron);
