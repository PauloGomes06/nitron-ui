# nitron-ui

Biblioteca das telas HTML5 do Sankhya da Nitron: chamadas ao gateway, modal, avisos e formatação.
Um arquivo, sem dependências, com o CSS embutido.

```html
<script src="https://cdn.jsdelivr.net/gh/PauloGomes06/nitron-ui@1.0.0/dist/nitron-ui.js"></script>
```

Fixe a versão (`@1.0.0`). A tela sobe de versão depois de testada na HML.

## Uso

```js
const S = Nitron.sankhya, U = Nitron.ui, F = Nitron.fmt;

U.esconderMoldura();                                   // tira as barras do gadget

const linhas = await S.loadView("AD_VW_MINHA_VIEW", {
  campos: "NUFIN,DTVENC,VLRDESDOB", where: "SITUACAO = 'LIBERADO'", ordem: "DTVENC", numericos: ["VLRDESDOB"]
});
await S.salvar("Financeiro", { NUFIN: 123 }, { CODCTABCOINT: 55 });   // altera (save nativo, com eventos e permissão)
const [novo] = await S.inserir("Parceiro", { NOMEPARC: "Cliente Exemplo", ATIVO: "S" }, { retornar: ["CODPARC"] });
// novo.CODPARC = código gerado; registro filho: { chavePai: { CODPARC: novo.CODPARC } }
await S.remover("Parceiro", { CODPARC: novo.CODPARC });             // exclui (removeRecord da tela nativa)
const msg = await S.executarAcao(100, { NUFIN: 123 });                // botão Java, dados em P_DADOS

U.modal({ titulo: "Trocar conta", conteudo: "<input id='c'>", botoes: [
  { texto: "Cancelar", acao: "fechar" },
  { texto: "Salvar", tipo: "primario", acao: async (m) => { await S.salvar(/*...*/); U.avisar("Salvo."); } }
]});
if (await U.confirmar({ titulo: "Excluir", mensagem: "Excluir o lançamento?", confirmar: "Excluir", perigo: true })) { /*...*/ }
U.avisar("Falha ao gravar.", "erro");
const fim = U.carregando(document.querySelector("#grade")); /* ... */ fim();

F.data(v); F.hora(v); F.dataHora(v, { curto: true }); F.num(v, { casas: 2 }); F.moeda(v); F.pct(v); F.duracao(min);
```

## Grade (lista de dados)

```js
const g = U.grade(document.querySelector("#lista"), {
  id: "titulos-receber",                       // guarda colunas, ordem e filtros de cada pessoa
  chave: "NUFIN", selecao: true, exportar: "titulos-receber",
  colunas: [
    { campo: "NUMNOTA", titulo: "Nota", tipo: "codigo" },
    { campo: "NOMEPARC", titulo: "Cliente" },
    { campo: "DTVENC", titulo: "Vencimento", tipo: "data" },
    { campo: "VLRDESDOB", titulo: "Valor", tipo: "moeda", total: true },
    { campo: "SITUACAO", titulo: "Situação", tipo: "situacao",
      situacoes: { LIBERADO: { texto: "Liberado", cor: "info" }, ATRASADO: { texto: "Atrasado", cor: "erro" } } },
    { campo: "NUFIN", titulo: "Nº único", tipo: "codigo", oculta: true }
  ],
  acoes: [{ texto: "Trocar conta", tipo: "primario", acao: async (linhas) => { /* ... */ } }]
});
g.dados(await S.loadView("AD_VW_MINHA_VIEW", { campos: "NUFIN,NUMNOTA,NOMEPARC,DTVENC,VLRDESDOB,SITUACAO" }));
```

Vem pronto: busca (sem acento), **Filtros** em modal montado pelas colunas (contém, de/até, marcar valores),
**filtros salvos com nome**, escolha de **Colunas**, ordenação no cabeçalho, total no rodapé sobre o filtrado,
**paginação** (50/100/200 por página, guardado por pessoa; total e Excel sempre sobre tudo), seleção em massa com ações, e **Exportar Excel** (.xlsx com número, data e R$ de verdade, do que está na tela;
o gerador só é baixado no clique, e se falhar sai CSV).

Tipos de coluna: `texto` · `codigo` (nº de nota/título, sem separador de milhar) · `num` · `moeda` · `pct` ·
`data` · `dataHora` · `situacao`. `formatar(v, linha)` sobrescreve a exibição.

**Onde ficam as preferências:** no navegador (por computador). Para acompanhar a pessoa em qualquer máquina,
troque o armazenamento uma vez na tela: `Nitron.pref.usar({ ler: async (chave) => ..., gravar: async (chave, obj) => ... })`.

| Função | Serviço do Sankhya |
|---|---|
| `loadView` | `CRUDServiceProvider.loadView` |
| `loadRecords` | `CRUDServiceProvider.loadRecords` |
| `salvar` (altera) e `inserir` (inclui) | `DatasetSP.save`, conforme a [documentação oficial](https://developer.sankhya.com.br/reference/post_salve) |
| `remover` | `DatasetSP.removeRecord`, o mesmo da tela nativa (não está na documentação; testado em homologação) |
| `executarAcao` | `ActionButtonsSP.executeJava` (botão de ação Java) |
| `servico(nome, corpo, { modulo })` | qualquer outro serviço, com a mesma fila e tratamento de erro |

Já resolvido aqui, para nenhuma tela repetir:
- **Uma chamada por vez** na sessão (o Sankhya cancela concorrentes).
- Resposta em **ISO-8859-1** com os acentos certos.
- `loadView` com `fields` no formato que o gateway respeita (lista em array é ignorada em silêncio).
- Erro do ERP **sem HTML** e sem "Regra Personalizada:"; dentro do modal, aparece no próprio modal.
- Datas no **fuso de São Paulo** (aceita o `DD/MM/AAAA HH:MM:SS` do Sankhya); vazio = `—`.
- O Modal fecha com Esc, não fecha ao clicar fora e fica **bloqueado enquanto salva**.

Configuração opcional: `S.configurar({ lote: 30, tamParam: 0 })`.

## Desenvolver

`src/` → `node build.mjs` → `dist/nitron-ui.js`. Testes: `node teste/format.test.mjs` e `demo/index.html`
(Sankhya simulado). Nova versão: mudar `version` no `package.json`, build, commit e tag `vX.Y.Z`.
