import Negociacao from "./Negociacao.js";

export default class NegociacaoService {
  public obterNegociacoesDaSemana(callback: Function) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "negociacoes/semana");
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const negociacoes = JSON.parse(xhr.responseText).map(
            (objeto: { data: string; quantidade: number; valor: number }) =>
              new Negociacao(
                new Date(objeto.data),
                objeto.quantidade,
                objeto.valor
              )
          );
          callback(null, negociacoes);
        } else {
          console.log(xhr.responseText);
          callback("Não	foi	possível	obter	nas	negociações	da	semana", null);
        }
      }
    };
    xhr.send();
  }
}
