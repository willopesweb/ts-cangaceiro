export default class Mensagem {
  public _texto: string;
  constructor(texto = "") {
    this._texto = texto;
  }

  get texto() {
    return this._texto;
  }

  set texto(texto: string) {
    this._texto = texto;
  }
}
