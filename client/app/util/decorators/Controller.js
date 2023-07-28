export function controller(...seletores) {
    const elements = seletores.map((seletor) => document?.querySelector(seletor));
    return function (constructor) {
        return class extends constructor {
            constructor(...args) {
                super(...elements, ...args);
            }
        };
    };
}
//# sourceMappingURL=Controller.js.map