export function htmlFilaPago(d) {
  return `
    <table class="table table-striped">
      ${htmlFilaTitulo()}</td>
      ${htmlMultiplesPagos(d)}
    </table>`;
}
export const a="2";  
function htmlFilaTitulo() {
  return `
    <tr> 
      <td>Banco</td> 
      <td>Referencia</td> 
      <td>Fecha</td> 
      <td>Monto</td> 
      <td>Editar</td> 
    </tr>`;
}
function htmlMultiplesPagos(d) {
  let html = '';
  for (let i = 0; i < d.pagos.length; i++) {
  html +=`
    <tr>
      <td>${d.pagos[i].banco}</td>
      <td>${d.pagos[i].referencia}</td>
      <td>${getFecha(d.pagos[i].referencia)}</td>
      <td>${d.pagos[i].monto}</td>
      <td>${htmlModalPago(d,i)}</td>
    </tr>`
  }
  return html;
}
function htmlModalPago(d, i) {
  return `
  <button type="button" data-toggle="modal" data-target="#pagoModal" class="btn btn-edit-pago btn-sm" data-pagoId="${d.pagos[i]._id }">
    <span data-feather="edit-2"></span>
  </button>`  
}
function getFecha(date) {
  let value = typeof date === 'string' ? new Date(date) : date;
  return `${value.getDate()} ${value.getMonth()+1} ${value.getYear()}`;
}