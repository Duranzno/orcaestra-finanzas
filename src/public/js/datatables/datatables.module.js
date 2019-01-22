class DatatablesModule {
  constructor(dateModule, isStudentTable, ajax) {
    this.fecha = dateModule;
    this.table = this.setupDataTable(isStudentTable, ajax)
    this.ajax = ajax;
    let sthis = this;
    $('#searchBar').on('keyup', function () {
      const table = $('#table').DataTable({ "retrieve": true });
      // Barra de Busqueda que filtra por datos estudiantiles
      table.search(this.value).draw();
    });

    //Botones para filtrar por estudiantes que han pagado en ese mes-año
    $('.btn-fecha').on('click', function () {
      const fechaURL = $(this)
        .closest('a')
        .attr(`id`);
      const url = sthis.ajax.url + fechaURL;
      console.log(url)
      Ajax.updateTable(url);
    });

  }
  //LLamada a toda la configuracion de filas de Pago
  async setupDataTable(isStudentTable, ajax) {
    isStudentTable = (typeof isStudentTable === "undefined")
      ? this.changeTable(true)
      : isStudentTable;

    if ($.fn.DataTable.isDataTable('#table')) {
      $('#table').DataTable({ 'retrieve': true }).destroy()
      $('#table').empty();
    }

    return $('#table').DataTable({
      ajax: {
        url: ajax.url,
        dataSrc: '',
        deferRender: true,
      },
      language: Constants.dtESP(),
      select: 'single', // enable single row selection
      sPaginationType: 'full_numbers',
      columns: (isStudentTable)
        ? Constants.colE()
        : Constants.colP(),
      responsive: true,
      paging: false,
      order: [[1, 'asc']],
      drawCallback: () => { feather.replace(); },
    });
  }
}