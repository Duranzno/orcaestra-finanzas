function CalendarModule(){
  $.fn.datepicker.dates['es'] = {
    days: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sanado"],
    daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"],
    today: "Hoy",
    clear: "Limpiar",
    format: "mm/dd/yyyy",
    titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
    weekStart: 0
  };

  let form = $(`.bootstrap-iso form`);
  let container = form.length > 0 ? form.parent() : 'body';
  $('#date').val(getCurrentDate());
  $('input[name="date"]').datepicker({
     format: "dd/mm/yyyy",
     container: container,
     todayHighlight: true,
     todayBtn: "linked",
     autoclose: true,
     language: "es"
  });
 function getCurrentDate() {
    const today_date = new Date();
    return (
      (today_date.getMonth() < 9 ? '0' : '') +
      String(today_date.getMonth() + 1) +
      '/' +
      (today_date.getDate() < 10 ? '0' : '') +
      String(today_date.getDate()) +
      '/' +
      today_date.getFullYear()
    );
  }
};
