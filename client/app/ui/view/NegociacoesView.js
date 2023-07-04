import DateConverter from "../converters/DataConverter.js";
export default class NegociacaoView {
    elemento;
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
    update(model) {
        if (!this.elemento)
            return;
        this.elemento.innerHTML = this.template(model);
    }
    template(model) {
        return `
    <table class="table table-hover table-bordered">
      <thead>
          <tr>
              <th>DATA</th>
              <th>QUANTIDADE</th>
              <th>VALOR</th>
              <th>VOLUME</th>
          </tr>
      </thead>

      <tbody>
      ${model
            .paraArray()
            .map((negociacao) => `  
        <tr>
          <td>${DateConverter.paraTexto(negociacao.getData)}</td>
          <td>${negociacao.getQuantidade}</td>
          <td>${negociacao.getValor}</td>
          <td>${negociacao.getVolume}</td>
        </tr>
        `)
            .join("")}
      </tbody>

      <tfoot>
      <tr>
        <td	colspan="3"></td>
        <td>${model.volumeTotal}</td>
      </tr>
      </tfoot>
  </table>
`;
    }
}
//# sourceMappingURL=NegociacoesView.js.map