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

  get volumeTotal() {
    return this._negociacoes.reduce((total, negociacao) => {
      return total + negociacao.getVolume;
    }, 0);
  }

  paraArray() {
    let copy: Array<Negociacao> = [];
    return copy.concat(this._negociacoes);
  }
}
