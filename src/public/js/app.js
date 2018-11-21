$(document).ready(async function() {
  await Promise.all([
      $.getScript( "/public/js/date.module.js", ( )=> console.log("Cargado date.module")),
      $.getScript( "/public/js/datatables.module.js", ( )=> console.log("Cargado datatables.module")),
      $.getScript( "/public/js/calendar.module.js", ( )=> console.log("Cargado calendar.module")),
      $.getScript( "/public/js/startup.module.js", ( )=> console.log("Cargado startup.module")),
    ])
  let fecha = DateModule();
  const dt = DatatablesModule(fecha);

  dt.setupDT();
  dt.setupEvents();
  (CalendarModule()).configCalendar();

  setupClickEvents();
  setupSideBar(fecha);
  feather.replace();
});




