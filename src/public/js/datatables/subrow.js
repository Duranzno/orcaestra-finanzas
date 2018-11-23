function subRow() {
	let table=$('#table').DataTable({"retrieve": true});
  console.log('subrow executed');
  $('#table tbody').on('click', 'td.details-control', function() {
  console.log('subrow click added');
    let tr = $(this).closest('tr');
    let filasPagos = table.row(tr);
    if (filasPagos.child.isShown()) {
      //Los pagos del estudiante estan mostrados, se van a ocultar
      filasPagos.child.hide();
      tr.removeClass('shown');
    } 
    else {
      // Mostrar Filas de Pagos
      let html = htmlFila(filasPagos.data(),htmlPagoTitulo,htmlPagoHijos /*ó hijo.titulo, hijo.hijo*/);
      filasPagos.child(html).show();
      tr.addClass('shown');
      feather.replace()
    } 
    
  });

  function htmlFila(d,titulo,hijo) {
    return `
    	<table class="table table-striped">
          ${titulo()}
          ${hijo(d) }
      </table>`;
      // ${htmlTitulo()}
      // ${htmlHijos(d)}
	}
  function htmlPagoTitulo() {
    return `
    <tr><td>Banco</td> <td>Referencia</td> <td>Fecha</td> <td>Monto</td> <td>Opciones</td> </tr>`;
  }

  function htmlPagoHijos(d) {
    let fecha = DateModule();
    let html = '';
    for (let i = 0; i < d.pagos.length; i++) {
      html +=`
        <tr> 
          <td>${d.pagos[i].banco}</td> 
          <td>${d.pagos[i].referencia}</td> 
          <td>${fecha.getFecha(d.pagos[i].fecha)}</td> 
          <td>${d.pagos[i].monto}</td> 
          <td>
          	 <button type="button" data-pagoId="${d.pagos[i]._id}"
                class="btn btn-edit-pago btn-outline-dark btn-sm">
          		<span data-feather="edit-2"></span> 
        		</button>
            <button type="button" data-pagoId="${d.pagos[i]._id}"
                class="btn btn-delete-pago btn-outline-dark btn-sm">
              <span data-feather="file-minus"></span> 
            </button>
          </td> 
        </tr>`
    }
    return html;
  }

	function htmlHijoTitulo() {
    return `
    <tr><td>Nombre</td> <td>Apellido</td> <td>Grupo</td> <td>Opciones</td> </tr>`;
  }

  function htmlHijoHijos(d) {
    let html = '';
    for (let i = 0; i < d.hijos.length; i++) {
      html +=`
        <tr> 
          <td>${d.hijos[i].nombre}</td> 
          <td>${d.hijos[i].apellido}</td> 
          <td>${d.hijos[i].grupo}</td> 
          <td>
          	 <button type="button" data-toggle="modal" data-target="#pagoModal" 
          			class="btn btn-edit-pago btn-sm" 
          			data-pagoId="${d.hijos[i]._id}">
          		<span data-feather="edit-2"></span>
        		</button>
          </td> 
        </tr>`
    }
    return html;
  }	
}

