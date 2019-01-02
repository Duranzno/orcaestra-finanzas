
$(document).ready(async function () {


  await Promise.all([
    $.getScript("/public/js/datatables/options.const.js",
      () => console.log("Constantes Cargadas")
    ),
    $.getScript("/public/js/date.module.js",
      () => console.log("Cargado DateModule")
    ),
    $.getScript("/public/js/startup.module.js",
      () => console.log("Cargado StartupModule")
    ),
    $.getScript("/public/js/datatables/ajax.js",
      () => console.log("Cargado Ajax")
    ),
    $.getScript("/public/js/datatables/modal.js",
      () => console.log("Cargado ModalModule")
    ),
    // $.getScript( "/public/js/datatables/subrow.js", 
    // ( )=> {console.log("Cargado funcion para filas hijos");}
    // )
    $.getScript("/public/js/calendar.module.js",
      () => console.log("Cargado bootstrap-datepicker ")
    ),
    $.getScript("/public/js/datatables/datatables.module.js",
      () => console.log("Cargado datatables.module")
    ),
  ])
  // Constantes
  let ajax = new Ajax('http//localhost:1234/api', true);
  CalendarModule();
  const date = new DateModule();
  new StartupModule(ajax, date);
  let datatableModule = await new DatatablesModule(date, true, ajax);
  updateTable(true);
  let modal = ModalFunction().constructor(true, ajax, Constants);
  feather.replace();


  function updateTable(val) {
    $('#dashboard').text((val) ? 'Estudiantes' : 'Representantes');
    if (val) {
      $('#btn-collapse-p').hide(); $('#btn-collapse-e').show();
      $('#collapsePadre').collapse('hide');
    }
    else {
      $('#btn-collapse-e').hide(); $('#btn-collapse-p').show();
      $('#collapseEstudiante').collapse('hide');
    }
    datatableModule.setupDataTable(val).then(() => { console.log("Tipo de Tabla Cambiado Exitosamente a " + $('#dashboard').text()) });
  }
  $('#estudiantesLink').on('click', function () { updateTable(true); });
  $('#padresLink').on('click', function () { updateTable(false); });
});


