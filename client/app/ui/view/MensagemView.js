import View from "./View.js";
export default class MensagemView extends View {
    template(model) {
        return model.texto
            ? `<p	class="alert	alert-info">${model.texto}</p>`
            : `<p></p>`;
    }
}
//# sourceMappingURL=MensagemView.js.map