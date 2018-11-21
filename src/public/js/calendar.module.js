
function CalendarModule() {
    const dateformat = `mm/dd/yyyy`;
    const form = $(`.bootstrap-iso form`);
    let date_input = $(`input[name="date"]`); //our date input has the name "date"
    let container = form.length > 0 ? form.parent() : 'body';
    let options = {
      format: dateformat,
      container: container,
      todayHighlight: true,
      autoclose: true,
      todayBtn: true,
    };
  
    function getCurrentDate() {
      const today_date = new Date();
      return (
        (today_date.getDate() < 10 ? '0' : '') +
        String(today_date.getDate()) +
        '-' +
        (today_date.getMonth() < 9 ? '0' : '') +
        String(today_date.getMonth() + 1) +
        '-' +
        today_date.getFullYear()
      );
    }
  
    function configCalendar() {
      date_input.datepicker(options);
      $('#date').val(getCurrentDate());
    }
  
    return {
      configCalendar: configCalendar,
    };
  }