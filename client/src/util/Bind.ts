import { Model } from "./types.js";
import View from "../ui/view/View.js";
import ProxyFactory from "./ProxyFactory.js";

export default class Bind {
  constructor(model: Model, view: View, ...props: Array<string>) {
    const proxy = ProxyFactory.create(model, props, (model: Model) => {
      view.update(model);
    });

    view.update(model);
    return proxy;
  }
}
