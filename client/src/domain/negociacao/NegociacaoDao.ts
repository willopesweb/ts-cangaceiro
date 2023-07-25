import Negociacao from "./Negociacao.js";

export default class NegociacaoDao {
  private connection: IDBDatabase;
  private store: string;
  constructor(connection: IDBDatabase) {
    this.connection = connection;
    this.store = "negociacoes";
  }

  adiciona(negociacao: Negociacao): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.connection
        .transaction([this.store], "readwrite")
        .objectStore(this.store)
        .add(negociacao);

      request.onsuccess = (e) => resolve();
      request.onerror = (e) => {
        console.log((e.target as IDBRequest).error);
        reject("Não foi possível salvar a negociação");
      };
    });
  }
  listaTodos(): Promise<Array<Negociacao>> {
    return new Promise((resolve, reject) => {
      const negociacoes: Array<Negociacao> = [];

      const cursorRequest = this.connection
        .transaction([this.store], "readwrite")
        .objectStore(this.store)
        .openCursor();

      cursorRequest.onsuccess = (e: Event) => {
        const cursor: IDBCursorWithValue = (e.target as IDBRequest).result;

        if (cursor) {
          const negociacao = new Negociacao(
            cursor.value.data,
            cursor.value.quantidade,
            cursor.value.valor
          );

          negociacoes.push(negociacao);
          cursor.continue();
        } else {
          resolve(negociacoes);
        }
      };

      cursorRequest.onerror = (e) => {
        console.log((e.target as IDBRequest).error);
        reject("Não foi possível listar nas negociações");
      };
    });
  }

  apagaTodos(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = this.connection
        .transaction([this.store], "readwrite")
        .objectStore(this.store)
        .clear();

      request.onsuccess = (e) => resolve();

      request.onerror = (e) => {
        console.log((e.target as IDBRequest).error);
        reject("Não foi possível apagar as negociações");
      };
    });
  }
}
