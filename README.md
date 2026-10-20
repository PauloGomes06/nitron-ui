# nitron-ui

Biblioteca das telas HTML5 do Sankhya da Nitron: chamadas ao gateway, modal, avisos e formatação.
Um arquivo, sem dependências, com o CSS embutido.

```html
<script>document.write('<script src="https://cdn.jsdelivr.net/gh/PauloGomes06/nitron-ui@main/carregar.js?tela=MINHA-TELA&d=' +
  new Date().toISOString().slice(0, 10) + '"></script>');</script>
```

O dash **nunca diz a versão**: carrega o [`carregar.js`](carregar.js) com o nome da tela, e é lá que se decide o que cada
tela recebe (`PADRAO` = "1", a última 1.x; `TELAS` = exceções). Melhoria na 1.x chega em todos os dashes sozinha (o
`?d=` renova o cache do navegador uma vez por dia). Por isso **na 1.x só entra mudança compatível**. Se um dia vier
uma 2.0, muda o `PADRAO` ou põe as telas uma a uma em `TELAS`, sem republicar dash nenhum.
Testar outra versão num navegador só: localStorage `"nitron-ui:versao"` = `"1.5.0"` ou hash de commit.

**Publicar:** mudar `version` no `package.json` → `node build.mjs` → testes → commit → tag `vX.Y.Z` → push do main e da tag →
`curl https://purge.jsdelivr.net/gh/PauloGomes06/nitron-ui@1/dist/nitron-ui.js` (sem isso o CDN segura a anterior por até 12 h).
Mexeu no `carregar.js`: push no main e `curl https://purge.jsdelivr.net/gh/PauloGomes06/nitron-ui@main/carregar.js`.
Antes da tag, dá para testar na HML pelo hash do commit (localStorage acima).

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
**filtros salvos com nome**, escolha e **ordem das Colunas** (arrastar o cabeçalho ou setas no modal), ordenação no cabeçalho, total no rodapé sobre o filtrado,
**paginação** (50/100/200 por página, guardado por pessoa; total e Excel sempre sobre tudo), seleção em massa com ações, e **Exportar Excel** (.xlsx com número, data e R$ de verdade, do que está na tela;
o gerador só é baixado no clique, e se falhar sai CSV).

Linha que não pode ser marcada: `selecionavel: (l) => l.NOSSONUM ? "Já tem boleto" : true` (não-`true` trava a caixinha;
texto vira a dica; "marcar todas" pula as travadas). Filtro de fora da grade (cards, abas): `g.filtrar(fn)` /
`g.filtrar(null)`, soma com busca e filtros; `g.semFiltroExterno()` devolve o que passa só nos filtros da grade (para
contar os cards) e `aoAtualizar: (g) => ...` avisa a cada mudança. Célula com HTML: `html: (v, l) => "..."` na coluna
(quem monta escapa); busca, filtro, ordem e Excel continuam no texto (`formatar` ou o tipo).

Tipos de coluna: `texto` · `codigo` (nº de nota/título, sem separador de milhar) · `num` · `moeda` · `pct` ·
`data` · `dataHora` · `situacao`. `formatar(v, linha)` sobrescreve a exibição.

**Onde ficam as preferências:** por padrão, no navegador (por computador). Para acompanhar a pessoa em qualquer
máquina, chame `Nitron.pref.usarSankhya()` antes de montar a grade: lê a view `AD_VW_NITPREF` (só as linhas do usuário
logado) e grava na tabela `AD_NITPREF` (usuário, chave, conteúdo JSON até 4000) pelo save nativo, uma gravação por chave
depois de 1,5 s parada. O navegador continua como cópia: sem a tabela, a tela segue só no navegador; gravação que falha
avisa uma vez. Quem ainda não tem nada no Sankhya começa com o que já tinha no navegador. Outro armazenamento:
`Nitron.pref.usar({ ler: async (chave) => ..., gravar: async (chave, obj) => ... })`.

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
- **Sessão da janela** (`mgeSession`) em toda chamada: sem ela o Sankhya 4.36 recusa gravação de serviço de outro módulo ("Não autorizado").
- Erro do ERP **sem HTML** e sem "Regra Personalizada:"; dentro do modal, aparece no próprio modal.
- Datas no **fuso de São Paulo** (aceita o `DD/MM/AAAA HH:MM:SS` do Sankhya); vazio = `—`.
- O Modal fecha com Esc, não fecha ao clicar fora e fica **bloqueado enquanto salva**.

Configuração opcional: `S.configurar({ lote: 30, tamParam: 0, mgeSession: false })` (`false` desliga o envio da sessão; um texto fixa o valor).

## Desenvolver

`src/` → `node build.mjs` → `dist/nitron-ui.js`. Testes: `node teste/format.test.mjs`, `node teste/pref.test.mjs` e `demo/index.html`
(Sankhya simulado). Nova versão: ver **Publicar** no topo.
