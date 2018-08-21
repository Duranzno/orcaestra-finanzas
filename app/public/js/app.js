// let calendar = require("app.js/../app/calendar");
// var dt = require("app.js/../app/tables");

let table;

$(document).ready(async function () {
  configCalendar();

  //DATATABLE SHIT
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
      console.log(f);
      row.child(f).show();
      tr.addClass("shown");
    }

    function format(d) {
      function multiplesPagos(d) {
        let respuesta = "";
        for (let i = 0; i < d.pagos.length; i++) {
          respuesta =
              respuesta + "<tr>" +
              "<td>" + d.pagos[i].banco + "</td>" +
              "<td>" + d.pagos[i].referencia + "</td>" +
              "<td>" + d.pagos[i].fecha + "</td>" +
              "<td>" + d.pagos[i].monto + "</td>" +
              "</tr>"
        }
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

      if (Array.isArray(d.pagos)) {
        return `<table class="table table-striped">
                ${titlerow()}</td>
                ${multiplesPagos(d)}
            </table>`;
      }
    }
  });

  $("#searchBar").on("keyup", function () {
    console.log(this.value);
    table.search(this.value).draw();
  });


});

//DATATABLE SHIT
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

function configCalendar() {
  const dateformat = 'mm/dd/yyyy';

  let date_input = $('input[name="date"]'); //our date input has the name "date"
  const form = $('.bootstrap-iso form');
  let container = form.length > 0 ? form.parent() : "body";
  let options = {
    format: dateformat,
    container: container,
    todayHighlight: true,
    autoclose: true,
    todayBtn: true
  };

  date_input.datepicker(options);

  function getCurrentDate() {
    const today_date = new Date();
    return ((today_date.getDate() < 10) ? "0" : "") + String(today_date.getDate()) + "-" + ((today_date.getMonth() < 9) ? "0" : "") + String(today_date.getMonth() + 1) + "-" + today_date.getFullYear();
  }

  $("#date").val(getCurrentDate());

}


