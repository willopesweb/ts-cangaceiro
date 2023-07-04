"use strict";
const campos = [
    document.querySelector("#data"),
    document.querySelector("#valor"),
    document.querySelector("#quantidade"),
];
console.log(campos);
const tbody = document.querySelector("table tbody");
document
    .querySelector(".form")
    ?.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!tbody)
        return;
    const tr = document.createElement("tr");
    campos.forEach((campo) => {
        if (campo && campo.value) {
            const td = document.createElement("td");
            td.textContent = campo?.value;
            tr.appendChild(td);
        }
    });
    const tdVolume = document.createElement("td");
    tdVolume.textContent = `${Number(campos[1]?.value) * Number(campos[2]?.value)}`;
    tr.appendChild(tdVolume);
    tbody.appendChild(tr);
    campos.forEach((campo) => {
        if (campo)
            campo.value = "";
    });
    campos[0]?.focus();
});
//# sourceMappingURL=index.js.map