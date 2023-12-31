import NegociacaoController from "./controllers/NegociacaoController.js";
const controller = new NegociacaoController();
document
    .querySelector(".form")
    ?.addEventListener("submit", controller.adiciona.bind(controller));
document
    .querySelector("#botao-apaga")
    ?.addEventListener("click", controller.apaga.bind(controller));
document
    .querySelector("#botao-importa")
    ?.addEventListener("click", controller.importarNegociacoes.bind(controller));
//# sourceMappingURL=app.js.map