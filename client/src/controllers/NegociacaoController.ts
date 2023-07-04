import Negociacao from "../domain/negociacao/Negociacao.js";
import Negociacoes from "../domain/negociacao/Necociacoes.js";
import DataConverter from "../ui/converters/DataConverter.js";
import NegociacaoView from "../ui/view/NegociacoesView.js";

export default class NegociacaoController {
  private inputData: HTMLInputElement | null;
  private inputQuantidade: HTMLInputElement | null;
  private inputValor: HTMLInputElement | null;
  private negociacoes: Negociacoes;
  private negociacaoView: NegociacaoView;

  constructor() {
    let $ = document.querySelector.bind(document);
    this.inputData = $("#data");
    this.inputQuantidade = $("#quantidade");
    this.inputValor = $("#valor");
    this.negociacoes = new Negociacoes();
    this.negociacaoView = new NegociacaoView("#negociacoes");
    this.negociacaoView.update(this.negociacoes);
  }
  public adiciona(event: Event) {
    event.preventDefault();
    if (!this.inputData || !this.inputQuantidade || !this.inputValor) return;
    this.negociacoes.adiciona(this.criaNegociacao());
    this.negociacaoView.update(this.negociacoes);
    this.limpaFormulario();
  }

  private limpaFormulario() {
    if (!this.inputData || !this.inputQuantidade || !this.inputValor) return;
    this.inputData.value = "";
    this.inputQuantidade.value = "1";
    this.inputValor.value = "0.0";
    this.inputData.focus();
  }

  private criaNegociacao() {
    if (!this.inputData || !this.inputQuantidade || !this.inputValor)
      return null;
    return new Negociacao(
      DataConverter.paraData(this.inputData.value),
      parseInt(this.inputQuantidade.value),
      parseFloat(this.inputValor.value)
    );
  }
}
