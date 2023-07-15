export default class ProxyFactory {
  static create<T extends object>(
    objeto: T,
    props: string[],
    armadilha: (objeto: T) => void
  ): T {
    return new Proxy(objeto, {
      get(target: T, prop: string | symbol, receiver: any) {
        const property = prop as keyof T;
        if (
          ProxyFactory.isFunction(target[property]) &&
          props.includes(property as string)
        ) {
          return function () {
            console.log(`"${String(property)}" disparou a armadilha`);
            (target[property] as Function).apply(target, arguments);
            armadilha(target);
          };
        } else {
          return target[property];
        }
      },
      set(target: T, prop: string | symbol, value: any, receiver: any) {
        const property = prop as keyof T;
        const updated = Reflect.set(target, property, value);
        if (props.includes(property as string)) armadilha(target);
        return updated;
      },
    });
  }

  private static isFunction(fn: unknown): fn is Function {
    return typeof fn === "function";
  }
}
