export class ApplicationException extends Error {
  constructor(msg = "") {
    super(msg);
    this.name = this.constructor.name;
  }
}

export function isApplicationException(err: unknown) {
  return (
    err instanceof ApplicationException ||
    Object.getPrototypeOf(err) instanceof ApplicationException
  );
}

export function getExceptionMessage(err: unknown) {
  if (isApplicationException(err)) {
    return (err as Error).message;
  } else {
    console.log(err);
    return "Não	foi	possível	realizar	a	operação.";
  }
}
