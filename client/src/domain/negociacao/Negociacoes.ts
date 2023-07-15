import Negociacao from "./Negociacao";

export default class Negociacoes {
  private _negociacoes: Array<Negociacao>;
  //private _trigger: Function;
  constructor() {
    this._negociacoes = [];
    //this._trigger = trigger;
    Object.freeze(this);
  }
  adiciona(negociacao: Negociacao | null) {
    if (!negociacao) return;
    this._negociacoes.push(negociacao);
    //this._trigger(this);
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

  esvazia() {
    this._negociacoes.length = 0;
    //this._trigger(this);
  }
}
