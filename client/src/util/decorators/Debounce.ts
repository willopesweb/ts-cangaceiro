export function debounce(milissegundos: number = 500) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value;
    let timer: number = 0;
    descriptor.value = function (event: Event, ...args: any[]) {
      if (event) event.preventDefault();
      clearTimeout(timer);
      timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
    };
    return descriptor;
  };
}
