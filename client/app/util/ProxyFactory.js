export default class ProxyFactory {
    static create(objeto, props, armadilha) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                const property = prop;
                if (ProxyFactory.isFunction(target[property]) &&
                    props.includes(property)) {
                    return function () {
                        console.log(`"${String(property)}" disparou a armadilha`);
                        target[property].apply(target, arguments);
                        armadilha(target);
                    };
                }
                else {
                    return target[property];
                }
            },
            set(target, prop, value, receiver) {
                const property = prop;
                const updated = Reflect.set(target, property, value);
                if (props.includes(property))
                    armadilha(target);
                return updated;
            },
        });
    }
    static isFunction(fn) {
        return typeof fn === "function";
    }
}
//# sourceMappingURL=ProxyFactory.js.map