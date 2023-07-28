export function controller(...seletores: string[]) {
  const elements = seletores.map((seletor: string) =>
    document?.querySelector(seletor)
  );
  return function <T extends { new (...args: any[]): any }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...elements, ...args);
      }
    };
  };
}
