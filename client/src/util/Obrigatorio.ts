export function obrigatorio(parametro: string) {
  throw new Error(`${parametro} é um parâmetro obrigatório`);
}
