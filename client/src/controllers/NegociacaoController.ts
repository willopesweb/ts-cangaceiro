import Negociacao from "../domain/negociacao/Negociacao.js";
import Negociacoes from "../domain/negociacao/Negociacoes.js";
import DataConverter from "../ui/converters/DataConverter.js";
import NegociacoesView from "../ui/view/NegociacoesView.js";
import Mensagem from "../ui/models/Mensagem.js";
import MensagemView from "../ui/view/MensagemView.js";
import Bind from "../util/Bind.js";
import NegociacaoService from "../domain/negociacao/NegociacaoService.js";

export default class NegociacaoController {
  private inputData: HTMLInputElement | null;
  private inputQuantidade: HTMLInputElement | null;
  private inputValor: HTMLInputElement | null;
  private negociacoes: Negociacoes;
  private mensagem: Mensagem;
  private service: NegociacaoService;

  constructor() {
    const $ = document.querySelector.bind(document);
    this.inputData = $("#data") as HTMLInputElement;
    this.inputQuantidade = $("#quantidade") as HTMLInputElement;
    this.inputValor = $("#valor") as HTMLInputElement;
    const self = this;
    this.negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView("#negociacoes"),
      "adiciona",
      "esvazia"
    ) as Negociacoes;

    this.mensagem = new Bind(
      new Mensagem(),
      new MensagemView("#mensagemView"),
      "texto"
    ) as Mensagem;
    this.service = new NegociacaoService();
  }

  public adiciona(event: Event) {
    event.preventDefault();
    if (!this.inputData || !this.inputQuantidade || !this.inputValor) return;
    this.negociacoes.adiciona(this.criaNegociacao());
    this.mensagem.texto = "Negociação adicionada com sucesso";
    this.limpaFormulario();
  }

  public apaga() {
    this.negociacoes.esvazia();
    this.mensagem.texto = "Negociações apagadas com sucesso!";
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

  public importarNegociacoes() {
    this.service.obterNegociacoesDaSemana(
      (err: string | null, negociacoes: Array<Negociacao> | null) => {
        if (err) {
          this.mensagem.texto = err;
          return;
        }

        if (!negociacoes) return;

        negociacoes.forEach((negociacao) =>
          this.negociacoes.adiciona(negociacao)
        );
        this.mensagem.texto = "Negociações	importadas	com	sucesso";
      }
    );
  }
}
