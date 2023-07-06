import Negociacao from "../domain/negociacao/Negociacao.js";
import Negociacoes from "../domain/negociacao/Negociacoes.js";
import DataConverter from "../ui/converters/DataConverter.js";
import NegociacaoView from "../ui/view/NegociacoesView.js";
import Mensagem from "../ui/models/Mensagem.js";
import MensagemView from "../ui/view/MensagemView.js";

export default class NegociacaoController {
  private inputData: HTMLInputElement | null;
  private inputQuantidade: HTMLInputElement | null;
  private inputValor: HTMLInputElement | null;
  private negociacoes: Negociacoes;
  private negociacaoView: NegociacaoView;
  private mensagem: Mensagem;
  private mensagemView: MensagemView;

  constructor() {
    const $ = document.querySelector.bind(document);
    this.inputData = $("#data");
    this.inputQuantidade = $("#quantidade");
    this.inputValor = $("#valor");
    this.negociacoes = new Negociacoes((model: Negociacoes) => {
      this.negociacaoView.update(model);
    });
    this.negociacaoView = new NegociacaoView("#negociacoes");
    this.negociacaoView.update(this.negociacoes);
    this.mensagem = new Mensagem();
    this.mensagemView = new MensagemView("#mensagemView");
    this.mensagemView.update(this.mensagem);
  }
  public adiciona(event: Event) {
    event.preventDefault();
    if (!this.inputData || !this.inputQuantidade || !this.inputValor) return;
    this.negociacoes.adiciona(this.criaNegociacao());
    this.mensagem.texto = "Negociação adicionada com sucesso";
    this.mensagemView.update(this.mensagem);
    this.limpaFormulario();
  }

  public apaga() {
    this.negociacoes.esvazia();
    this.mensagem.texto = "Negociações apagadas com sucesso!";
    this.mensagemView.update(this.mensagem);
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
