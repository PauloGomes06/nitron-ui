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
