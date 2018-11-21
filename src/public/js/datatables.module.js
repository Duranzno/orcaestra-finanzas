const grupos = [
    'Sin Determinar',
    'Coro de Padres',
    'Inicial',
    'Preparatorio "B"',
    '"Alma Llanera"',
    'IMA',
    'IMB',
    'PMA',
    'PMB',
    'Pre-Infantil',
    'Infantil',
    'Pre Juvenil',
    'Juvenil',
    'Kinder Musical',
  ];
const website = location.href.slice(0, -1) || 'http://localhost:5000/';

function DatatablesModule(fecha) {
    console.log(fecha);
    const columnDefs = [
      {
        title:'Pagos',
        className: 'details-control',
        // render:function(){return'  <span data-feather="dollar-sign">A</span>'},
        orderable: false,
        data: null,
        defaultContent: '',
      },
      {
        title:'Nombre',
        data: 'nombre'},
      {
        title:'Apellido',
        data: 'apellido'},
      {
        title:'Grupo',
        data: 'grupo'},
      {
        title:'Correo',
        data: 'email'},
      {
        title:'Telefono',
        data: 'tlf'},
      {
        title:'Opciones',
        targets: -1,
        data: null,
        render: function htmlModalPago(d, i) {
          return `
          <button 
          type="button" data-toggle="modal" data-target="#estudianteModal" class=" btn-outline-dark btn btn-edit-pago btn-sm" data-estudianteId="${d._id}" 
            data-nombre="${d.nombre}"
            data-apellido="${d.apellido}"
            data-tlf="${d.tlf}"
            data-grupo="${d.grupo}"
            data-email="${d.email}">
            <span data-feather="edit"></span>
          </button>
          <button 
          type="button" data-toggle="modal" data-target="#estudianteModal" class="btn btn-edit-pago btn-outline-dark btn-sm" data-estudianteId="${d._id}" 
            data-nombre="${d.nombre}"
            data-apellido="${d.apellido}"
            data-tlf="${d.tlf}"
            data-grupo="${d.grupo}"
            data-email="${d.email}">
            <span data-feather="user-x"></span>
          </button>`;
        },
      },
    ];
    const dtESP = {
      decimal: ',',
      emptyTable: 'No hay datos disponibles en la base de datos',
      info: 'Mostrando _START_ a _END_ de _TOTAL_ estudiantes',
      infoEmpty: 'Mostrando 0 a 0 de 0 estudiantes',
      infoFiltered: '(filtrado de _MAX_ estudiantes totales)',
      infoPostFix: '',
      thousands: '.',
      lengthMenu: 'Mostrando _MENU_ opciones',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      search: 'Buscando:',
      zeroRecords: 'No se han encontrado estudiantes con esas caracteristicas',
      paginate: {
        first: 'Primero',
        last: 'Ultimo',
        next: 'Siguiente',
        previous: 'Previo',
      },
      aria: {
        sortAscending: ': Ordenar de forma ascendete',
        sortDescending: ': Ordenar de forma descendente',
      },
    };
    let table;
  
    // Se configura la variable table que es god object en DataTables.net
    function setupDT() {
      table = $('#table').DataTable({
        ajax: {
          url: website + '/api/estudiantes',
          dataSrc: '',
          deferRender: true,
        },
        language: dtESP,
        dom: 'Bfrtip', // element order: NEEDS BUTTON CONTAINER (B) ****
        select: 'single', // enable single row selection
        sPaginationType: 'full_numbers',
        altEditor: true, // Enable altEditor ****
        columns: columnDefs,
        responsive: true,
        paging: false,
        order: [[1, 'asc']],
      });
      feather.replace();
    }
  
    // Se configuran los eventos por JQuery que estan relacionados a DT
    function setupEvents() {
      // Barra de Busqueda que filtra por datos estudiantiles
      $('#searchBar').on('keyup', function() {
        console.log(this.value);
        table.search(this.value).draw();
      });
  
      //Boton Extra que se usa para debugeo
      $('#extra').on('click', function() {
        newAjaxSrc();
      });
  
      //Botones para filtrar por estudiantes que han pagado en ese mes-año
      $('.btn-fecha').on('click', function() {
        const fechaURL = $(this)
          .closest('a')
          .attr(`id`);
        const url = website + '/estudiantes/' + fechaURL;
        newAjaxSrc(url);
      });
      $(`#dashboard`).on(`click`, function() {
        newAjaxSrc();
      });
      $(`#estudianteModal`).on(`show.bs.modal`, function(event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var id = button.data(`estudianteid`); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal`s content. We`ll use jQuery here, but you could use a data binding library or other methods instead.
        console.log(id);
        let e = {
          nombre: button.data(`nombre`),
          apellido: button.data(`apellido`),
          grupo: button.data(`grupo`),
          tlf: button.data(`tlf`),
          email: button.data(`email`),
        };
        var modal = $(this);
        console.log(button.data(`grupo`));
        modal.find(`.modal-title`).text(`Cambiar datos de ` + e.nombre);
        modal.find(`.modal-body #nombre`).val(e.nombre);
        modal.find(`.modal-body #apellido`).val(e.apellido);
        modal.find(`.modal-body #grupo`).val(grupos.indexOf(e.grupo));
        // console.log(e.grupo);
        modal.find(`.modal-body #tlf`).val(e.tlf);
        modal.find(`.modal-body #correo`).val(e.correo);
  
        $(`.btn-modal-save-student`).on(`click`, function() {
          $('#estudianteModal').modal('toggle');
          let e = {
            nombre: modal.find(`.modal-body #nombre`).val(),
            apellido: modal.find(`.modal-body #apellido`).val(),
            grupo: modal.find(`.modal-body #grupo`).val(),
            tlf: modal.find(`.modal-body #tlf`).val(),
            email: modal.find(`.modal-body #correo`).val(),
          };
          $.ajax({
            type: 'PUT',
            url: url + '/estudiante/' + id,
            data: e,
            dataType: 'json',
          });
          newAjaxSrc();
        });
      });
  
      //LLamada a toda la configuracion de filas de Pago
      filasPago();
    }
  
    function filasPago() {
      $('#table tbody').on('click', 'td.details-control', function() {
        let tr = $(this).closest('tr');
        let filasPagos = table.row(tr);
        if (filasPagos.child.isShown()) {
          //Los pagos del estudiante estan mostrados, se van a ocultar
          filasPagos.child.hide();
          tr.removeClass('shown');
        } else {
          // Mostrar Filas de Pagos
          let htmlPagos = htmlFilaPago(filasPagos.data());
          filasPagos.child(htmlPagos).show();
          tr.addClass('shown');
  
          //Cada vez que se muestran las filas de pago se deben añadir de nuevo los eventos asociados
          eventosFilasPago();
        }
  
        function eventosFilasPago() {
          // $(".btn-edit-pago").on("click",function () {
          //   console.log("pago tocado");
          //   const pagoId = $(this).closest("button").attr(`id`);
          //   const url = website+ "/pago/" + pagoId;
          //   console.log(`direccion url:${url}`);
          //   alert(url);
          // });
          // $(".btn-edit-student"ś
          feather.replace();
        }
  
        function htmlFilaPago(d) {
          return `<table class="table table-striped">
                      ${htmlFilaTitulo()}</td>
                      ${htmlMultiplesPagos(d)}
                  </table>`;
  
          function htmlFilaTitulo() {
            return '<tr> <td>Banco</td> <td>Referencia</td> <td>Fecha</td> <td>Monto</td> <td>Editar</td> </tr>';
          }
  
          function htmlMultiplesPagos(d) {
            let fecha = DateModule();
            let html = '';
            for (let i = 0; i < d.pagos.length; i++) {
              html +=
                '<tr>' +
                '<td>' +
                d.pagos[i].banco +
                '</td>' +
                '<td>' +
                d.pagos[i].referencia +
                '</td>' +
                '<td>' +
                fecha.getFecha(d.pagos[i].fecha) +
                '</td>' +
                '<td>' +
                d.pagos[i].monto +
                '</td>' +
                '<td>' +
                htmlModalPago(d, i) +
                '</td>' +
                '</tr>';
            }
            return html;
          }
  
          function htmlModalPago(d, i) {
            return (
              `<button type="button" data-toggle="modal" data-target="#pagoModal" class="btn btn-edit-pago btn-sm" data-pagoId="` +
              d.pagos[i]._id +
              `">` +
              `<span data-feather="edit-2"></span></button>`
            );
          }
        }
      });
    }
  
    let newAjaxSrc = function(url) {
      url = url ? url : url + `/estudiantes`;
      table.ajax.url(url).load();
    };
    return {
      setupDT: setupDT,
      setupEvents: setupEvents,
    };
  }