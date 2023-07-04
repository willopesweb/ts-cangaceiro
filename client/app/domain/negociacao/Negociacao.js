export default class Negociacao {
    data;
    quantidade;
    valor;
    constructor(data, quantidade, valor) {
        this.data = new Date(data.getTime());
        this.quantidade = quantidade;
        this.valor = valor;
        Object.freeze(this);
    }
    get getVolume() {
        return this.quantidade * this.valor;
    }
    get getData() {
        return new Date(this.data.getTime());
    }
    get getQuantidade() {
        return this.quantidade;
    }
    get getValor() {
        return this.valor;
    }
}
//# sourceMappingURL=Negociacao.js.map