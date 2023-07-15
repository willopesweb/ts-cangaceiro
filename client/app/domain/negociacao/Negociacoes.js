export default class Negociacoes {
    _negociacoes;
    constructor() {
        this._negociacoes = [];
        Object.freeze(this);
    }
    adiciona(negociacao) {
        if (!negociacao)
            return;
        this._negociacoes.push(negociacao);
    }
    get volumeTotal() {
        return this._negociacoes.reduce((total, negociacao) => {
            return total + negociacao.getVolume;
        }, 0);
    }
    paraArray() {
        let copy = [];
        return copy.concat(this._negociacoes);
    }
    esvazia() {
        this._negociacoes.length = 0;
    }
}
//# sourceMappingURL=Negociacoes.js.map