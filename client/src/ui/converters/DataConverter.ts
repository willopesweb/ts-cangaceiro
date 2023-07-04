export default class DataConverter {
  constructor() {
    throw new Error("Esta não pode ser instaciada!");
  }

  public static paraTexto(data: Date) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  public static paraData(texto: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto))
      throw new Error("Deve	estar	no	formato	aaaa-mm-dd");
    return new Date(texto.replace(/-/g, ","));
  }
}
