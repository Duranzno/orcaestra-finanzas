function format(d) {
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        titlerow() +
        '<tr>' +
        '<td>d.banco</td>' +
        '<td>d.referencia</td>' +
        '<td>d.fecha</td>' +
        '<td>d.monto</td>' +
        '</tr>' +
        '</table>';

}

function titlerow() {
    return '<tr>' +
        '<td>Banco</td>' +
        '<td>N Referencia</td>' +
        '<td>Fecha</td>' +
        '<td>Monto</td>' +
        '</tr>'
}

$(document).ready(function () {
    console.log("Tables ready");
    let table = $('#table').DataTable({
        "ajax": "../scripts/ajax.json",
        "columns": [
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            {"data": "nombre"},
            {"data": "apellido"},
            {"data": "proyecto"}
        ],
        "paging": false,

        "order": [[1, "asc"]]
    });
    $('#table tbody').on('click', 'td.details-control', () => {

        let tr = $(this).closest('tr');
        let row = table.row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            alert("close");
            tr.removeClass('shown');
        }
        else {
            // Open this row
            alert("open");
            console.log(row);
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    })
});
