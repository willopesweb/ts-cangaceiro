export default class Negociacoes {
    _negociacoes;
    constructor() {
        this._negociacoes = [];
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
}
//# sourceMappingURL=Necociacoes.js.map