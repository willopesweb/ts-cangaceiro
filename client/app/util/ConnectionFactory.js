export default class ConnectionFactory {
    constructor() {
        throw new Error("Não é possível criar instâncias dessa classe!");
    }
    static getConnection() {
        return new Promise((resolve, reject) => { });
    }
}
//# sourceMappingURL=ConnectionFactory.js.map