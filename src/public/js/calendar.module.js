
class CalendarModule {
    constructor(){
    this.form = $(`.bootstrap-iso form`);
    this.date_input = $(`input[name="date"]`); //our date input has the name "date"
    this.container = this.form.length > 0 ? this.form.parent() : 'body';
    this.options = {
      format: `mm/dd/yyyy`,
      container: this.container,
      todayHighlight: true,
      autoclose: true,
      todayBtn: true,
    };
    console.log("CALENDAR MODULE ON")
    this.configCalendar();
    }
  
    getCurrentDate() {
      const today_date = new Date();
      return (
        (today_date.getMonth() < 9 ? '0' : '') +
        String(today_date.getMonth() + 1) +
        '-' +
        (today_date.getDate() < 10 ? '0' : '') +
        String(today_date.getDate()) +
        '-' +
        today_date.getFullYear()
      );
    }
  
    configCalendar() {
      this.date_input.datepicker();
      // $('#date').val(this.getCurrentDate());
    }
} 