function DatatablesModule(fecha,isStudentTable) {
  // Se configura la variable table que es god object en DataTables.net
  let table=setupDataTable(isStudentTable)
  // Barra de Busqueda que filtra por datos estudiantiles
  $('#searchBar').on('keyup', function() {
    console.log(this.value);
    table.search(this.value).draw();
  });

  //Botones para filtrar por estudiantes que han pagado en ese mes-año
  $('.btn-fecha').on('click', function() {
    const fechaURL = $(this)
      .closest('a')
      .attr(`id`);
    const url = website + '/api/estudiantes/' + fechaURL;
    console.log(url)
    newAjaxSrc(url);
  });
  //LLamada a toda la configuracion de filas de Pago
  async function setupDataTable(){
    if (  $.fn.DataTable.isDataTable( '#table' ) ) {
      $('#table').DataTable({'retrieve': true}).destroy()
      $('#table').empty();
    }    
   return $('#table').DataTable({
      ajax: {
        url:(isStudentTable)
          ?'http://localhost:1234/api/estudiantes'
          :'http://localhost:1234/api/padres',
        dataSrc: '',
        deferRender: true,
      },
      language: dtESP(),
      select: 'single', // enable single row selection
      sPaginationType: 'full_numbers',
      columns: (isStudentTable)
          ?columnDefsEst
          :columnDefsPad,
      responsive: true,
      paging: false,
      order: [[1, 'asc']],
      drawCallback:()=>{feather.replace();},
    });

}
  return {
    table:table,
    setupDataTable,
    }
  }