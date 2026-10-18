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
