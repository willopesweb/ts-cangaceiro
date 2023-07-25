export function debounce(fn, milissegundos) {
    return () => {
        setTimeout(() => fn(), milissegundos);
    };
}
//# sourceMappingURL=Debounce.js.map