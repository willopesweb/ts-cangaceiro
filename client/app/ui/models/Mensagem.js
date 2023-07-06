export default class Mensagem {
    _texto;
    constructor(texto = "") {
        this._texto = texto;
    }
    get texto() {
        return this._texto;
    }
    set texto(texto) {
        this._texto = texto;
    }
}
//# sourceMappingURL=Mensagem.js.map