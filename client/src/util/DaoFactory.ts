import NegociacaoDao from "../domain/negociacao/NegociacaoDao.js";
import ConnectionFactory from "./ConnectionFactory.js";

export default function getNegociacaoDao() {
  return ConnectionFactory.getConnection().then(
    (conn) => new NegociacaoDao(conn as IDBDatabase)
  );
}
