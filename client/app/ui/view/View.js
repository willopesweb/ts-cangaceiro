export default class View {
    elemento;
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
    template(model) {
        throw new Error("Você	precisa	implementar	o	método	template");
    }
    update(model) {
        if (!this.elemento || !model)
            return;
        this.elemento.innerHTML = this.template(model);
    }
}
//# sourceMappingURL=View.js.map