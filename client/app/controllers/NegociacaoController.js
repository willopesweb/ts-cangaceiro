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
    inputData;
    inputQuantidade;
    inputValor;
    negociacoes;
    mensagem;
    service;
    constructor() {
        const $ = document.querySelector.bind(document);
        this.inputData = $("#data");
        this.inputQuantidade = $("#quantidade");
        this.inputValor = $("#valor");
        const self = this;
        this.negociacoes = new Bind(new Negociacoes(), new NegociacoesView("#negociacoes"), "adiciona", "esvazia");
        this.mensagem = new Bind(new Mensagem(), new MensagemView("#mensagemView"), "texto");
        this.service = new NegociacaoService();
        this.init();
    }
    init() {
        getNegociacaoDao()
            .then((dao) => dao.listaTodos())
            .then((negociacoes) => negociacoes.forEach((negociacao) => this.negociacoes.adiciona(negociacao)))
            .catch((err) => (this.mensagem.texto = err));
    }
    adiciona(event) {
        event.preventDefault();
        const negociacao = this.criaNegociacao();
        getNegociacaoDao()
            .then((dao) => dao.adiciona(negociacao))
            .then(() => {
            this.negociacoes.adiciona(this.criaNegociacao());
            this.mensagem.texto = "Negociação adicionada com sucesso";
            this.limpaFormulario();
        })
            .catch((err) => (this.mensagem.texto = err));
    }
    apaga() {
        getNegociacaoDao()
            .then((dao) => dao.apagaTodos())
            .then(() => {
            this.negociacoes.esvazia();
            this.mensagem.texto = "Negociações	apagadas	com	sucesso";
        })
            .catch((err) => (this.mensagem.texto = err));
    }
    limpaFormulario() {
        if (!this.inputData || !this.inputQuantidade || !this.inputValor)
            return;
        this.inputData.value = "";
        this.inputQuantidade.value = "1";
        this.inputValor.value = "0.0";
        this.inputData.focus();
    }
    criaNegociacao() {
        if (!this.inputData || !this.inputQuantidade || !this.inputValor)
            return null;
        return new Negociacao(DataConverter.paraData(this.inputData.value), parseInt(this.inputQuantidade.value), parseFloat(this.inputValor.value));
    }
    importarNegociacoes() {
        const negociacoes = [];
        this.service
            .obterNegociacoesDoPeriodo()
            .then((negociacoes) => {
            negociacoes
                .filter((novaNegociacao) => !this.negociacoes
                .paraArray()
                .some((negociacaoExistente) => novaNegociacao.equals(negociacaoExistente)))
                .forEach((negociacao) => this.negociacoes.adiciona(negociacao));
            this.mensagem.texto = "Negociações do período importadas	com	sucesso";
        })
            .catch((err) => (this.mensagem.texto = err));
    }
}
//# sourceMappingURL=NegociacaoController.js.map