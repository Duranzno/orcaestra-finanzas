class Subrow {
  constructor(isPagoTable) {
    this.isPagoTable = isPagoTable;
    let sthis = this;
    $('#table').on('click', 'td.details-control', this.drawer(sthis));
  }
  pagoTable() {
    this.isPagoTable = true;
    this.drawer(this);
    $('.shown .details-control').click()
  }
  hijoTable() {
    this.isPagoTable = false;
    this.drawer(this);
    $('.shown .details-control').click()
  }

  drawer(sthis) {
    return function () {
      let table = $('#table').DataTable({ "retrieve": true });
      let html;
      let tr = $(this).closest('tr');
      let filas = table.row(tr);
      let data = {
        ...($('#table').DataTable({ "retrieve": true }).row(tr).data()), PadreRow: tr[0]._DT_RowIndex
      };
      if (filas.child.isShown()) {
        //Los pagos del estudiante estan mostrados, se van a ocultar
        filas.child.hide();
        tr.removeClass('shown');
      }
      else {
        if (sthis.isPagoTable) {
          html = sthis.htmlFila(data, sthis.htmlPagoTitulo, sthis.htmlPagoHijos /*ó hijo.titulo, hijo.hijo*/);
        }
        else {
          html = sthis.htmlFila(data, sthis.htmlHijoTitulo, sthis.htmlHijoHijos /*ó hijo.titulo, hijo.hijo*/);

        }
        filas.child(html).show();
        tr.addClass('shown');
        feather.replace();
      }
    };
  }

  htmlFila(d, titulo, hijo) {
    return `
      <table class="table table-striped">
          ${titulo()}
          ${hijo(d)}
      </table>`;
    // ${htmlPagoTitulo()}
    // ${htmlPagoHijos(d)}
  }
  htmlPagoTitulo() {
    return `
    <tr><td>Banco</td> <td>Referencia</td> <td>Fecha</td> <td>Monto</td> <td>Opciones</td> </tr>`;
  }

  htmlPagoHijos(d) {
    let fecha = new DateModule();
    let html = '';
    for (let i = 0; i < d.pagos.length; i++) {
      html += `
        <tr> 
          <td>${d.pagos[i].banco}</td> 
          <td>${d.pagos[i].referencia}</td> 
          <td>${fecha.getFecha(d.pagos[i].fecha)}</td>
          <td>${d.pagos[i].monto}</td> 
          <td>
             <button type="button" data-pagoId="${d.pagos[i]._id}"  data-row='${d.PadreRow}'
                class="btn btn-edit-pago btn-outline-dark btn-sm">
              <span data-feather="edit-2"></span> 
            </button>
            <button type="button" data-pagoId="${d.pagos[i]._id}" data-row='${d.PadreRow}'
                class="btn btn-delete-pago btn-outline-dark btn-sm">
              <span data-feather="file-minus"></span> 
            </button>
          </td> 
        </tr>`
    }
    return html;
  }

  htmlHijoTitulo() {
    return `
    <tr><td>Nombre</td> <td>Apellido</td> <td>Grupo</td> <td>Opciones</td> </tr>`;
  }

  htmlHijoHijos(d) {
    let html = '';
    for (let i = 0; i < d.hijos.length; i++) {
      html += `
        <tr> 
          <td>${d.hijos[i].nombre}</td> 
          <td>${d.hijos[i].apellido}</td> 
          <td>${d.hijos[i].grupo}</td> 
          <td>
             <button type="button" data-hijoId="${d.hijos[i]._id}" data-row='${d.PadreRow}'class="btn btn-edit-hijo btn-outline-dark btn-sm">
              <span data-feather="edit-2"></span> 
            </button>
            <button type="button" data-hijoId="${d.hijos[i]._id}" data-row='${d.PadreRow}'class="btn btn-delete-hijo btn-outline-dark btn-sm">
              <span data-feather="file-minus"></span> 
            </button>
          </td> 
        </tr>`
    }
    return html;
  }
}