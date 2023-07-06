export default class Negociacoes {
    _negociacoes;
    _trigger;
    constructor(trigger) {
        this._negociacoes = [];
        this._trigger = trigger;
        Object.freeze(this);
    }
    adiciona(negociacao) {
        if (!negociacao)
            return;
        this._negociacoes.push(negociacao);
        this._trigger(this);
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
        this._trigger(this);
    }
}
//# sourceMappingURL=Negociacoes.js.map