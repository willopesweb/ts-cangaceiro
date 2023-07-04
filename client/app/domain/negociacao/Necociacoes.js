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
    paraArray() {
        let copy = [];
        return copy.concat(this._negociacoes);
    }
}
//# sourceMappingURL=Necociacoes.js.map