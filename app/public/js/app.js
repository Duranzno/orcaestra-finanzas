const dateformat = 'mm/dd/yyyy';

function getCurrentDate() {
  const today_date = new Date();
  return ((today_date.getDate() < 10) ? "0" : "") + String(today_date.getDate()) + "-" + ((today_date.getMonth() < 9) ? "0" : "") + String(today_date.getMonth() + 1) + "-" + today_date.getFullYear();
}

$(document).ready(function () {
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
  $("#date").val(getCurrentDate());
  let columnDefs = [
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
  //DATATABLE SHIT
  console.log("Tables ready");
  let table = $("#table").DataTable({
    "ajax": "../public/js/ajax.json",
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

  });
  $("#searchBar").on("keyup", function () {
    console.log(this.value)
    table.search(this.value).draw();
  });
});

//DATATABLE SHIT
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


$("#agregarEstudianteNuevo").on("click", () => {
  let student = {
    nombre: $("#nombre").val(),
    apellido: $("#apellido").val(),
    grupo: $("#proyecto").val()
  };
  console.log(student);
  $.post("/api/addStudent", student, () => console.log("Sucess"), "json");
})
;

