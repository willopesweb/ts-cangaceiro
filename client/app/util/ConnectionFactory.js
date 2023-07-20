const stores = ["negociacoes"];
let connection = null;
let close = null;
export default class ConnectionFactory {
    constructor() {
        throw new Error("Não é possível criar instâncias dessa classe!");
    }
    static getConnection() {
        return new Promise((resolve, reject) => {
            if (connection)
                return resolve(connection);
            const openRequest = indexedDB.open("tscangaceiro", 2);
            openRequest.onupgradeneeded = (e) => {
                connection = e.target.result;
                if (connection)
                    ConnectionFactory.createStores(connection);
            };
            openRequest.onsuccess = (e) => {
                connection = e.target?.result;
                if (connection) {
                    close = connection.close.bind(connection);
                    connection.close = () => {
                        throw new Error("Você	não	pode	fechar	diretamente	a	conexão");
                    };
                    resolve(connection);
                }
                else {
                    reject(Error("Error opening database"));
                }
            };
            openRequest.onerror = (e) => {
                const error = e.target.error;
                console.log(error);
                reject(error?.name);
            };
        });
    }
    static createStores(connection) {
        stores.forEach((store) => {
            if (connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement: true });
        });
    }
    static closeConnection() {
        if (connection && close)
            close();
    }
}
//# sourceMappingURL=ConnectionFactory.js.map