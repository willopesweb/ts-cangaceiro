import Negociacao from "../domain/negociacao/Negociacao.js";
import Negociacoes from "../domain/negociacao/Negociacoes.js";
import DataConverter from "../ui/converters/DataConverter.js";
import NegociacoesView from "../ui/view/NegociacoesView.js";
import Mensagem from "../ui/models/Mensagem.js";
import MensagemView from "../ui/view/MensagemView.js";
import Bind from "../util/Bind.js";
import NegociacaoService from "../domain/negociacao/NegociacaoService.js";
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
    }
    adiciona(event) {
        event.preventDefault();
        if (!this.inputData || !this.inputQuantidade || !this.inputValor)
            return;
        this.negociacoes.adiciona(this.criaNegociacao());
        this.mensagem.texto = "Negociação adicionada com sucesso";
        this.limpaFormulario();
    }
    apaga() {
        this.negociacoes.esvazia();
        this.mensagem.texto = "Negociações apagadas com sucesso!";
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
        this.service.obterNegociacoesDaSemana((err, negociacoes) => {
            if (err) {
                this.mensagem.texto = err;
                return;
            }
            if (!negociacoes)
                return;
            negociacoes.forEach((negociacao) => this.negociacoes.adiciona(negociacao));
            this.mensagem.texto = "Negociações	importadas	com	sucesso";
        });
    }
}
//# sourceMappingURL=NegociacaoController.js.map