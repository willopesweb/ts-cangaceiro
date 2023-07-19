export default class Negociacao {
  private data: Date;
  private quantidade: number;
  private valor: number;

  constructor(data: Date, quantidade: number, valor: number) {
    this.data = new Date(data.getTime());
    this.quantidade = quantidade;
    this.valor = valor;
    Object.freeze(this);
  }

  get getVolume(): number {
    return this.quantidade * this.valor;
  }

  get getData(): Date {
    return new Date(this.data.getTime());
  }

  get getQuantidade(): number {
    return this.quantidade;
  }

  get getValor(): number {
    return this.valor;
  }

  equals(negociacao: Negociacao) {
    return JSON.stringify(this) == JSON.stringify(negociacao);
  }
}
