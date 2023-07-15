import ProxyFactory from "../../util/ProxyFactory";

export default class View {
  private elemento: HTMLElement | null;
  constructor(seletor: string) {
    this.elemento = document.querySelector(seletor);
  }
  template(model: ProxyFactory): string {
    throw new Error("Você	precisa	implementar	o	método	template");
  }

  update(model: ProxyFactory) {
    if (!this.elemento || !model) return;
    this.elemento.innerHTML = this.template(model);
  }
}
