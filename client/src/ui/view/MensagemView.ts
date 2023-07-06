import Mensagem from "../models/Mensagem";
import View from "./View.js";

export default class MensagemView extends View {
  template(model: Mensagem) {
    return model.texto
      ? `<p	class="alert	alert-info">${model.texto}</p>`
      : `<p></p>`;
  }
}
