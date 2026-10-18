// Junta src/ num arquivo só: dist/nitron-ui.js (o CSS vai dentro, injetado no <head>).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const versao = JSON.parse(readFileSync("package.json", "utf8")).version;
const css = readFileSync("src/estilo.css", "utf8").replace(/\s*\n\s*/g, " ").trim();
const partes = ["format.js", "sankhya.js", "pref.js", "ui.js", "grade.js"].map((f) => readFileSync(`src/${f}`, "utf8"));

const saida = `/*! nitron-ui ${versao} — telas HTML5 do Sankhya da Nitron */
(function () {
  if (window.Nitron && window.Nitron.versao) return;
  window.Nitron = { versao: ${JSON.stringify(versao)} };
  var s = document.createElement("style");
  s.setAttribute("data-nitron-ui", ${JSON.stringify(versao)});
  s.textContent = ${JSON.stringify(css)};
  (document.head || document.documentElement).appendChild(s);
})();
${partes.join("\n")}`;

mkdirSync("dist", { recursive: true });
writeFileSync("dist/nitron-ui.js", saida);
console.log(`dist/nitron-ui.js ${versao} · ${(saida.length / 1024).toFixed(1)} KB`);
