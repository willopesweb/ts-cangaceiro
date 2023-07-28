export function debounce(milissegundos = 500) {
    return function (target, key, descriptor) {
        const metodoOriginal = descriptor.value;
        let timer = 0;
        descriptor.value = function (event, ...args) {
            if (event)
                event.preventDefault();
            clearTimeout(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
        };
        return descriptor;
    };
}
//# sourceMappingURL=Debounce.js.map