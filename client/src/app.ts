import NegociacaoController from "./controllers/NegociacaoController.js";
import { debounce } from "./util/Debounce.js";

const controller: NegociacaoController = new NegociacaoController();

document
  .querySelector(".form")
  ?.addEventListener("submit", controller.adiciona.bind(controller));

document
  .querySelector("#botao-apaga")
  ?.addEventListener("click", controller.apaga.bind(controller));

document.querySelector("#botao-importa")?.addEventListener(
  "click",
  debounce(() => controller.importarNegociacoes(), 1000)
);
