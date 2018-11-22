$(document).ready(async function() {
  await Promise.all([
      $.getScript( "/public/js/date.module.js", 
        ( )=> console.log("Cargado date.module")),
      $.getScript( "/public/js/datatables/datatables.module.js", 
        ( )=> console.log("Cargado datatables.module")),
      $.getScript( "/public/js/calendar.module.js", 
        ( )=> console.log("Cargado calendar.module")),
      $.getScript( "/public/js/startup.module.js",
        ( )=> console.log("Cargado startup.module")),
    ])
  let fecha = DateModule();
  const dt = DatatablesModule(fecha);

  (CalendarModule()).configCalendar();

  setupClickEvents();
  setupSideBar(fecha);
  feather.replace();
});


  // $('#table').on('click','button.btn.btn-edit',function(){
  //   let rowIndex=$(this).data('row');
  //   let data=(dt.table.row(rowIndex).data());
    
  // });


