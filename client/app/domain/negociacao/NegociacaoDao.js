import Negociacao from "./Negociacao.js";
export default class NegociacaoDao {
    connection;
    store;
    constructor(connection) {
        this.connection = connection;
        this.store = "negociacoes";
    }
    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            const request = this.connection
                .transaction([this.store], "readwrite")
                .objectStore(this.store)
                .add(negociacao);
            request.onsuccess = (e) => resolve();
            request.onerror = (e) => {
                console.log(e.target.error);
                reject("Não foi possível salvar a negociação");
            };
        });
    }
    listaTodos() {
        return new Promise((resolve, reject) => {
            const negociacoes = [];
            const cursorRequest = this.connection
                .transaction([this.store], "readwrite")
                .objectStore(this.store)
                .openCursor();
            cursorRequest.onsuccess = (e) => {
                const cursor = e.target.result;
                if (cursor) {
                    const negociacao = new Negociacao(cursor.value._data, cursor.value._quantidade, cursor.value._valor);
                    negociacoes.push(negociacao);
                    cursor.continue();
                }
                else {
                    resolve(negociacoes);
                }
            };
            cursorRequest.onerror = (e) => {
                console.log(e.target.error);
                reject("Não foi possível listar nas negociações");
            };
        });
    }
    apagaTodos() {
        return new Promise((resolve, reject) => {
            const request = this.connection
                .transaction([this.store], "readwrite")
                .objectStore(this.store)
                .clear();
            request.onsuccess = (e) => resolve();
            request.onerror = (e) => {
                console.log(e.target.error);
                reject("Não foi possível apagar as negociações");
            };
        });
    }
}
//# sourceMappingURL=NegociacaoDao.js.map