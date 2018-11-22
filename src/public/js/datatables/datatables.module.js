(async function() {
  await Promise.all([  
    $.getScript( "/public/js/datatables/options.const.js",()=>console.log("cargado options.c")),
    $.getScript( "/public/js/datatables/modal.js", 
      ( )=> console.log("Cargado modal.js")),
    $.getScript( "/public/js/datatables/subrow.js", 
      ( )=> console.log("Cargado funcion para filas hijos")),
    ]);
  console.log("Cargados scripts dentro de datatables.module");
})()

function DatatablesModule(fecha) {
  // Se configura la variable table que es god object en DataTables.net
  let table= $('#table').DataTable({
      ajax: {
        url: website + '/api/estudiantes',
        dataSrc: '',
        deferRender: true,
      },
      language: dtESP,
      select: 'single', // enable single row selection
      sPaginationType: 'full_numbers',
      columns: columnDefsEst,
      responsive: true,
      paging: false,
      order: [[1, 'asc']],
      drawCallback:()=>{feather.replace();},
    });
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
  subRow(table);

  return {
    table:table,
    }
  }