import NegociacaoDao from "../domain/negociacao/NegociacaoDao.js";
import ConnectionFactory from "./ConnectionFactory.js";

export default async function getNegociacaoDao() {
  let conn = await ConnectionFactory.getConnection();
  return new NegociacaoDao(conn as IDBDatabase);
}
