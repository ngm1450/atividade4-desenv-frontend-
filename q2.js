(function () {
  const $ = (sel) => document.querySelector(sel);
  const alturaEl = $("#q2-altura");
  const pesoEl = $("#q2-peso");
  const valorEl = $("#q2-valor");
  const situacaoEl = $("#q2-situacao");
  const grauEl = $("#q2-grau");
  const outEl = $("#q2-out");
  const tbody = $("#q2-tabela tbody");

  const btnCalc = $("#q2-calcular");
  const btnLimpar = $("#q2-limpar");

  const classificacoes = [
    { min: -Infinity, max: 16, situacao: "Magreza grave", grau: "0" },
    { min: 16, max: 16.9, situacao: "Magreza moderada", grau: "0" },
    { min: 17, max: 18.5, situacao: "Magreza leve", grau: "0" },
    { min: 18.6, max: 24.9, situacao: "Peso ideal", grau: "0" },
    { min: 25, max: 29.9, situacao: "Sobrepeso", grau: "0" },
    { min: 30, max: 34.9, situacao: "Obesidade grau I", grau: "I" },
    { min: 35, max: 39.9, situacao: "Obesidade grau II ou severa", grau: "II" },
    { min: 40, max: Infinity, situacao: "Obesidade grau III ou mórbida", grau: "III" }
  ];

  function popularTabela() {
    tbody.innerHTML = "";
    classificacoes.forEach(c => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${c.min === -Infinity ? "menor que 16" : (c.max === Infinity ? "maior que 40" : `${c.min} a ${c.max}`)}</td>
                      <td>${c.situacao}</td>
                      <td>${c.grau}</td>`;
      tbody.appendChild(tr);
    });
  }

  function msg(html, cls = "") {
    outEl.innerHTML = html;
    outEl.className = "out " + cls;
  }

  function calcular() {
    const altura = parseFloat(alturaEl.value.replace(",", "."));
    const peso = parseFloat(pesoEl.value.replace(",", "."));
    if (!altura || !peso || altura <= 0 || peso <= 0) {
      msg("Informe altura e peso válidos.", "warn");
      return;
    }

    const imc = peso / (altura * altura);
    valorEl.value = imc.toFixed(2);

    const classe = classificacoes.find(c => imc >= c.min && imc <= c.max);
    if (classe) {
      situacaoEl.value = classe.situacao;
      grauEl.value = classe.grau;
      msg(`Seu IMC é <strong>${imc.toFixed(2)}</strong>: ${classe.situacao} (grau ${classe.grau})`, "ok");
    } else {
      situacaoEl.value = "";
      grauEl.value = "";
      msg("Não foi possível classificar o resultado.", "err");
    }
  }

  function limpar() {
    alturaEl.value = "";
    pesoEl.value = "";
    valorEl.value = "";
    situacaoEl.value = "";
    grauEl.value = "";
    msg("");
    alturaEl.focus();
  }

  btnCalc?.addEventListener("click", calcular);
  btnLimpar?.addEventListener("click", limpar);

  popularTabela();
})();