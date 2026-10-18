/* Nitron.pref — preferências por tela (colunas, ordem, filtros, filtros salvos).
   Hoje guarda no navegador (localStorage). Para acompanhar o usuário em qualquer máquina, troque o
   armazenamento uma vez: Nitron.pref.usar({ ler: async (chave) => obj, gravar: async (chave, obj) => {} }).
   Tudo assíncrono, para o armazenamento no Sankhya entrar sem mudar as telas. */
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
  var atual = local;
  N.pref = {
    usar: function (armazenamento) { atual = armazenamento || local; },
    ler: function (chave) { return atual.ler(chave).catch(function () { return null; }); },
    gravar: function (chave, obj) { return atual.gravar(chave, obj).catch(function () {}); }
  };
})(window.Nitron);
