import Negociacao from "./Negociacao";

export default class Negociacoes {
  private _negociacoes: Array<Negociacao>;
  constructor() {
    this._negociacoes = [];
  }
  adiciona(negociacao: Negociacao | null) {
    if (!negociacao) return;
    this._negociacoes.push(negociacao);
  }

  paraArray() {
    let copy: Array<Negociacao> = [];
    return copy.concat(this._negociacoes);
  }
}
