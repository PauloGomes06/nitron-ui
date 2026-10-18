// node teste/format.test.mjs — mesmos casos do PCP (lib/format.ts)
import { readFileSync } from "node:fs";
import vm from "node:vm";
const ctx = { window: { Nitron: {} }, Intl, Date, Number, String, Math, JSON, isFinite, isNaN };
vm.runInNewContext(readFileSync(new URL("../src/format.js", import.meta.url), "utf8"), ctx);
const f = ctx.window.Nitron.fmt;
const casos = [
  [f.data("2026-10-18T02:30:00Z"), "17/10/2026"],
  [f.dataHora("2026-10-18T17:05:09Z"), "18/10/2026 14:05"],
  [f.dataHora("2026-10-18T17:05:09Z", { curto: true }), "18/10 14:05"],
  [f.dataHora("18/10/2026 14:05:09", { segundos: true }), "18/10/2026 14:05:09"],
  [f.data("18/10/2026", { ano: 2 }), "18/10/26"],
  [f.hora(Date.UTC(2026, 9, 18, 11, 0)), "08:00"],
  [f.dataHora(null), "—"], [f.data("abc"), "—"],
  [f.num(1234.5), "1.234,5"], [f.num("1234,5", { casas: 2 }), "1.234,50"], [f.num(0, { zeroVazio: true }), "—"],
  [f.moeda("41752.65").replace(/ /g, " "), "R$ 41.752,65"], [f.pct(12.5), "12,5%"],
  [f.duracao(45), "45min"], [f.duracao(125), "2h05"], [f.duracao(120), "2h"],
  [f.decorrido(725000), "12min 05s"], [f.decorrido(3900000), "1h05min"],
];
let ok = 0;
casos.forEach(([g, e], i) => { if (g === e) ok++; else console.log("FALHOU", i, JSON.stringify(g), "esperado", e); });
console.log(`${ok}/${casos.length} ok`);
process.exit(ok === casos.length ? 0 : 1);
