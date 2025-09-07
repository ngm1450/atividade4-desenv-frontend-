(function () {
  const $ = (sel) => document.querySelector(sel);
  const n1El = $("#q1-n1");
  const n2El = $("#q1-n2");
  const opEl = $("#q1-op");
  const resEl = $("#q1-res");
  const outEl = $("#q1-out");
  const btnCalc = $("#q1-calcular");
  const btnClear = $("#q1-limpar");

  function msg(html, cls = "") {
    outEl.innerHTML = html;
    outEl.className = "out " + cls;
  }

  function parseNum(v) {
    if (typeof v === "string") v = v.replace(",", ".");
    const num = Number(v);
    return Number.isFinite(num) ? num : NaN;
  }

  function validar(n1, n2, op) {
    if (isNaN(n1) || isNaN(n2)) {
      msg("Preencha <strong>número 1</strong> e <strong>número 2</strong> com valores numéricos.", "warn");
      return false;
    }
    if (!op) {
      msg("Selecione um <strong>operador</strong>.", "warn");
      return false;
    }
    const LIM = 1e15;
    if (Math.abs(n1) > LIM || Math.abs(n2) > LIM) {
      msg("Os valores não podem ultrapassar ±1×10¹⁵.", "warn");
      return false;
    }
    if (op === "/" && n2 === 0) {
      msg("Divisão por zero não é permitida.", "err");
      return false;
    }
    return true;
  }

  function calcular() {
    const n1 = parseNum(n1El.value);
    const n2 = parseNum(n2El.value);
    const op = opEl.value;

    if (!validar(n1, n2, op)) { resEl.value = ""; return; }

    let result;
    switch (op) {
      case "+": result = n1 + n2; break;
      case "-": result = n1 - n2; break;
      case "*": result = n1 * n2; break;
      case "/": result = n1 / n2; break;
    }

    const fmt = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 10 });
    resEl.value = fmt.format(result);
    msg("Cálculo realizado com sucesso.", "ok");
  }

  function limpar() {
    n1El.value = "";
    n2El.value = "";
    opEl.value = "";
    resEl.value = "";
    msg("");
    n1El.focus();
  }

  btnCalc?.addEventListener("click", calcular);
  btnClear?.addEventListener("click", limpar);

  [n1El, n2El, opEl].forEach(el => {
    el?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        calcular();
      }
    });
  });
})();