import HttpService from "../../util/HttpService.js";
import Negociacao from "./Negociacao.js";
import { ApplicationException } from "../../util/ApplicationException.js";
export default class NegociacaoService {
    http;
    constructor() {
        this.http = new HttpService();
    }
    obterNegociacoesDaSemana() {
        return this.http.get("negociacoes/semana").then((dados) => {
            const negociacoes = dados.map((objeto) => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            return negociacoes;
        }, (err) => {
            throw new Error("Não	foi	possível	obter	as	negociações");
        });
    }
    obterNegociacoesDaSemanaAnterior() {
        return this.http.get("negociacoes/anterior").then((dados) => dados.map((objeto) => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), (err) => {
            throw new Error("Não	foi	possível	obter	as	negociações da semana anterior");
        });
    }
    obterNegociacoesDaSemanaRetrasada() {
        return this.http.get("negociacoes/retrasada").then((dados) => dados.map((objeto) => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), (err) => {
            throw new Error("Não	foi	possível	obter	as	negociações da semana retrasada");
        });
    }
    async obterNegociacoesDoPeriodo() {
        try {
            let periodo = await Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada(),
            ]);
            return periodo
                .reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a, b) => b.getData.getTime() - a.getData.getTime());
        }
        catch (err) {
            console.log(err);
            throw new ApplicationException("Não	foi	possível	obter	as	negociações	do período");
        }
    }
}
//# sourceMappingURL=NegociacaoService.js.map