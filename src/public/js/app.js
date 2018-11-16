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
const TAG = 'public/app';
const website = location.href.slice(0, -1) || 'http://localhost:5000/';

$(document).ready(async function() {
  console.log(website);
  oneTimeEventsSetup();
  let dt = DatatablesModule();
  dt.setupDT();
  dt.setupEvents();
  // dt.setupSideBar();
  let c = CalendarModule();
  c.configCalendar();
  feather.replace();
});

function oneTimeEventsSetup() {
  $('#agregarEstudianteNuevo').on('click', () => {
    let student = {
      nombre: $('#nombre').val(),
      apellido: $('#apellido').val(),
      grupo: $('#proyecto').val(),
      tlf: $('#tlf').val(),
      email: $('#correo').val(),
    };
    let pago = {
      banco: $('#banco').val(),
      referencia: $('#referencia').val(),
      monto: $('#monto').val(),
      fecha: $('#fecha').val(),
    };
    $.post('api/estudiante/new', student, 'json')
      .done(function(est) {
        console.log(est._id);
        student._id = est._id;
        $.post(`api/estudiante/${est._id}/pago`, pago, 'json').done(function(
          data
        ) {
          console.log(data);
          table.ajax.reload();
          table.draw();
          console.log('Sucess');
        });
      })
      .fail(function() {
        alert('error');
      });
    console.log(student._id);
    if (student._id) {
    }
  });

  let file_data;
  $('#inputP').change(function() {
    file_data = $('#inputP').prop('files')[0];
    let data = new FormData();
    data.append('planilla', file_data);
    $.ajax({
      type: 'POST',
      enctype: 'multipart/form-data',
      url: '/uploadPaola',
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function(data) {
        console.log('SUCCESS : ', data);
      },
      error: function(e) {
        console.log('ERROR : ', e);
      },
    });
    file_data = undefined;
  });
  $('#importarPaola').on('click', function() {
    $('#inputP').trigger('click');
  });

  $('#inputM').change(function() {
    file_data = $('#inputM').prop('files')[0];
    let data = new FormData();
    data.append('planilla', file_data);
    $.ajax({
      type: 'POST',
      enctype: 'multipart/form-data',
      url: '/uploadMarwan',
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function(data) {
        console.log('SUCCESS : ', data);
      },
      error: function(e) {
        console.log('ERROR : ', e);
      },
    });
    file_data = undefined;
  });
  $('#importarMarwan').on('click', function() {
    $('#inputM').trigger('click');
  });

  $('#extra').on('click', function() {});
  // Modal config
  setUpSideBar();

  function setUpSideBar() {
    let fecha = DateModule();
    $('li.mes').append(() => {
      $('.mes-actual')
        .closest('a')
        .attr('id', fecha.getAnoMesURL(new Date()));
      let meses = fecha.arrayMeses(new Date());
      let li = '';
      for (mes of meses.reverse()) {
        li += addNewMonthRow(mes);
      }
      return li;
    });

    function addNewMonthRow(date) {
      return `<a class="nav-link btn-fecha" id=${fecha.getAnoMesURL(
        date
      )} href="#" >
                    <span data-feather="file-text"></span>
                    ${fecha.getMesAno(date)}
                </a>  `;
    }
  }
}
function DatatablesModule() {
  const columnDefs = [
    {
      className: 'details-control',
      orderable: false,
      data: null,
      defaultContent: '',
    },
    {data: 'nombre'},
    {data: 'apellido'},
    {data: 'grupo'},
    {data: 'email'},
    {data: 'tlf'},
    {
      targets: -1,
      data: null,
      render: function htmlModalPago(d, i) {
        return `<button type="button" data-toggle="modal" data-target="#estudianteModal" class="btn btn-edit-pago btn-sm" 
                        data-estudianteId="${d._id}" data-nombre="${
          d.nombre
        }" data-apellido="${d.apellido}" data-tlf="${d.tlf}" data-grupo="${
          d.grupo
        }"
                        data-email="${d.email}">
                <span data-feather="edit"></span></button>`;
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
    // console.log(TAG,"Datatables url:",$("#table").DataTable.url());
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
        console.log(TAG, `${id} estudiante a reemplazar `, e);
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
    console.log(TAG, `newAjaxSrc|`, url);
    table.ajax.url(url).load();
  };
  return {
    setupDT: setupDT,
    setupEvents: setupEvents,
  };
}

function CalendarModule() {
  const dateformat = `mm/dd/yyyy`;
  const form = $(`.bootstrap-iso form`);
  let date_input = $(`input[name="date"]`); //our date input has the name "date"
  let container = form.length > 0 ? form.parent() : 'body';
  let options = {
    format: dateformat,
    container: container,
    todayHighlight: true,
    autoclose: true,
    todayBtn: true,
  };

  function getCurrentDate() {
    const today_date = new Date();
    return (
      (today_date.getDate() < 10 ? '0' : '') +
      String(today_date.getDate()) +
      '-' +
      (today_date.getMonth() < 9 ? '0' : '') +
      String(today_date.getMonth() + 1) +
      '-' +
      today_date.getFullYear()
    );
  }

  function configCalendar() {
    date_input.datepicker(options);
    $('#date').val(getCurrentDate());
  }

  return {
    configCalendar: configCalendar,
  };
}
function DateModule() {
  let monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  function getMonthName(monthNumber) {
    return monthNames[monthNumber];
  }

  function getFecha(date) {
    let value = typeof date === 'string' ? new Date(date) : date;
    return `${value.getDate()} ${getMesAno(value)}`;
  }

  function arrayMeses(date) {
    date = date ? date : new Date();
    let nMonth = date.getMonth();
    let nYear = date.getFullYear();
    let meses = [];
    for (let i = 0; i < 12; i++) {
      meses.push(new Date(nYear - 1, i)); //AGREGO AL Array los meses del año pasado
    }
    for (let i = 0; i <= nMonth; i++) {
      meses.push(new Date(nYear, i)); //AGREGO AL Array los meses de este año hasta el actual
    }
    meses.pop(); //elimino el actual debido a que lo manejo no con su nombre sino con "Mes actual"
    return meses;
  }

  function getMesAno(date) {
    let value = typeof date === 'string' ? new Date(date) : date;
    return `${getMonthName(value.getMonth())} ${value.getFullYear()}`;
  }

  function getAnoMesURL(date) {
    return +date.getFullYear() + '/' + (date.getMonth() + 1) + '/';
  }

  return {
    getFecha: getFecha,
    arrayMeses: arrayMeses,
    getMesAno: getMesAno,
    getAnoMesURL: getAnoMesURL,
    // getMonthName:getMonthName,
  };
}
