import Negociacao from "../domain/negociacao/Negociacao.js";
import Negociacoes from "../domain/negociacao/Negociacoes.js";
import DataConverter from "../ui/converters/DataConverter.js";
import NegociacoesView from "../ui/view/NegociacoesView.js";
import Mensagem from "../ui/models/Mensagem.js";
import MensagemView from "../ui/view/MensagemView.js";
import Bind from "../util/Bind.js";
import NegociacaoService from "../domain/negociacao/NegociacaoService.js";
import getNegociacaoDao from "../util/DaoFactory.js";
import NegociacaoDao from "../domain/negociacao/NegociacaoDao.js";
import { getExceptionMessage } from "../util/ApplicationException.js";

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

  private async init() {
    try {
      const dao: NegociacaoDao = await getNegociacaoDao();
      const negociacoes: Array<Negociacao> = await dao.listaTodos();
      negociacoes.forEach((negociacao) =>
        this.negociacoes.adiciona(negociacao)
      );
    } catch (err: unknown) {
      this.mensagem.texto = getExceptionMessage(err);
    }
  }

  public async adiciona(event: Event) {
    event.preventDefault();
    try {
      const negociacao = this.criaNegociacao();
      const dao = await getNegociacaoDao();
      if (!(negociacao instanceof Negociacao)) return;
      await dao.adiciona(negociacao);
      this.negociacoes.adiciona(this.criaNegociacao());
      this.mensagem.texto = "Negociação adicionada com sucesso";
      this.limpaFormulario();
    } catch (err: unknown) {
      this.mensagem.texto = getExceptionMessage(err);
    }
  }

  public async apaga() {
    try {
      const dao = await getNegociacaoDao();
      await dao.apagaTodos();
      this.negociacoes.esvazia();
      this.mensagem.texto = "Negociações	apagadas	com	sucesso";
    } catch (err: unknown) {
      this.mensagem.texto = getExceptionMessage(err);
    }
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

  public async importarNegociacoes() {
    try {
      const negociacoes: Array<Negociacao> =
        await this.service.obterNegociacoesDoPeriodo();
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
    } catch (err: unknown) {
      this.mensagem.texto = getExceptionMessage(err);
    }
  }
}
