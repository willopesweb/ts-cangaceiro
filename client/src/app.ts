import NegociacaoController from "./controllers/NegociacaoController.js";

let controller: NegociacaoController = new NegociacaoController();
console.log(document.querySelector(".form"));
document
  .querySelector(".form")
  ?.addEventListener("submit", controller.adiciona.bind(controller));
