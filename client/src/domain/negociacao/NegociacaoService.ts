import HttpService from "../../util/HttpService.js";
import Negociacao from "./Negociacao.js";

import { NegociacaoInterface } from "../../util/types.js";
import { ApplicationException } from "../../util/ApplicationException.js";

export default class NegociacaoService {
  public http: HttpService;

  constructor() {
    this.http = new HttpService();
  }
  public obterNegociacoesDaSemana() {
    return this.http.get("negociacoes/semana").then(
      (dados: Array<NegociacaoInterface>) => {
        const negociacoes = dados.map(
          (objeto) =>
            new Negociacao(
              new Date(objeto.data),
              objeto.quantidade,
              objeto.valor
            )
        );
        return negociacoes;
      },
      (err) => {
        throw new Error("Não	foi	possível	obter	as	negociações");
      }
    );
  }

  public obterNegociacoesDaSemanaAnterior() {
    return this.http.get("negociacoes/anterior").then(
      (dados: Array<NegociacaoInterface>) =>
        dados.map(
          (objeto) =>
            new Negociacao(
              new Date(objeto.data),
              objeto.quantidade,
              objeto.valor
            )
        ),
      (err) => {
        throw new Error("Não	foi	possível	obter	as	negociações da semana anterior");
      }
    );
  }

  public obterNegociacoesDaSemanaRetrasada() {
    return this.http.get("negociacoes/retrasada").then(
      (dados: Array<NegociacaoInterface>) =>
        dados.map(
          (objeto) =>
            new Negociacao(
              new Date(objeto.data),
              objeto.quantidade,
              objeto.valor
            )
        ),
      (err) => {
        throw new Error("Não	foi	possível	obter	as	negociações da semana retrasada");
      }
    );
  }

  public async obterNegociacoesDoPeriodo() {
    try {
      let periodo: Array<Negociacao[]> = await Promise.all([
        this.obterNegociacoesDaSemana(),
        this.obterNegociacoesDaSemanaAnterior(),
        this.obterNegociacoesDaSemanaRetrasada(),
      ]);
      return periodo
        .reduce((novoArray, item) => novoArray.concat(item), [])
        .sort((a, b) => b.getData.getTime() - a.getData.getTime());
    } catch (err: unknown) {
      console.log(err);
      throw new ApplicationException(
        "Não	foi	possível	obter	as	negociações	do período"
      );
    }
  }
}
