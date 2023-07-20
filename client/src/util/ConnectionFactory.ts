const stores: Array<string> = ["negociacoes"];
let connection: IDBDatabase | null = null;
let close: Function | null = null;

export default class ConnectionFactory {
  constructor() {
    throw new Error("Não é possível criar instâncias dessa classe!");
  }

  public static getConnection() {
    return new Promise((resolve, reject) => {
      if (connection) return resolve(connection);
      const openRequest: IDBOpenDBRequest = indexedDB.open("tscangaceiro", 2);
      openRequest.onupgradeneeded = (e: IDBVersionChangeEvent) => {
        connection = (e.target as IDBOpenDBRequest).result as IDBDatabase;
        if (connection) ConnectionFactory.createStores(connection);
      };
      openRequest.onsuccess = (e) => {
        connection = (e.target as IDBOpenDBRequest)?.result as IDBDatabase;
        if (connection) {
          close = connection.close.bind(connection);
          connection.close = () => {
            throw new Error("Você	não	pode	fechar	diretamente	a	conexão");
          };
          resolve(connection);
        } else {
          reject(Error("Error opening database"));
        }
      };
      openRequest.onerror = (e: Event) => {
        const error = (e.target as IDBOpenDBRequest).error;
        console.log(error);
        reject(error?.name);
      };
    });
  }

  private static createStores(connection: IDBDatabase): void {
    stores.forEach((store) => {
      if (connection.objectStoreNames.contains(store))
        connection.deleteObjectStore(store);

      connection.createObjectStore(store, { autoIncrement: true });
    });
  }

  public static closeConnection(): void {
    if (connection && close) close();
  }
}
