/*! nitron-ui 1.7.0 — telas HTML5 do Sankhya da Nitron */
(function () {
  if (window.Nitron && window.Nitron.versao) return;
  window.Nitron = { versao: "1.7.0" };
  var s = document.createElement("style");
  s.setAttribute("data-nitron-ui", "1.7.0");
  s.textContent = ":root { --nui-fundo: #f4f6f9; --nui-painel: #ffffff; --nui-linha: #dde3ec; --nui-texto: #1c2733; --nui-suave: #5c6b7c; --nui-destaque: #0a6ea8; --nui-ok: #1e7d32; --nui-atencao: #b26a00; --nui-erro: #c62828; --nui-raio: 10px; --nui-fonte: 13px/1.45 \"Segoe UI\", system-ui, sans-serif; } .nui-fundo { position: fixed; inset: 0; z-index: 9000; background: rgba(28, 39, 51, .45); display: flex; align-items: center; justify-content: center; padding: 16px; animation: nui-aparece .12s ease-out; } .nui-modal { background: var(--nui-painel); color: var(--nui-texto); font: var(--nui-fonte); border-radius: var(--nui-raio); box-shadow: 0 12px 40px rgba(0, 0, 0, .25); width: 100%; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; } .nui-p { max-width: 400px; } .nui-m { max-width: 560px; } .nui-g { max-width: 900px; } .nui-topo { display: flex; align-items: flex-start; gap: 12px; padding: 14px 18px; border-bottom: 1px solid var(--nui-linha); } .nui-titulos { flex: 1; min-width: 0; } .nui-titulo { font-size: 15px; font-weight: 700; } .nui-descricao { color: var(--nui-suave); margin-top: 2px; } .nui-x { border: 0; background: none; font-size: 22px; line-height: 1; color: var(--nui-suave); cursor: pointer; padding: 0 4px; border-radius: 6px; } .nui-x:hover:not(:disabled) { background: var(--nui-fundo); color: var(--nui-texto); } .nui-corpo { padding: 16px 18px; overflow-y: auto; } .nui-msg { margin: 0; } .nui-erro { margin: 0 18px 12px; padding: 8px 10px; border-radius: 6px; background: #fdecea; color: var(--nui-erro); } .nui-rodape { display: flex; justify-content: flex-end; gap: 8px; padding: 12px 18px; border-top: 1px solid var(--nui-linha); background: #fafbfc; } .nui-bt { font: inherit; font-weight: 600; border-radius: 6px; padding: 7px 16px; cursor: pointer; border: 1px solid transparent; } .nui-bt:disabled { opacity: .55; cursor: not-allowed; } .nui-bt-primario { background: var(--nui-destaque); color: #fff; } .nui-bt-perigo { background: var(--nui-erro); color: #fff; } .nui-bt-secundario { background: #fff; color: var(--nui-texto); border-color: var(--nui-linha); } .nui-bt-secundario:hover:not(:disabled) { background: var(--nui-fundo); } .nui-girando::before, .nui-roda { content: \"\"; display: inline-block; width: 12px; height: 12px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: nui-gira .7s linear infinite; vertical-align: -2px; margin-right: 6px; } .nui-avisos { position: fixed; right: 16px; bottom: 16px; z-index: 9100; display: flex; flex-direction: column; gap: 8px; max-width: 380px; font: var(--nui-fonte); } .nui-aviso { padding: 10px 14px; border-radius: 8px; color: #fff; box-shadow: 0 6px 20px rgba(0, 0, 0, .2); cursor: pointer; animation: nui-aparece .15s ease-out; } .nui-aviso-ok { background: var(--nui-ok); } .nui-aviso-erro { background: var(--nui-erro); } .nui-aviso-atencao { background: var(--nui-atencao); } .nui-carregando { position: absolute; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; gap: 4px; background: rgba(255, 255, 255, .75); color: var(--nui-suave); font: var(--nui-fonte); } .nui-carregando.nui-tela { position: fixed; z-index: 8900; } @keyframes nui-gira { to { transform: rotate(360deg); } } @keyframes nui-aparece { from { opacity: 0; } to { opacity: 1; } } .nui-grade { display: flex; flex-direction: column; min-height: 0; background: var(--nui-painel); border: 1px solid var(--nui-linha); border-radius: var(--nui-raio); font: var(--nui-fonte); color: var(--nui-texto); } .nui-g-barra { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--nui-linha); } .nui-g-busca { font: inherit; padding: 6px 10px; border: 1px solid var(--nui-linha); border-radius: 6px; min-width: 200px; } .nui-g-chips { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; padding: 8px 12px; border-bottom: 1px solid var(--nui-linha); background: #fafbfc; } .nui-g-acoes { margin-left: auto; } .nui-g-acoes { display: flex; gap: 6px; } .nui-chip { display: inline-flex; align-items: center; gap: 4px; background: #e3effa; color: #0a4f78; border-radius: 999px; padding: 2px 4px 2px 10px; font-size: 12px; } .nui-chip button { border: 0; background: none; color: inherit; cursor: pointer; font-size: 14px; line-height: 1; padding: 0 4px; border-radius: 50%; } .nui-chip button:hover { background: rgba(10, 110, 168, .15); } .nui-g-limpar { border: 0; background: none; color: var(--nui-destaque); cursor: pointer; font: inherit; font-size: 12px; text-decoration: underline; } .nui-g-rolagem { overflow: auto; flex: 1; min-height: 0; } .nui-grade table { width: 100%; border-collapse: separate; border-spacing: 0; } .nui-grade th { position: sticky; top: 0; z-index: 1; background: #eef2f7; text-align: left; font-weight: 600; padding: 8px 10px; border-bottom: 1px solid var(--nui-linha); white-space: nowrap; cursor: pointer; user-select: none; } .nui-grade th:hover { background: #e3e9f1; } .nui-grade td { padding: 7px 10px; border-bottom: 1px solid #edf0f4; white-space: nowrap; } .nui-grade tbody tr:hover td { background: #f7f9fc; } .nui-grade tfoot td { position: sticky; bottom: 0; background: #f7f9fc; font-weight: 700; border-top: 1px solid var(--nui-linha); } .nui-grade .nui-dir { text-align: right; font-variant-numeric: tabular-nums; } .nui-g-ck { width: 32px; text-align: center; } .nui-g-marcada td { background: #e3effa !important; } .nui-g-clicavel { cursor: pointer; } .nui-g-aberta td { background: #eef4fa; font-weight: 600; } .nui-grade tr.nui-g-detalhe td { white-space: normal; background: #fbfcfe; padding: 10px 14px 14px; border-bottom: 2px solid var(--nui-linha); } .nui-grade tbody tr.nui-g-detalhe:hover td { background: #fbfcfe; } .nui-g-esperando { color: var(--nui-suave); } .nui-g-erro { color: var(--nui-erro); } .nui-g-vazio { text-align: center; color: var(--nui-suave); padding: 28px !important; white-space: normal !important; } .nui-g-rodape { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; padding: 6px 12px; color: var(--nui-suave); border-top: 1px solid var(--nui-linha); font-size: 12px; } .nui-g-pag { display: flex; align-items: center; gap: 4px; } .nui-g-pag label { margin-right: 8px; } .nui-g-pag select { font: inherit; padding: 2px 4px; border: 1px solid var(--nui-linha); border-radius: 4px; } .nui-g-ir { font: inherit; font-size: 14px; width: 28px; height: 26px; border: 1px solid var(--nui-linha); background: #fff; border-radius: 4px; cursor: pointer; color: var(--nui-texto); } .nui-g-ir:disabled { opacity: .4; cursor: default; } .nui-g-npag { padding: 0 6px; white-space: nowrap; } .nui-sit { display: inline-block; padding: 1px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; } .nui-sit-ok { background: #e6f4ea; color: var(--nui-ok); } .nui-sit-atencao { background: #fff3e0; color: var(--nui-atencao); } .nui-sit-erro { background: #fdecea; color: var(--nui-erro); } .nui-sit-info { background: #e3effa; color: var(--nui-destaque); } .nui-sit-neutro { background: #eef2f7; color: var(--nui-suave); } .nui-filtros { display: flex; flex-direction: column; gap: 10px; } .nui-f-linha { display: grid; grid-template-columns: 140px minmax(0, 1fr); gap: 8px; align-items: start; } .nui-f-nome { font-weight: 600; padding-top: 5px; } .nui-f-linha input[type=text], .nui-f-linha input[type=number], .nui-f-linha input[type=date], .nui-f-salvar input { font: inherit; padding: 5px 8px; border: 1px solid var(--nui-linha); border-radius: 6px; } .nui-f-linha input[type=number], .nui-f-linha input[type=date] { width: 150px; } .nui-f-linha input[type=text] { width: 100%; box-sizing: border-box; } .nui-f-faixa { display: flex; align-items: center; gap: 6px; } .nui-f-faixa input[type=text], .nui-f-faixa input[type=date] { flex: 1 1 0; width: auto; min-width: 0; box-sizing: border-box; } .nui-f-op { display: inline-flex; align-items: center; gap: 4px; margin: 2px 12px 2px 0; cursor: pointer; } .nui-f-salvos { margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--nui-linha); } .nui-f-lista { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; } .nui-chip-salvo { background: #eef2f7; color: var(--nui-texto); padding: 2px 4px 2px 2px; } .nui-chip-salvo .nui-f-usar { font: inherit; font-size: 12px; padding: 2px 8px; border-radius: 999px; } .nui-f-dica { color: var(--nui-suave); } .nui-f-salvar { display: flex; gap: 8px; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--nui-linha); } .nui-f-salvar input { flex: 1; } .nui-colunas { display: flex; flex-direction: column; margin-top: 8px; } .nui-col-linha { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 1px 4px; border-radius: 4px; } .nui-col-linha:hover { background: #f3f6fa; } .nui-col-somar { margin-left: auto; font-size: 12px; color: var(--nui-suave); white-space: nowrap; cursor: pointer; } .nui-col-mover button { font: inherit; width: 26px; height: 24px; border: 1px solid var(--nui-linha); background: #fff; border-radius: 4px; cursor: pointer; margin-left: 2px; } .nui-col-mover button:hover { border-color: var(--nui-destaque); color: var(--nui-destaque); } .nui-grade th.nui-g-arrastando { opacity: .45; } .nui-grade th.nui-g-alvo-esq { box-shadow: inset 3px 0 0 var(--nui-destaque); } .nui-grade th.nui-g-alvo-dir { box-shadow: inset -3px 0 0 var(--nui-destaque); } /* engrenagem do componente de BI (esconderMoldura): discreta no canto; o hover so acende, nao troca a cor */ .nui-bi{position:fixed;top:4px;right:4px;z-index:2147483000;width:24px;height:24px;padding:0;display:flex;align-items:center;justify-content:center;border:1px solid #d5dde6;border-radius:6px;background:#fff;color:#7a8794;opacity:.55;cursor:pointer} .nui-bi:hover{opacity:1} /* trecho achado pela busca da grade */ .nui-grade mark.nui-g-achado { background: #ffe58a; color: inherit; padding: 0; border-radius: 2px; } /* ===== UX padrao das telas (1.6.0). So classes NOVAS: nada acima muda, telas antigas ficam iguais. Base de leitura 15px (12px so rotulo), cor com significado em par (cor + fundo), numero com tabular-nums. Catalogo: demo/ux.html. Regras: secao \"Tela nova\" do Sankhya/CLAUDE.md. ===== */ :root { --nui-ok-fundo: #e7f3e9; --nui-atencao-fundo: #fdf3dd; --nui-erro-fundo: #fdecea; --nui-info: #0a6ea8; --nui-info-fundo: #e7f0f7; --nui-t-leitura: 15px; --nui-t-rotulo: 12px; --nui-t-titulo: 20px; } .nui-pagina { font: var(--nui-t-leitura)/1.5 \"Segoe UI\", system-ui, sans-serif; color: var(--nui-texto); padding: 12px 16px; --nui-fonte: 14px/1.45 \"Segoe UI\", system-ui, sans-serif; } .nui-pagina *, .nui-pagina *::before, .nui-pagina *::after { box-sizing: border-box; } .nui-pagina [hidden] { display: none !important; } .nui-pagina button, .nui-pagina input, .nui-pagina select, .nui-pagina textarea { font-family: inherit; } .nui-pagina .nui-bt { font-size: 14px; min-height: 36px; } .nui-cabeca { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 10px; } .nui-nome-tela { margin: 0; font-size: var(--nui-t-titulo); font-weight: 700; } .nui-barra { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 10px; } .nui-barra input, .nui-barra select { height: 36px; padding: 0 10px; border: 1px solid var(--nui-linha); border-radius: 6px; background: #fff; font-size: var(--nui-t-leitura); color: var(--nui-texto); max-width: 100%; } .nui-barra input[type=text], .nui-barra input[type=search] { width: 360px; } .nui-espaco { flex: 1; } .nui-status { font-size: var(--nui-t-rotulo); color: var(--nui-suave); } .nui-abas { display: inline-flex; border: 1px solid var(--nui-linha); border-radius: 6px; overflow: hidden; } .nui-aba { border: 0; border-right: 1px solid var(--nui-linha); background: #fff; color: var(--nui-texto); padding: 0 14px; height: 36px; font-size: 14px; font-weight: 600; cursor: pointer; } .nui-aba:last-child { border-right: 0; } .nui-aba:hover:not(.sel) { background: var(--nui-fundo); } .nui-aba.sel { background: var(--nui-destaque); color: #fff; } .nui-cartoes { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; } .nui-cartao { flex: 0 1 auto; min-width: 160px; background: var(--nui-painel); border: 1px solid var(--nui-linha); border-radius: 8px; padding: 8px 14px; } .nui-cartao > span { display: block; font-size: var(--nui-t-rotulo); color: var(--nui-suave); } .nui-cartao > b { display: block; font-size: 18px; font-variant-numeric: tabular-nums; } .nui-cartao-ok { background: var(--nui-ok-fundo); border-color: #b9dcc0; } .nui-cartao-atencao { background: var(--nui-atencao-fundo); border-color: #f0d49a; } .nui-cartao-erro { background: var(--nui-erro-fundo); border-color: #f2b8b2; } .nui-acoes { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; } .nui-painel { background: #fcfcfd; border: 1px solid var(--nui-linha); border-radius: 8px; padding: 12px 14px; margin-bottom: 14px; max-width: 900px; } .nui-painel > h2, .nui-secao { margin: 0 0 10px; font-size: var(--nui-t-leitura); font-weight: 700; } .nui-ajuda { margin: 0 0 10px; color: var(--nui-suave); } .nui-campo { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; min-width: 0; } .nui-campo > span { font-size: var(--nui-t-rotulo); color: var(--nui-suave); } .nui-campo input, .nui-campo select, .nui-campo textarea { width: 100%; min-width: 0; height: 36px; padding: 0 10px; border: 1px solid var(--nui-linha); border-radius: 6px; background: #fff; font-size: var(--nui-t-leitura); color: var(--nui-texto); } .nui-campo textarea { height: auto; min-height: 64px; padding: 6px 10px; } .nui-campo input:focus, .nui-campo select:focus, .nui-campo textarea:focus, .nui-barra input:focus, .nui-barra select:focus { outline: none; border-color: var(--nui-destaque); } .nui-par { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 10px; } .nui-duas-colunas { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px; align-items: start; } .nui-duas-colunas > div > * + .nui-secao { margin-top: 16px; } .nui-detalhe { margin-top: 16px; border-top: 2px solid var(--nui-destaque); padding-top: 12px; } .nui-bloco { line-height: 1.6; } .nui-texto-pre { white-space: pre-wrap; font: 13px/1.5 Consolas, monospace; background: #f6f7f9; border: 1px solid var(--nui-linha); border-radius: 6px; padding: 8px 10px; max-height: 260px; overflow-y: auto; margin: 0; } .nui-info { display: block; padding: 8px 12px; border-radius: 6px; margin-bottom: 10px; background: var(--nui-info-fundo); color: #0a4f78; border: 1px solid #c9dcf0; } .nui-info-ok { background: var(--nui-ok-fundo); color: var(--nui-ok); border-color: #b9dcc0; } .nui-info-atencao { background: var(--nui-atencao-fundo); color: #7a4d00; border-color: #f0d49a; } .nui-info-erro { background: var(--nui-erro-fundo); color: var(--nui-erro); border-color: #f2b8b2; } .nui-num { font-variant-numeric: tabular-nums; } .nui-suave { color: var(--nui-suave); } .nui-forte-erro { color: var(--nui-erro); font-weight: 700; } .nui-estado { text-align: center; padding: 28px 16px; border: 1px dashed var(--nui-linha); border-radius: 8px; color: var(--nui-suave); background: var(--nui-painel); } .nui-estado > b { display: block; color: var(--nui-texto); margin-bottom: 4px; } .nui-estado > p { margin: 0 0 10px; } .nui-estado-erro { border-style: solid; border-color: #f2b8b2; background: var(--nui-erro-fundo); } .nui-estado-erro > b { color: var(--nui-erro); } .nui-estado-sem-acesso { border-style: solid; border-color: #f0d49a; background: var(--nui-atencao-fundo); } @media (max-width: 1300px) { .nui-duas-colunas { grid-template-columns: minmax(0, 1fr); } } @media (max-width: 560px) { .nui-par { grid-template-columns: minmax(0, 1fr); } .nui-barra input[type=text], .nui-barra input[type=search] { width: 100%; } } /* Campo de pesquisa (Nitron.ui.pesquisa) */ .nui-pq { display: flex; flex-direction: column; gap: 2px; min-width: 0; font: var(--nui-fonte); } .nui-pq-linha { display: flex; min-width: 0; } .nui-pq-linha input { flex: 1 1 auto; width: 100%; min-width: 0; height: 36px; padding: 0 10px; border: 1px solid var(--nui-linha); border-right: 0; border-radius: 6px 0 0 6px; background: #fff; font-size: 14px; color: var(--nui-texto); box-sizing: border-box; } .nui-pq-linha input:focus { outline: none; border-color: var(--nui-destaque); } .nui-pq-lupa { flex: none; width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--nui-linha); border-radius: 0 6px 6px 0; background: #f4f6f9; color: var(--nui-suave); cursor: pointer; padding: 0; } .nui-pq-lupa:hover:not(:disabled) { background: #e3effa; color: var(--nui-destaque); } .nui-pq-lupa:disabled { opacity: .5; cursor: not-allowed; } .nui-pq-desc { min-height: 16px; font-size: 12px; color: var(--nui-suave); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .nui-pq-invalido .nui-pq-linha input, .nui-pq-invalido .nui-pq-lupa { border-color: var(--nui-erro); } .nui-pq-invalido .nui-pq-desc { color: var(--nui-erro); } .nui-pq-lista { position: fixed; z-index: 9050; margin: 0; padding: 4px 0; list-style: none; max-height: 280px; overflow-y: auto; background: #fff; border: 1px solid var(--nui-linha); border-radius: 6px; box-shadow: 0 8px 24px rgba(0, 0, 0, .15); font: var(--nui-fonte); color: var(--nui-texto); box-sizing: border-box; } .nui-pq-lista li { padding: 6px 10px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .nui-pq-lista li b { display: inline-block; min-width: 56px; font-variant-numeric: tabular-nums; } .nui-pq-lista li.nui-pq-marcado, .nui-pq-lista li[data-i]:hover { background: #e3effa; } .nui-pq-nada { color: var(--nui-suave); cursor: default !important; padding: 10px; margin: 0; } .nui-pq-modal { display: flex; flex-direction: column; gap: 10px; } .nui-pq-busca { font: inherit; height: 36px; padding: 0 10px; border: 1px solid var(--nui-linha); border-radius: 6px; width: 100%; box-sizing: border-box; } .nui-pq-busca:focus { outline: none; border-color: var(--nui-destaque); } .nui-pq-res { max-height: 50vh; overflow-y: auto; border: 1px solid var(--nui-linha); border-radius: 6px; } .nui-pq-res table { width: 100%; border-collapse: collapse; } .nui-pq-res td { padding: 6px 10px; border-bottom: 1px solid #edf0f4; cursor: pointer; } .nui-pq-res tr:hover td, .nui-pq-res tr.nui-pq-marcado td { background: #e3effa; } .nui-pq-cod { width: 80px; font-weight: 600; font-variant-numeric: tabular-nums; }";
  (document.head || document.documentElement).appendChild(s);
})();
/* Nitron.fmt — mesma formatação do PCP (lib/format.ts): fuso de São Paulo, vazio = "—". */
(function (N) {
  var FUSO = "America/Sao_Paulo";
  var VAZIO = "—";

  // ISO, timestamp, Date e o "DD/MM/AAAA HH:MM:SS" do Sankhya (hora de São Paulo, UTC-3 fixo).
  function paraData(v) {
    if (v == null || v === "") return null;
    if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
    if (typeof v === "number") return isFinite(v) ? new Date(v) : null;
    var br = /^(\d{2})\/(\d{2})\/(\d{4})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/.exec(String(v).trim());
    if (br) return new Date(br[3] + "-" + br[2] + "-" + br[1] + "T" + (br[4] || "00") + ":" + (br[5] || "00") + ":" + (br[6] || "00") + "-03:00");
    var d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }

  var cache = {};
  function df(o) {
    var k = JSON.stringify(o);
    return cache[k] || (cache[k] = new Intl.DateTimeFormat("pt-BR", Object.assign({ timeZone: FUSO }, o)));
  }

  function num(v) {
    if (v == null || v === "") return null;
    var n = typeof v === "number" ? v : Number(String(v).replace(",", "."));
    return isFinite(n) ? n : null;
  }

  N.fmt = {
    FUSO: FUSO,
    VAZIO: VAZIO,
    paraData: paraData,
    /** 18/10/2026 · {curto:true} → 18/10 · {ano:2} → 18/10/26 */
    data: function (v, o) {
      o = o || {};
      var d = paraData(v);
      if (!d) return VAZIO;
      if (o.curto) return df({ day: "2-digit", month: "2-digit" }).format(d);
      return df({ day: "2-digit", month: "2-digit", year: o.ano === 2 ? "2-digit" : "numeric" }).format(d);
    },
    /** 14:05 · {segundos:true} → 14:05:09 */
    hora: function (v, o) {
      o = o || {};
      var d = paraData(v);
      if (!d) return VAZIO;
      return df(o.segundos ? { hour: "2-digit", minute: "2-digit", second: "2-digit" } : { hour: "2-digit", minute: "2-digit" }).format(d);
    },
    /** 18/10/2026 14:05 · {curto:true} → 18/10 14:05 */
    dataHora: function (v, o) {
      var d = paraData(v);
      if (!d) return VAZIO;
      return N.fmt.data(d, o) + " " + N.fmt.hora(d, o);
    },
    /** 1.234 · {casas:2} → 1.234,50 · {zeroVazio:true} */
    num: function (v, o) {
      o = o || {};
      var n = num(v);
      if (n == null || (o.zeroVazio && n === 0)) return VAZIO;
      return n.toLocaleString("pt-BR", o.casas == null ? undefined : { minimumFractionDigits: o.casas, maximumFractionDigits: o.casas });
    },
    /** R$ 1.234,56 */
    moeda: function (v) {
      var n = num(v);
      return n == null ? VAZIO : n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    /** recebe 0–100: 12,5% */
    pct: function (v, casas) {
      var n = num(v);
      return n == null ? VAZIO : n.toLocaleString("pt-BR", { maximumFractionDigits: casas == null ? 1 : casas }) + "%";
    },
    /** minutos → 45min · 2h · 2h05 */
    duracao: function (min) {
      var n = num(min);
      if (n == null || n < 0) return VAZIO;
      var t = Math.round(n);
      if (t < 60) return t + "min";
      var h = Math.floor(t / 60), m = t % 60;
      return m ? h + "h" + String(m).padStart(2, "0") : h + "h";
    },
    /** milissegundos → 12min 05s · 1h05min */
    decorrido: function (ms) {
      var n = num(ms);
      if (n == null) return VAZIO;
      var s = Math.max(0, Math.floor(n / 1000)), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
      return h > 0 ? h + "h" + String(m).padStart(2, "0") + "min" : m + "min " + String(s % 60).padStart(2, "0") + "s";
    }
  };
})(window.Nitron);

/* Nitron.sankhya — chamadas ao gateway do Sankhya (/mge/service.sbr) a partir de uma tela HTML5.
   Regras do ambiente, já embutidas:
   - UMA chamada por vez na sessão (o Sankhya cancela concorrentes): tudo passa por uma fila.
   - Resposta em ISO-8859-1: decodifica pelo charset do header.
   - status "1" = ok; "2" = ok com mensagem da ação; outro = erro (vem com HTML).
   - loadView: `fields.field` é UM objeto com a lista por vírgula (array é ignorado em silêncio). */
(function (N) {
  var base = "";
  try { if (/^https?:/.test(window.location.origin)) base = window.location.origin; } catch (e) {}

  var cfg = { apiBase: base, lote: 30, tamParam: 0 };

  function lista(x) { return x == null ? [] : (Array.isArray(x) ? x : [x]); }

  function limpaMsg(m) {
    if (!m) return "";
    var t = String(m);
    try { t = decodeURIComponent(t); } catch (e) {}
    return t.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "").replace(/^\s*Regra Personalizada:\s*/i, "").trim();
  }

  /* A sessão da janela do Sankhya. Gadget não recebe na URL: ela está no src dos iframes da janela principal.
     Sem ela, gravação de serviço fora do /mge volta "Não autorizado" (ERP 4.36, ex.: conciliarChequesDespesasBancarios). */
  function mgeSession() {
    if (cfg.mgeSession === false) return "";
    if (typeof cfg.mgeSession === "string") return cfg.mgeSession;
    var achou = function (txt) { return (/mgeSession=([^&\s"#]+)/.exec(txt || "") || [])[1] || ""; };
    try { var s = achou(window.location.search); if (s) return s; } catch (e) {}
    try {
      return achou(Array.prototype.map.call(window.top.document.querySelectorAll("iframe"), function (f) { return f.src; }).join(" "));
    } catch (e) { return ""; }
  }

  var fila = Promise.resolve();
  function enfileira(tarefa) {
    var p = fila.then(tarefa, tarefa);
    fila = p.then(function () {}, function () {});
    return p;
  }

  /** servico("CRUDServiceProvider.loadView", corpo, { signal, modulo: "mge" | "mgefin" | ... }) */
  function servico(serviceName, requestBody, opcoes) {
    var o = opcoes || {};
    return enfileira(async function () {
      var url = cfg.apiBase + "/" + (o.modulo || "mge") + "/service.sbr?serviceName=" + serviceName + "&outputType=json";
      var ms = serviceName.indexOf("mgeSession=") < 0 ? mgeSession() : "";
      if (ms) url += "&mgeSession=" + ms;
      var resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ serviceName: serviceName, requestBody: requestBody }),
        signal: o.signal
      });
      if (!resp.ok) throw new Error("O Sankhya respondeu HTTP " + resp.status + " em " + serviceName);
      var buf = await resp.arrayBuffer();
      var cs = (/charset=([\w-]+)/i.exec(resp.headers.get("content-type") || "") || [])[1] || "iso-8859-1";
      var data = JSON.parse(new TextDecoder(cs).decode(buf));
      var st = String(data.status);
      if (data.status != null && st !== "1" && st !== "2") {
        var erro = new Error(limpaMsg(data.statusMessage) || "Falha em " + serviceName);
        erro.servico = serviceName;
        throw erro;
      }
      var rb = data.responseBody || {};
      if (data.statusMessage) {
        try { Object.defineProperty(rb, "__mensagem", { value: limpaMsg(data.statusMessage) }); } catch (e) {}
      }
      return rb;
    });
  }

  function converte(o, numericos) {
    lista(numericos).forEach(function (c) {
      if (o[c] != null && o[c] !== "") {
        var n = Number(String(o[c]).replace(",", "."));
        if (isFinite(n)) o[c] = n;
      }
    });
    return o;
  }

  /** loadView("AD_VW_X", { campos: "A,B", where, ordem, limite, numericos: ["VALOR"] }) → [{A, B}] */
  async function loadView(view, o, signal) {
    o = o || {};
    var campos = Array.isArray(o.campos) ? o.campos.join(",") : o.campos;
    var query = { viewName: view };
    if (campos) query.fields = { field: { "$": campos } };
    if (o.where) query.where = { "$": o.where };
    if (o.ordem) query.orderBy = o.ordem;
    if (o.limite) query.limit = o.limite;
    var rb = await servico("CRUDServiceProvider.loadView", { query: query }, { signal: signal });
    return lista(rb.records && rb.records.record).map(function (r) {
      var o2 = {};
      for (var k in r) { var v = r[k]; o2[k] = v && typeof v === "object" ? (v["$"] != null ? v["$"] : null) : v; }
      return converte(o2, o.numericos);
    });
  }

  /** loadRecords("Financeiro", { campos: "NUFIN,VLRDESDOB", where: "this.NUFIN = 1", ordem, max, numericos }) */
  async function loadRecords(entidade, o, signal) {
    o = o || {};
    var campos = Array.isArray(o.campos) ? o.campos.join(",") : o.campos;
    var rb = await servico("CRUDServiceProvider.loadRecords", {
      dataSet: {
        rootEntity: entidade,
        includePresentationFields: "N",
        useDefaultRowsLimit: false,
        pageNumber: 1,
        totalRecordsCount: o.max || 5000,
        criteria: { expression: { "$": o.where || "" } },
        orderByExpression: o.ordem || "",
        entity: [{ path: "", fieldset: { list: campos } }]
      }
    }, { signal: signal });
    var ents = rb.entities;
    if (!ents || !ents.metadata || !Number(ents.total || 0)) return [];
    var nomes = lista(ents.metadata.fields.field).map(function (f) { return f.name; });
    return lista(ents.entity).map(function (rec) {
      var o2 = {};
      nomes.forEach(function (n, i) { var c = rec["f" + i]; o2[n] = c && c["$"] != null ? c["$"] : null; });
      return converte(o2, o.numericos);
    });
  }

  /* Valor no formato que o próprio cliente do Sankhya manda (snk.js, dataToString):
     data = "DD/MM/AAAA HH:mm:ss" (hora de São Paulo), número e texto = toString, vazio = "". */
  function paraTexto(v) {
    if (v == null) return "";
    if (v instanceof Date) {
      var p = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).format(v);
      return p.replace(",", "");
    }
    return String(v);
  }

  /* DatasetSP.save conforme a doc oficial (developer.sankhya.com.br/reference/post_salve) e a grade nativa (snk.js):
     fields = nomes; values indexados pela POSIÇÃO em fields; com pk = alteração, sem pk = inclusão;
     foreignKey = chave do registro pai (entidade filha). A resposta (result) vem como listas na ordem de fields:
     devolvemos objetos { CAMPO: valor }. Campo em "retornar" entra em fields sem valor, só para voltar na resposta
     (é assim que se recebe a chave gerada na inclusão). */
  async function datasetSave(entidade, regs, retornar) {
    var fields = [];
    lista(retornar).forEach(function (c) { if (fields.indexOf(c) < 0) fields.push(c); });
    regs.forEach(function (r) {
      Object.keys(r.pk || {}).concat(Object.keys(r.valores || {})).forEach(function (c) { if (fields.indexOf(c) < 0) fields.push(c); });
    });
    var resultado = [];
    for (var i = 0; i < regs.length; i += cfg.lote) {
      var rb = await servico("DatasetSP.save", {
        entityName: entidade,
        standAlone: false,
        fields: fields,
        records: regs.slice(i, i + cfg.lote).map(function (r) {
          var vals = {}, reg = {};
          Object.keys(r.valores || {}).forEach(function (c) { vals[String(fields.indexOf(c))] = paraTexto(r.valores[c]); });
          if (r.pk) {
            reg.pk = {};
            Object.keys(r.pk).forEach(function (c) { reg.pk[c] = paraTexto(r.pk[c]); });
          }
          if (r.pai) {
            reg.foreignKey = {};
            Object.keys(r.pai).forEach(function (c) { reg.foreignKey[c] = paraTexto(r.pai[c]); });
          }
          reg.values = vals;
          return reg;
        }),
        txProperties: { i18n: "disabled" },
        ignoreListenerMethods: ""
      });
      lista(rb.result).forEach(function (linha) {
        if (!Array.isArray(linha)) { resultado.push(linha); return; }
        var o = {};
        fields.forEach(function (c, i) { o[c] = linha[i]; });
        resultado.push(o);
      });
    }
    return resultado;
  }

  /** Altera pelo save nativo (vale a permissão do usuário e rodam os eventos da entidade).
      salvar("Financeiro", { NUFIN: 1 }, { CODCTABCOINT: 55 })  ou, em lote,
      salvar("Financeiro", [{ pk: { NUFIN: 1 }, valores: { CODCTABCOINT: 55 } }, ...]) */
  async function salvar(entidade, pkOuLista, valores) {
    var regs = Array.isArray(pkOuLista) ? pkOuLista : [{ pk: pkOuLista, valores: valores }];
    if (!regs.length) return [];
    regs.forEach(function (r) { if (!r.pk || !Object.keys(r.pk).length) throw new Error("salvar() altera registro existente e precisa da chave. Para criar, use inserir()."); });
    return datasetSave(entidade, regs);
  }

  /** Inclui pelo save nativo e devolve os registros criados como objetos.
      inserir("Parceiro", { NOMEPARC: "...", ATIVO: "S" }, { retornar: ["CODPARC"] })  → [{ CODPARC: "4454", ... }]
      inserir("Contato", [{ NOMECONTATO: "..." }], { chavePai: { CODPARC: 4454 }, retornar: ["CODCONTATO"] })
      A chave pode ir nos valores (informada) ou ficar de fora (o Sankhya gera); use "retornar" para recebê-la. */
  async function inserir(entidade, valoresOuLista, opcoes) {
    var o = opcoes || {};
    var regs = (Array.isArray(valoresOuLista) ? valoresOuLista : [valoresOuLista]).map(function (v) { return { valores: v, pai: o.chavePai }; });
    if (!regs.length) return [];
    return datasetSave(entidade, regs, o.retornar);
  }

  /** Exclui pelo removeRecord nativo, o mesmo da tela (mesmas regras, permissões e eventos).
      Não está na documentação oficial da API: o formato vem do cliente do Sankhya (snk.js) e foi testado na HML.
      remover("Financeiro", { NUFIN: 1 })  ou  remover("Financeiro", [{ NUFIN: 1 }, { NUFIN: 2 }]) */
  async function remover(entidade, pkOuLista) {
    var pks = (Array.isArray(pkOuLista) ? pkOuLista : [pkOuLista]).map(function (pk) {
      var o = {};
      Object.keys(pk || {}).forEach(function (c) { o[c] = paraTexto(pk[c]); });
      if (!Object.keys(o).length) throw new Error("remover() precisa da chave do registro.");
      return o;
    });
    for (var i = 0; i < pks.length; i += cfg.lote) {
      await servico("DatasetSP.removeRecord", {
        entityName: entidade,
        standAlone: false,
        pks: pks.slice(i, i + cfg.lote),
        txProperties: { i18n: "disabled" },
        ignoreListenerMethods: ""
      });
    }
    return pks.length;
  }

  /* Os dados vão num parâmetro só, P_DADOS ("CHAVE=valor&..."); com tamParam > 0, em pedaços P_DADOS2..9. */
  function paramsDaAcao(dados) {
    var partes = [];
    Object.keys(dados || {}).forEach(function (k) {
      var v = dados[k];
      if (v === null || v === undefined || v === "") return;
      partes.push(encodeURIComponent(k) + "=" + encodeURIComponent(String(v)));
    });
    var tudo = partes.join("&");
    var tam = Number(cfg.tamParam) || 0;
    var pedacos = tam > 0 ? (tudo.match(new RegExp(".{1," + tam + "}", "g")) || [""]) : [tudo];
    if (pedacos.length > 9) throw new Error("Dados grandes demais para a ação. Envie menos itens por vez.");
    return { params: { param: pedacos.map(function (p, i) { return { type: "S", paramName: i ? "P_DADOS" + (i + 1) : "P_DADOS", "$": p }; }) } };
  }

  /** executarAcao(100, { NUFIN: 1 }) → mensagem de retorno da ação Java */
  async function executarAcao(actionID, dados, signal) {
    var rb = await servico("ActionButtonsSP.executeJava", {
      javaCall: Object.assign({ actionID: actionID }, paramsDaAcao(dados))
    }, { signal: signal });
    var msg = rb.__mensagem || "";
    if (!msg) {
      try {
        var c = rb.clientEvents || rb.clientEvent;
        msg = rb.mensagem || rb.messageBody || (c && (c.mensagem || c.msg)) || "";
        if (msg && typeof msg === "object") msg = msg["$"] || "";
        if (msg) msg = limpaMsg(msg);
      } catch (e) { msg = ""; }
    }
    return msg || "Concluído.";
  }

  /** "18/10/2026" para usar em where: dataSankhya(new Date()) */
  function dataSankhya(d) {
    d = d instanceof Date ? d : new Date(d);
    return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear();
  }

  N.sankhya = {
    configurar: function (o) { Object.assign(cfg, o || {}); return cfg; },
    servico: servico,
    mgeSession: mgeSession,
    loadView: loadView,
    loadRecords: loadRecords,
    salvar: salvar,
    inserir: inserir,
    remover: remover,
    paraTexto: paraTexto,
    executarAcao: executarAcao,
    dataSankhya: dataSankhya,
    limpaMsg: limpaMsg,
    lista: lista
  };
})(window.Nitron);

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
        aoFechar: () => {}
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
    /* Clique fora nao fecha (quem digitava perdia o que digitou): fecha no X, nos botoes e no Esc. */

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
    botaoComponenteBI();
  }

  /* No lugar do botao da moldura que some acima: a engrenagem que leva a tela de Componentes de BI ja neste
     componente. So para quem tem acesso a tela (PermissaoAcessoSP.reset do recurso, decodificado pela funcao do
     proprio Sankhya, utxt, da janela que hospeda o dash: supervisor ou "C" liberado). O numero do componente vem
     no endereco do dash (nuGdg); a tela abre pelo workspace do Sankhya com a chave NUGDG (GadgetBuilder.loadByPK). */
  var RECURSO_BI = "br.com.sankhya.core.cfg.GadgetBuilder";
  function janelaCom(teste) {
    var l = [];
    try { l.push(window.top); } catch (e) {}
    try { l.push(window.parent.parent); } catch (e) {}
    try { l.push(window.parent); } catch (e) {}
    for (var i = 0; i < l.length; i++) { try { if (l[i] && teste(l[i])) return l[i]; } catch (e) {} }
    return null;
  }
  async function acessoComponentesBI() {
    var w = janelaCom(function (x) { return typeof x.utxt === "function"; });
    if (!w) return false;
    var rb = await N.sankhya.servico("PermissaoAcessoSP.reset", { resource: { id: RECURSO_BI } });
    var cod = rb && rb.authorizationSf && rb.authorizationSf.$;
    if (!cod) return false;
    var doc = new DOMParser().parseFromString(w.utxt(cod), "text/xml");
    var raiz = doc.getElementsByTagName("authorization")[0] || doc.documentElement;
    if (raiz.getAttribute("isSup") === "S") return true;
    var itens = raiz.getElementsByTagName("item");
    for (var i = 0; i < itens.length; i++)
      if (itens[i].getAttribute("name") === "C" && String(itens[i].getAttribute("status")) === "true") return true;
    return false;
  }
  async function botaoComponenteBI() {
    var nuGdg = +(new URLSearchParams(window.location.search).get("nuGdg") || 0);
    if (!nuGdg || document.getElementById("nui-botao-bi") || !(await acessoComponentesBI())) return;
    if (document.getElementById("nui-botao-bi")) return;
    var b = el("button", "nui-bi", '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>');
    b.id = "nui-botao-bi";
    b.type = "button";
    b.title = "Componente de BI " + nuGdg;
    b.setAttribute("aria-label", b.title);
    b.onclick = function () {
      var w = janelaCom(function (x) { return x.workspace && typeof x.workspace.openAppActivity === "function"; });
      if (w) w.workspace.openAppActivity(RECURSO_BI, { NUGDG: nuGdg });
    };
    document.body.appendChild(b);
  }

  N.ui = { modal: modal, confirmar: confirmar, avisar: avisar, carregando: carregando, esconderMoldura: esconderMoldura, esc: esc };
})(window.Nitron);

/* Nitron.ui.grade — tabela de dados padrão: busca, filtros (em modal), filtros salvos, colunas, ordenação,
   total, seleção e exportação .xlsx. Com `id`, guarda o que cada pessoa configurou (Nitron.pref),
   inclusive a ORDEM das colunas (arrastar o cabeçalho, ou as setas em Colunas).

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
     expandir: async (linha) => "<html>",  // drill-down: clicar abre o detalhe logo abaixo da linha, clicar de novo fecha (no lugar de aoClicar)
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
  /* Marca na celula o trecho que a busca achou, sem acento e sem maiuscula como a propria busca.
     Anda pelos nos de texto: vale tambem para coluna com html(), sem mexer no HTML de quem montou. */
  function destaca(raiz, termo) {
    if (!termo) return;
    var nos = [], w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) if (n.nodeValue.trim()) nos.push(n);
    nos.forEach(function (no) {
      var orig = no.nodeValue, chato = "", mapa = [];
      for (var i = 0; i < orig.length; i++) {
        var c = norm(orig[i]);
        for (var j = 0; j < c.length; j++) { chato += c[j]; mapa.push(i); }
      }
      var partes = [], ult = 0, p = chato.indexOf(termo);
      while (p >= 0) {
        var ini = mapa[p], fim = mapa[p + termo.length - 1] + 1;
        if (ini >= ult) { partes.push([ini, fim]); ult = fim; }
        p = chato.indexOf(termo, p + termo.length);
      }
      if (!partes.length) return;
      var frag = document.createDocumentFragment(), pos = 0;
      partes.forEach(function (pt) {
        if (pt[0] > pos) frag.appendChild(document.createTextNode(orig.slice(pos, pt[0])));
        var m = document.createElement("mark");
        m.className = "nui-g-achado";
        m.textContent = orig.slice(pt[0], pt[1]);
        frag.appendChild(m);
        pos = pt[1];
      });
      if (pos < orig.length) frag.appendChild(document.createTextNode(orig.slice(pos)));
      no.parentNode.replaceChild(frag, no);
    });
  }
  function numero(v) {
    if (v == null || v === "") return null;
    var n = typeof v === "number" ? v : Number(String(v).replace(",", "."));
    return isFinite(n) ? n : null;
  }
  // O que a pessoa digita no filtro: "1.000,50", "1000,5" ou "1000.5". Com vírgula, o ponto é milhar.
  function numeroDigitado(s) {
    s = String(s == null ? "" : s).replace(/[R$\s]/g, "");
    if (!s) return null;
    if (s.indexOf(",") >= 0 || /^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "").replace(",", ".");
    var n = Number(s);
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
      posicao: null,            // ordem das colunas escolhida pela pessoa (lista de campos); null = a da tela
      tamPagina: TAMANHOS.indexOf(o.tamPagina) >= 0 ? o.tamPagina : 50,
      filtros: {},
      salvos: [],
      totais: null              // colunas somadas no rodapé escolhidas pela pessoa; null = as da tela (total: true)
    };
    var chavePref = o.id ? "grade:" + o.id : null;
    var tGrava;
    var abertos = {};           // linhas expandidas (o.expandir): chave -> HTML do detalhe; null enquanto carrega
    function guarda() {
      if (!chavePref) return;
      clearTimeout(tGrava);
      tGrava = setTimeout(function () { N.pref.gravar(chavePref, estado); }, 300);
    }
    // colunas na ordem da pessoa; campo novo na tela (fora da ordem guardada) entra no fim
    function ordenadas() {
      if (!estado.posicao) return cols.slice();
      var lista = estado.posicao.filter(function (k) { return porCampo[k]; }).map(function (k) { return porCampo[k]; });
      return lista.concat(cols.filter(function (c) { return lista.indexOf(c) < 0; }));
    }
    // Só dinheiro e quantidade somam (código e % não fazem sentido somados).
    function totalizavel(c) { return c.tipo === "moeda" || c.tipo === "num"; }
    function totaliza(c) { return totalizavel(c) && (estado.totais ? estado.totais.indexOf(c.campo) >= 0 : !!c.total); }
    function vcols() { return ordenadas().filter(function (c) { return estado.ocultas.indexOf(c.campo) < 0; }); }
    function moveColuna(campo, alvo, depois) {
      var ordem = ordenadas().map(function (c) { return c.campo; });
      ordem.splice(ordem.indexOf(campo), 1);
      ordem.splice(ordem.indexOf(alvo) + (depois ? 1 : 0), 0, campo);
      estado.posicao = ordem;
      guarda(); desenha();
    }

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
             ' draggable="true" title="Clique para ordenar · arraste para mudar a coluna de lugar">' + esc(c.titulo || c.campo) + seta + "</th>";
      });
      thead.innerHTML = h + "</tr>";
      thead.querySelectorAll("th[data-campo]").forEach(function (th) {
        th.onclick = function () {
          var k = th.dataset.campo, ord = estado.ordem;
          estado.ordem = ord && ord.campo === k ? (ord.asc ? { campo: k, asc: false } : null) : { campo: k, asc: true };
          guarda();
          aplica();
        };
        th.ondragstart = function (e) {
          e.dataTransfer.setData("text/plain", th.dataset.campo);
          e.dataTransfer.effectAllowed = "move";
          th.classList.add("nui-g-arrastando");
        };
        th.ondragend = function () { th.classList.remove("nui-g-arrastando"); };
        th.ondragover = function (e) {
          e.preventDefault();
          var r = th.getBoundingClientRect(), dir = e.clientX > r.left + r.width / 2;
          th.classList.toggle("nui-g-alvo-dir", dir);
          th.classList.toggle("nui-g-alvo-esq", !dir);
        };
        th.ondragleave = function () { th.classList.remove("nui-g-alvo-dir", "nui-g-alvo-esq"); };
        th.ondrop = function (e) {
          e.preventDefault();
          var de = e.dataTransfer.getData("text/plain"), depois = th.classList.contains("nui-g-alvo-dir");
          th.classList.remove("nui-g-alvo-dir", "nui-g-alvo-esq");
          if (de && de !== th.dataset.campo && porCampo[de]) moveColuna(de, th.dataset.campo, depois);
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
        if (o.expandir && k in abertos) {
          h += '<tr class="nui-g-detalhe"><td colspan="' + (vc.length + (o.selecao ? 1 : 0)) + '">' +
               (abertos[k] == null ? '<div class="nui-g-esperando">Carregando…</div>' : abertos[k]) + "</td></tr>";
        }
      });
      if (!mostra.length) {
        var msg = todas.length ? "Nenhuma linha com esses filtros." : (o.vazio || "Nada para mostrar.");
        h = '<tr><td class="nui-g-vazio" colspan="' + (vc.length + (o.selecao ? 1 : 0)) + '">' + esc(msg) + "</td></tr>";
      }
      tbody.innerHTML = h;
      if (busca) tbody.querySelectorAll("tr[data-idx] td:not(.nui-g-ck)").forEach(function (td) { destaca(td, busca); });
      tbody.querySelectorAll("tr[data-idx]").forEach(function (tr) {
        var l = mostra[Number(tr.dataset.idx)];
        var ck = tr.querySelector("input[type=checkbox]");
        if (ck) ck.onclick = function (e) {
          e.stopPropagation();
          if (ck.checked) sel[l[o.chave]] = l; else delete sel[l[o.chave]];
          tr.classList.toggle("nui-g-marcada", ck.checked);
          montaCabecalho(); atualizaAcoes(); rodapeTexto();
        };
        if (o.expandir) {
          tr.classList.add("nui-g-clicavel");
          if (l[o.chave] in abertos) tr.classList.add("nui-g-aberta");
          tr.onclick = function (e) { if (!e.target.closest("a, button, input, select")) alterna(l); };
        } else if (o.aoClicar) { tr.classList.add("nui-g-clicavel"); tr.onclick = function () { o.aoClicar(l); }; }
      });

      var temTotal = vc.some(totaliza);
      if (temTotal && vis.length) {
        var f = "<tr>" + (o.selecao ? "<td></td>" : "");
        vc.forEach(function (c, i) {
          if (totaliza(c)) {
            var s = vis.reduce(function (a, l) { return a + (numero(l[c.campo]) || 0); }, 0);
            f += '<td class="nui-dir">' + esc(texto(c, s, {})) + "</td>";
          } else f += i === 0 ? "<td>Total</td>" : "<td></td>";
        });
        tfoot.innerHTML = f + "</tr>";
      } else tfoot.innerHTML = "";

      desenhaChips(); atualizaAcoes(); rodapeTexto();
      if (o.aoAtualizar) o.aoAtualizar(api);
    }

    async function alterna(l) {
      var k = l[o.chave];
      if (k in abertos) { delete abertos[k]; desenha(); return; }
      abertos[k] = null; desenha();
      var html;
      try { html = await o.expandir(l); html = html == null ? "" : String(html); }
      catch (e) { html = '<div class="nui-g-erro">' + esc(e && e.message || e) + "</div>"; }
      if (k in abertos) { abertos[k] = html; desenha(); }
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
        // Lista com um valor só não filtra nada (marcar tudo = sem filtro): não mostra a linha.
        if (lista && distintos.length <= 1 && !f.valores) return;
        html += '<div class="nui-f-linha" data-i="' + i + '"><div class="nui-f-nome">' + nome + "</div><div>";
        if (lista) {
          distintos.sort().forEach(function (v) {
            var marcado = f.valores ? f.valores.indexOf(v) >= 0 : false;
            html += '<label class="nui-f-op"><input type="checkbox" value="' + esc(v) + '"' + (marcado ? " checked" : "") + "> " + esc(texto(c, v, {})) + "</label>";
          });
        } else if (ehNum(c) || ehData(c)) {
          // Número em campo de texto: o type="number" descarta "1.000,00" em silêncio e o filtro não age.
          var tipo = ehData(c) ? 'type="date"' : 'type="text" inputmode="decimal"';
          var mostra = function (v) { return v == null ? "" : ehNum(c) ? String(v).replace(".", ",") : v; };
          html += '<span class="nui-f-faixa"><input class="nui-f-de" ' + tipo + ' placeholder="de" value="' + esc(mostra(f.de)) + '"><span>até</span>' +
                  '<input class="nui-f-ate" ' + tipo + ' placeholder="até" value="' + esc(mostra(f.ate)) + '"></span>';
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
            var fd = ehNum(c) ? numeroDigitado(de.value) : (de.value || null), fa = ehNum(c) ? numeroDigitado(ate.value) : (ate.value || null);
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
      var html = '<div class="nui-f-dica">Escolha o que aparece e a ordem (setas, ou arraste o cabeçalho na grade). Vale também para a exportação. Em colunas de valor, "Somar" mostra o total no rodapé e no Excel.</div><div class="nui-colunas">' +
        ordenadas().map(function (c) {
          return '<div class="nui-col-linha"><label class="nui-f-op"><input type="checkbox" class="nui-col-ver" value="' + esc(c.campo) + '"' + (estado.ocultas.indexOf(c.campo) < 0 ? " checked" : "") + "> " + esc(c.titulo || c.campo) + "</label>" +
            (totalizavel(c) ? '<label class="nui-col-somar" title="Somar no rodapé"><input type="checkbox" class="nui-col-tot" value="' + esc(c.campo) + '"' + (totaliza(c) ? " checked" : "") + "> Somar</label>" : "") +
            '<span class="nui-col-mover"><button type="button" data-mover="-1" title="Subir">↑</button><button type="button" data-mover="1" title="Descer">↓</button></span></div>';
        }).join("") + "</div>";
      var mc = N.ui.modal({
        titulo: "Colunas",
        conteudo: html,
        tamanho: "p",
        botoes: [
          { texto: "Padrão", tipo: "secundario", acao: function () {
              estado.ocultas = cols.filter(function (c) { return c.oculta; }).map(function (c) { return c.campo; });
              estado.posicao = null;
              estado.totais = null;
              guarda(); aplica();
          } },
          { texto: "Aplicar", tipo: "primario", acao: function (mm) {
              var marcadas = [].map.call(mm.corpo.querySelectorAll("input.nui-col-ver:checked"), function (k) { return k.value; });
              if (!marcadas.length) throw new Error("Deixe pelo menos uma coluna.");
              estado.ocultas = cols.filter(function (c) { return marcadas.indexOf(c.campo) < 0; }).map(function (c) { return c.campo; });
              estado.posicao = [].map.call(mm.corpo.querySelectorAll("input.nui-col-ver"), function (k) { return k.value; });
              estado.totais = [].map.call(mm.corpo.querySelectorAll("input.nui-col-tot:checked"), function (k) { return k.value; });
              guarda(); aplica();
          } }
        ]
      });
      mc.corpo.querySelectorAll("button[data-mover]").forEach(function (b) {
        b.onclick = function () {
          var linha = b.closest(".nui-col-linha"), pai = linha.parentNode;
          if (b.dataset.mover === "-1") { if (linha.previousElementSibling) pai.insertBefore(linha, linha.previousElementSibling); }
          else if (linha.nextElementSibling) pai.insertBefore(linha.nextElementSibling, linha);
        };
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
    function somaVisiveis(c) { return Math.round(vis.reduce(function (a, l) { return a + (numero(l[c.campo]) || 0); }, 0) * 1e6) / 1e6; }
    function formatoExcel(c) {
      return c.tipo === "codigo" ? "0" : c.tipo === "moeda" ? '"R$" #,##0.00' : c.tipo === "pct" ? "0.0%" : c.tipo === "num" ? (c.casas ? "#,##0." + "0".repeat(c.casas) : "#,##0") :
             c.tipo === "data" ? "dd/mm/yyyy" : c.tipo === "dataHora" ? "dd/mm/yyyy hh:mm" : null;
    }
    function exportaCsv(vc) {
      var linhas = [vc.map(function (c) { return c.titulo || c.campo; })].concat(vis.map(function (l) {
        return vc.map(function (c) {
          if (ehNum(c)) { var n = numero(l[c.campo]); return n == null ? "" : String(n).replace(".", ","); }
          var t = texto(c, l[c.campo], l);
          return t === F.VAZIO ? "" : t;
        });
      }));
      if (vis.length && vc.some(totaliza)) linhas.push(vc.map(function (c, i) {
        if (!totaliza(c)) return i === 0 ? "Total" : "";
        return String(somaVisiveis(c)).replace(".", ",");
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
          var z = formatoExcel(c);
          if (!z) return;
          for (var r = 1; r < aoa.length; r++) { var cel = ws[X.utils.encode_cell({ r: r, c: i })]; if (cel && cel.t !== "s") cel.z = z; }
        });
        // Linha de total com as mesmas colunas somadas na tela. SUBTOTAL(109) soma só o que o filtro do Excel deixar visível.
        var n = aoa.length;
        if (vis.length && vc.some(totaliza)) {
          vc.forEach(function (c, i) {
            var ref = X.utils.encode_cell({ r: n, c: i }), col = X.utils.encode_col(i);
            if (totaliza(c)) {
              ws[ref] = { t: "n", v: somaVisiveis(c), f: "SUBTOTAL(109," + col + "2:" + col + n + ")", z: formatoExcel(c) };
            } else if (i === 0) ws[ref] = { t: "s", v: "Total" };
          });
          ws["!ref"] = X.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: n, c: vc.length - 1 } });
        }
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
        abertos = {};
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
      if (Array.isArray(p.posicao)) estado.posicao = p.posicao;
      if (p.filtros) estado.filtros = p.filtros;
      if (Array.isArray(p.salvos)) estado.salvos = p.salvos;
      if (Array.isArray(p.totais)) estado.totais = p.totais.filter(function (k) { return porCampo[k]; });
      if (TAMANHOS.indexOf(p.tamPagina) >= 0) estado.tamPagina = p.tamPagina;
      aplica();
      return api;
    }) : Promise.resolve(api);
    return api;
  }

  N.ui.grade = grade;
})(window.Nitron);

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
