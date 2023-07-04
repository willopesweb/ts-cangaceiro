const campos: Array<HTMLInputElement | null> = [
  document.querySelector("#data"),
  document.querySelector("#valor"),
  document.querySelector("#quantidade"),
];

console.log(campos);
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
