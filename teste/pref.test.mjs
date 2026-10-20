// Nitron.pref.usarSankhya com um Sankhya simulado: node teste/pref.test.mjs
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const espera = (ms) => new Promise((r) => setTimeout(r, ms));
function ambiente({ semView = false, falhaSalvar = false, outraAba = false } = {}) {
  const guardado = {}, avisos = [], chamadas = [];
  const tabela = [{ ID: 7, CODUSU: 42, CHAVE: "grade:existente", CONTEUDO: '{"posicao":["B","A"]}' }];
  let proximo = 100;
  const window = {
    console: { warn() {} },
    localStorage: { getItem: (k) => guardado[k] ?? null, setItem: (k, v) => { guardado[k] = v; } },
    Nitron: {
      ui: { avisar: (m, t) => avisos.push(t + ": " + m) },
      sankhya: {
        loadView: async (view, o) => {
          chamadas.push("loadView " + view);
          if (semView) throw new Error("AD_VW_NITPREF não é do tipo VIEW");
          return [{ CODUSU: 42, ID: null, CHAVE: null, CONTEUDO: null }].concat(tabela.filter((l) => l.CODUSU === 42));
        },
        salvar: async (ent, pk, v) => {
          chamadas.push("salvar " + ent + " " + pk.ID);
          if (falhaSalvar) throw new Error("Não autorizado");
          Object.assign(tabela.find((l) => l.ID === pk.ID), v);
        },
        inserir: async (ent, v, o) => {
          chamadas.push("inserir " + ent + " " + v.CHAVE + " usu " + v.CODUSU);
          if (outraAba) { outraAba = false; tabela.push({ ID: 55, CODUSU: 42, CHAVE: v.CHAVE, CONTEUDO: "{}" }); throw new Error("ORA-00001"); }
          const l = Object.assign({ ID: proximo++ }, v);
          tabela.push(l);
          return [{ ID: String(l.ID) }];
        }
      }
    }
  };
  new Function("window", readFileSync(new URL("../src/pref.js", import.meta.url), "utf8"))(window);
  return { P: window.Nitron.pref, guardado, avisos, chamadas, tabela };
}

let ok = 0;
async function caso(nome, fn) { await fn(); ok++; console.log("ok  " + nome); }

await caso("lê do Sankhya o que já existe", async () => {
  const a = ambiente(); a.P.usarSankhya({ espera: 10 });
  assert.deepEqual(await a.P.ler("grade:existente"), { posicao: ["B", "A"] });
  await a.P.ler("grade:outra");
  assert.equal(a.chamadas.filter((c) => c.startsWith("loadView")).length, 1, "carrega uma vez só");
});

await caso("sem linha no Sankhya, vale a do navegador (não perde o que a pessoa já tinha)", async () => {
  const a = ambiente(); a.guardado["nitron-ui:grade:nova"] = '{"ocultas":["X"]}';
  a.P.usarSankhya({ espera: 10 });
  assert.deepEqual(await a.P.ler("grade:nova"), { ocultas: ["X"] });
});

await caso("várias gravações seguidas viram um INSERT e depois UPDATE pelo ID", async () => {
  const a = ambiente(); a.P.usarSankhya({ espera: 20 });
  for (let i = 0; i < 5; i++) await a.P.gravar("grade:nova", { n: i });
  await espera(60);
  assert.deepEqual(a.chamadas.filter((c) => !c.startsWith("loadView")), ["inserir AD_NITPREF grade:nova usu 42"]);
  assert.equal(a.tabela.find((l) => l.CHAVE === "grade:nova").CONTEUDO, '{"n":4}');
  await a.P.gravar("grade:nova", { n: 5 }); await espera(60);
  assert.equal(a.chamadas.at(-1), "salvar AD_NITPREF 100");
  await a.P.gravar("grade:nova", { n: 5 }); await espera(60);
  assert.equal(a.chamadas.at(-1), "salvar AD_NITPREF 100", "igual ao guardado: não grava de novo");
  assert.equal(a.guardado["nitron-ui:grade:nova"], '{"n":5}', "cópia no navegador");
});

await caso("view inexistente: segue só no navegador, sem aviso", async () => {
  const a = ambiente({ semView: true }); a.P.usarSankhya({ espera: 10 });
  await a.P.gravar("grade:x", { a: 1 }); await espera(40);
  assert.deepEqual(await a.P.ler("grade:x"), { a: 1 });
  assert.equal(a.chamadas.length, 1);
  assert.equal(a.avisos.length, 0);
});

await caso("falha ao gravar avisa uma vez só", async () => {
  const a = ambiente({ falhaSalvar: true }); a.P.usarSankhya({ espera: 10 });
  await a.P.gravar("grade:existente", { a: 1 }); await espera(40);
  await a.P.gravar("grade:existente", { a: 2 }); await espera(40);
  assert.equal(a.avisos.length, 1);
  assert.match(a.avisos[0], /^atencao: /);
});

await caso("acima de 4000 caracteres não manda e avisa", async () => {
  const a = ambiente(); a.P.usarSankhya({ espera: 10 });
  await a.P.gravar("grade:grande", { x: "a".repeat(4100) }); await espera(40);
  assert.equal(a.chamadas.filter((c) => !c.startsWith("loadView")).length, 0);
  assert.equal(a.avisos.length, 1);
});

await caso("outra aba gravou antes: relê a view e a seguinte vira alteração", async () => {
  const a = ambiente({ outraAba: true }); a.P.usarSankhya({ espera: 10 });
  await a.P.gravar("grade:dupla", { a: 1 }); await espera(40);
  await a.P.gravar("grade:dupla", { a: 2 }); await espera(40);
  assert.equal(a.chamadas.at(-1), "salvar AD_NITPREF 55");
  assert.equal(a.tabela.find((l) => l.ID === 55).CONTEUDO, '{"a":2}');
});

console.log(ok + "/7 ok");
