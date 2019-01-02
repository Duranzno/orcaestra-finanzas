class DatatablesModule {
  constructor(dateModule, isStudentTable, ajax) {
    this.fecha = dateModule;
    this.table = this.setupDataTable(isStudentTable)
    this.ajax = ajax;
    $('#searchBar').on('keyup', function () {
      // Barra de Busqueda que filtra por datos estudiantiles
      this.table.search(this.value).draw();
    });

    //Botones para filtrar por estudiantes que han pagado en ese mes-año
    $('.btn-fecha').on('click', function () {
      const fechaURL = $(this)
        .closest('a')
        .attr(`id`);
      const url = this.ajax.newAjaxSrc + fechaURL;
      console.log(url)
      this.ajax.newAjaxSrc(url);
    });

  }
  //LLamada a toda la configuracion de filas de Pago
  async setupDataTable(isStudentTable) {
    isStudentTable = (typeof isStudentTable === "undefined")
      ? this.changeTable(true)
      : isStudentTable;

    if ($.fn.DataTable.isDataTable('#table')) {
      $('#table').DataTable({ 'retrieve': true }).destroy()
      $('#table').empty();
    }

    return $('#table').DataTable({
      ajax: {
        url: (isStudentTable)
          ? 'http://localhost:1234/api/estudiantes'
          : 'http://localhost:1234/api/padres',
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