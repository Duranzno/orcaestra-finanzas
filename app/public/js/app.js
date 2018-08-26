$(document).ready(async function () {
  let dt = DatatablesModule();
  dt.setup();
  dt.setupEvents();
  dt.setupSideBar();
  let c = CalendarModule();
  c.configCalendar();
  otherSetup();
  feather.replace();
});

function otherSetup() {
  $("#agregarEstudianteNuevo").on("click", () => {
    let student = {
      nombre: $("#nombre").val(),
      apellido: $("#apellido").val(),
      grupo: $("#proyecto").val(),
      tlf: $("#tlf").val(),
      email: $("#correo").val(),
    };
    let pago = {
      banco: $("#banco").val(),
      referencia: $("#referencia").val(),
      monto: $("#monto").val(),
      fecha: $("#fecha").val(),
    };
    $.post("/estudiante/new", student, "json")
        .done(function (est) {
          console.log(est._id);
          student._id = est._id;
          $.post(`/estudiante/${est._id}/pago`, pago, "json")
              .done(function (data) {
                console.log(data);
                table.ajax.reload();
                table.draw();
                newRowPago();
                console.log("Sucess")
              });
        })
        .fail(function () {
          alert('error')
        });
    console.log(student._id);
    if (student._id) {


    }

  });

  var file_data;
  $("#inputP").change(function () {
    file_data = $("#inputP").prop("files")[0];
    let data = new FormData();
    data.append("planilla", file_data);
    $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: "/uploadPaola",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (data) {
        console.log("SUCCESS : ", data);
      },
      error: function (e) {
        console.log("ERROR : ", e);
      }
    });
    file_data = undefined;
  });
  $("#importarPaola").on("click", function () {
    $("#inputP").trigger("click");
  });

  $("#inputM").change(function () {
    file_data = $("#inputM").prop("files")[0];
    let data = new FormData();
    data.append("planilla", file_data);
    $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: "/uploadMarwan",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (data) {
        console.log("SUCCESS : ", data);
      },
      error: function (e) {
        console.log("ERROR : ", e);
      }
    });
    file_data = undefined;
  });
  $("#importarMarwan").on("click", function () {
    $("#inputM").trigger("click");
  });

  $("#extra").on("click", function () {

  });
}
function DatatablesModule() {
  const columnDefs = [
    {
      "className": "details-control",
      "orderable": false,
      "data": null,
      "defaultContent": ""
    },
    {"data": "nombre"},
    {"data": "apellido"},
    {"data": "email"},
    {"data": "grupo"},
    {"data": "tlf"},


  ];
  const dtESP = {
    "decimal": ",",
    "emptyTable": "No hay datos disponibles en la base de datos",
    "info": "Mostrando _START_ a _END_ de _TOTAL_ estudiantes",
    "infoEmpty": "Mostrando 0 a 0 de 0 estudiantes",
    "infoFiltered": "(filtrado de _MAX_ estudiantes totales)",
    "infoPostFix": "",
    "thousands": ".",
    "lengthMenu": "Mostrando _MENU_ opciones",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscando:",
    "zeroRecords": "No se han encontrado estudiantes con esas caracteristicas",
    "paginate": {
      "first": "Primero",
      "last": "Ultimo",
      "next": "Siguiente",
      "previous": "Previo"
    },
    "aria": {
      "sortAscending": ": Ordenar de forma ascendete",
      "sortDescending": ": Ordenar de forma descendente"
    }
  };
  let table;

  function setup() {
    table = $("#table").DataTable({
      "ajax": {
        "url": "http://localhost:3000/estudiantes",
        "dataSrc": "",
        "deferRender": true
      },
      "language": dtESP,
      "dom": 'Bfrtip',        // element order: NEEDS BUTTON CONTAINER (B) ****
      'select': 'single',     // enable single row selection
      "sPaginationType": "full_numbers",
      altEditor: true,      // Enable altEditor ****
      "columns": columnDefs,
      "responsive": true,
      "paging": false,

      "order": [[1, "asc"]]
    });
  }

  function setupEvents() {
    $("#searchBar").on("keyup", function () {
      console.log(this.value);
      table.search(this.value).draw();
    });
    $("#extra").on("click", function () {
      $("tr td[colspan=6]").remove();
      $(".shown").removeClass("shown");
      newRowPago();
    });

    newRowPago();
  }

  function newRowPago() {
    $("#table tbody").on("click", "td.details-control", function () {
      let tr = $(this).closest("tr");
      let row = table.row(tr);
      if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass("shown");
      }
      else {
        // Open this row
        let f = format(row.data());
        // console.log(f);
        row.child(f).show();
        tr.addClass("shown");
      }

      function format(d) {
        function multiplesPagos(d) {
          let fecha = DateModule();
          let respuesta = "";
          for (let i = 0; i < d.pagos.length; i++) {
            respuesta =
                respuesta + "<tr>" +
                "<td>" + d.pagos[i].banco + "</td>" +
                "<td>" + d.pagos[i].referencia + "</td>" +
                "<td>" + fecha.getFecha(d.pagos[i].fecha) + "</td>" +
                "<td>" + d.pagos[i].monto + "</td>" +
                "</tr>"
          }
          respuesta += (addNewPagoRow(d) + addNewPagoRow(d));
          return respuesta;
        }

        function titlerow() {
          return "<tr>" +
              "<td>Banco</td>" +
              "<td>Referencia</td>" +
              "<td>Fecha</td>" +
              "<td>Monto</td>" +
              "</tr>"
        }

        function addNewPagoRow(d) {
          return `<button 
                    class="btn btn-bg btn-outline-secondary" 
                    id=${d._id}
                  >
                    Importar para estudiante ${d._id}
                  </button>`
        }

        if (Array.isArray(d.pagos)) {
          return `<table class="table table-striped">
                ${titlerow()}</td>
                ${multiplesPagos(d)}
            </table>`;
        }
      }
    });
  }

  function setUpSideBar() {
    let fecha = DateModule();
    $("li.mes").append(() => {
      let meses = fecha.arrayMeses(new Date());
      let li = "";
      for (mes of meses.reverse()) {
        li += addNewMonthRow(mes)
      }
      return li;
    });

    function addNewMonthRow(date) {
      return `<a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    ${fecha.getMesAno(date)}
                </a>                    `
    }
  }

  return {
    setup: setup,
    setupEvents: setupEvents,
    setupSideBar: setUpSideBar,
  }
}
function DateModule() {
  monthNames = [
    "Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre"
  ];

  function getMonthName(monthNumber) {
    return monthNames[monthNumber];
  }

  function getFecha(date) {

    let value = (typeof date === "string") ? new Date(date) : date;
    return (`${value.getDate()} ${getMesAno(value)}`);
  }

  function arrayMeses(date) {
    date = date ? date : new Date();
    let nMonth = date.getMonth();
    let nYear = date.getFullYear();
    let meses = [];
    for (let i = 0; i < 12; i++) {
      meses.push(new Date(nYear - 1, i))
    }
    for (let i = 0; i <= nMonth; i++) {
      meses.push(new Date(nYear, i));
    }
    return meses;
  }

  function getMesAno(date) {
    let value = (typeof date === "string") ? new Date(date) : date;
    return (`${getMonthName(value.getMonth())} ${value.getFullYear()}`);
  }

  return {
    getFecha: getFecha,
    arrayMeses: arrayMeses,
    getMesAno: getMesAno,
    // getMonthName:getMonthName,
  }
}
function CalendarModule() {
  const dateformat = 'mm/dd/yyyy';
  const form = $('.bootstrap-iso form');
  let date_input = $('input[name="date"]'); //our date input has the name "date"
  let container = form.length > 0 ? form.parent() : "body";
  let options = {
    format: dateformat,
    container: container,
    todayHighlight: true,
    autoclose: true,
    todayBtn: true
  };
  function getCurrentDate() {
    const today_date = new Date();
    return ((today_date.getDate() < 10) ? "0" : "") + String(today_date.getDate()) + "-" + ((today_date.getMonth() < 9) ? "0" : "") + String(today_date.getMonth() + 1) + "-" + today_date.getFullYear();
  }

  function configCalendar() {
    date_input.datepicker(options);
    $("#date").val(getCurrentDate());
  }

  return {
    configCalendar: configCalendar
  }
}


