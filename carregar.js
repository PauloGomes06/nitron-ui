/* Carregador central da nitron-ui. O dash nunca diz a versão: carrega este arquivo (do main) com o nome da tela,
   e AQUI se decide qual versão cada tela recebe. Para mudar a versão de qualquer dash, mexa só neste arquivo.

   <script>document.write('<script src="https://cdn.jsdelivr.net/gh/PauloGomes06/nitron-ui@main/carregar.js?tela=regua-boleto&d=' +
     new Date().toISOString().slice(0, 10) + '"><\/script>');</script>

   Depois de mudar: push no main e purge de @main/carregar.js e @<linha>/dist/nitron-ui.js no jsDelivr (README, "Publicar").
   Teste num navegador só: localStorage "nitron-ui:versao" = "1.5.0" ou hash de commit. */
(function () {
  /* Linha que toda tela recebe: "1" = a última 1.x. */
  var PADRAO = "1";

  /* Exceções por tela (o ?tela= do dash). Ex.: numa 2.0, quem ainda não foi testado fica na 1:
     "conciliacao-extrato": "1" */
  var TELAS = {
  };

  var eu = document.currentScript, tela = "", dia = "";
  try {
    var q = new URL(eu.src).searchParams;
    tela = q.get("tela") || "";
    dia = q.get("d") || "";
  } catch (e) {}

  var v = TELAS[tela] || PADRAO;
  try { v = window.localStorage.getItem("nitron-ui:versao") || v; } catch (e) {}

  window.NitronCarregador = { tela: tela, versao: v };
  document.write('<script src="https://cdn.jsdelivr.net/gh/PauloGomes06/nitron-ui@' + v + "/dist/nitron-ui.js" +
    (dia ? "?d=" + encodeURIComponent(dia) : "") + '"><\/script>');
})();
