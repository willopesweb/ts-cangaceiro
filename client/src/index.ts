import Negociacao from "./domain/negociacao/Negociacao";

const campos: Array<HTMLInputElement | null> = [
  document.querySelector("#data"),
  document.querySelector("#valor"),
  document.querySelector("#quantidade"),
];

const tbody: HTMLElement | null = document.querySelector("table tbody");

document
  .querySelector(".form")
  ?.addEventListener("submit", function (event: Event) {
    event.preventDefault();
    if (!tbody) return;
    const tr: HTMLTableRowElement = document.createElement("tr");
    campos.forEach((campo) => {
      if (campo && campo.value) {
        const td: HTMLTableCellElement = document.createElement("td");
        td.textContent = campo?.value;
        tr.appendChild(td);
      }
    });

    const tdVolume: HTMLTableCellElement = document.createElement("td");
    tdVolume.textContent = `${
      Number(campos[1]?.value) * Number(campos[2]?.value)
    }`;
    tr.appendChild(tdVolume);
    tbody.appendChild(tr);

    campos.forEach((campo) => {
      if (campo) campo.value = "";
    });
    campos[0]?.focus();
  });

const negociacao = new Negociacao(new Date(), 1, 200);
const body = JSON.stringify(negociacao);
const method = "POST";
const headers = new Headers();
headers.set("Content-Type", "application/json");

const config = {
  method,
  headers,
  body,
};

fetch("/negociacoes", config).then(() => console.log("Dado	enviado	com	sucesso"));
