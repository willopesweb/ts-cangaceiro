import Negociacoes from "../../domain/negociacao/Negociacoes";
import Mensagem from "../models/Mensagem";

export default class View {
  private elemento: HTMLElement | null;
  constructor(seletor: string) {
    this.elemento = document.querySelector(seletor);
  }
  template(model: Negociacoes | Mensagem): string {
    throw new Error("Você	precisa	implementar	o	método	template");
  }

  update(model: Negociacoes | Mensagem) {
    if (!this.elemento || !model) return;
    this.elemento.innerHTML = this.template(model);
  }
}
