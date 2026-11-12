// node teste/pesquisa.test.mjs — filtro que o campo de pesquisa manda ao loadRecords
import { readFileSync } from "node:fs";
import vm from "node:vm";
const ctx = { window: { Nitron: { sankhya: {}, ui: { esc: (s) => String(s) } } }, Number, String, Object, Math, JSON };
vm.runInNewContext(readFileSync(new URL("../src/pesquisa.js", import.meta.url), "utf8"), ctx);
const p = ctx.window.Nitron.ui.pesquisa, T = p.tipos, w = p._montarWhere;
const top = Object.assign({}, T.top, { filtro: "this.TIPMOV = 'O'" });
const casos = [
  [w(T.natureza, "", false), "(this.ANALITICA = 'S' AND this.ATIVA = 'S')"],
  [w(T.natureza, "3010105", true), "(this.ANALITICA = 'S' AND this.ATIVA = 'S') AND this.CODNAT = 3010105"],
  [w(T.natureza, "materia prima", false), "(this.ANALITICA = 'S' AND this.ATIVA = 'S') AND (UPPER(this.DESCRNAT) LIKE '%MATERIA%' AND UPPER(this.DESCRNAT) LIKE '%PRIMA%')"],
  [w(T.centroResultado, "105", false), "(this.ANALITICO = 'S' AND this.ATIVO = 'S') AND (this.CODCENCUS = 105 OR TO_CHAR(this.CODCENCUS) LIKE '105%' OR (UPPER(this.DESCRCENCUS) LIKE '%105%'))"],
  [w(T.parceiro, "d'agua", false), "(this.ATIVO = 'S') AND (UPPER(this.NOMEPARC) LIKE '%D''AGUA%')"],
  [w(top, "2001", true), "(this.TIPMOV = 'O') AND this.DHALTER = (SELECT MAX(V.DHALTER) FROM TGFTOP V WHERE V.CODTIPOPER = this.CODTIPOPER) AND this.ATIVO = 'S' AND this.CODTIPOPER = 2001"],
];
let ok = 0;
casos.forEach(([a, b], i) => { if (a === b) ok++; else console.log("falhou", i, "\n  veio:   ", a, "\n  queria: ", b); });
console.log(ok + "/" + casos.length + " ok");
if (ok !== casos.length) process.exit(1);
