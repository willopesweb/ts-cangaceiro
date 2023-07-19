import Negociacoes from "../domain/negociacao/Negociacoes.js";
import Mensagem from "../ui/models/Mensagem.js";

export type Model = Negociacoes | Mensagem;
export interface NegociacaoInterface {
  data: string;
  quantidade: number;
  valor: number;
}
