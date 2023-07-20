import Negociacao from "../domain/negociacao/Negociacao.js";
import Negociacoes from "../domain/negociacao/Negociacoes.js";
import DataConverter from "../ui/converters/DataConverter.js";
import NegociacoesView from "../ui/view/NegociacoesView.js";
import Mensagem from "../ui/models/Mensagem.js";
import MensagemView from "../ui/view/MensagemView.js";
import Bind from "../util/Bind.js";
import NegociacaoService from "../domain/negociacao/NegociacaoService.js";
import getNegociacaoDao from "../util/DaoFactory.js";

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

    this.init();
  }

  private init() {
    getNegociacaoDao()
      .then((dao) => dao.listaTodos())
      .then((negociacoes) =>
        (negociacoes as Array<Negociacao>).forEach((negociacao) =>
          this.negociacoes.adiciona(negociacao)
        )
      )
      .catch((err) => (this.mensagem.texto = err));
  }

  public adiciona(event: Event) {
    event.preventDefault();

    const negociacao = this.criaNegociacao();
    getNegociacaoDao()
      .then((dao) => dao.adiciona(negociacao as Negociacao))
      .then(() => {
        this.negociacoes.adiciona(this.criaNegociacao());
        this.mensagem.texto = "Negociação adicionada com sucesso";
        this.limpaFormulario();
      })
      .catch((err) => (this.mensagem.texto = err));
  }

  public apaga() {
    getNegociacaoDao()
      .then((dao) => dao.apagaTodos())
      .then(() => {
        this.negociacoes.esvazia();
        this.mensagem.texto = "Negociações	apagadas	com	sucesso";
      })
      .catch((err) => (this.mensagem.texto = err));
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
    const negociacoes: Array<Negociacao> = [];

    this.service
      .obterNegociacoesDoPeriodo()
      .then((negociacoes: Array<Negociacao>) => {
        negociacoes
          .filter(
            (novaNegociacao) =>
              !this.negociacoes
                .paraArray()
                .some((negociacaoExistente) =>
                  novaNegociacao.equals(negociacaoExistente)
                )
          )
          .forEach((negociacao: Negociacao) =>
            this.negociacoes.adiciona(negociacao)
          );
        this.mensagem.texto = "Negociações do período importadas	com	sucesso";
      })
      .catch((err: string) => (this.mensagem.texto = err));
  }
}
