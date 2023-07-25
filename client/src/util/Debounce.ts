export function debounce(fn: Function, milissegundos: number) {
  return () => {
    setTimeout(() => fn(), milissegundos);
  };
}
