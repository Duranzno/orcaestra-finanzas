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
      console.log("btn fecha")
      const fechaURL = $(this)
        .closest('a')
        .attr(`id`);
      const url = sthis.ajax.url + fechaURL;
      console.log(url)
      sthis.ajax.updateTable2(url);
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
$(document).ready(async function () {
  await Promise.all([
    $.getScript("/public/js/datatables/options.const.js",
      // () => console.log("Constantes Cargadas")
    ),
    $.getScript("/public/js/date.module.js",
      // () => console.log("Cargado DateModule")
    ),
    // $.getScript("/public/js/startup.module.js",
    // () => console.log("Cargado StartupModule")
    // ),
    $.getScript("/public/js/datatables/ajax.js",
      // () => console.log("Cargado Ajax")
    ),
    $.getScript("/public/js/datatables/modal.js",
      // () => console.log("Cargado ModalModule")
    ),
    $.getScript("/public/js/datatables/subrow.js",
      // ( )=> {console.log("Cargado funcion para filas hijos");}
    ),
    $.getScript("/public/js/calendar.module.js",
      // () => console.log("Cargado bootstrap-datepicker ")
    ),
    // $.getScript("/public/js/datatables/datatables.module.js",
    // () => console.log("Cargado datatables.module")
    // ),
  ])
  class Ajax {
    constructor(baseURL, isStudentTable) {
      this.baseURL = baseURL ? baseURL : 'http//localhost:1234/'
      this.urlSet(isStudentTable)
    }
    urlSet(isStudentTable) {
      if (typeof isStudentTable === 'undefined') isStudentTable = true;
      this.url = (isStudentTable) ? `/api/estudiantes/` : `/api/padres/`
    }
    put(d) {
      console.log(d);
      $.ajax({
        type: "PUT",
        url: `${this.url}/${d._id}`,
        data: d,
        dataType: "json",
        success: this.newAjaxSrc()
      });
    }
    putHijo(d) {
      console.log(d);
      $.ajax({
        type: "PUT",
        url: `/api/estudiantes/${d._id}`,
        data: d,
        dataType: "json",
        success: this.newAjaxSrc()
      });
    }
    postHijo(d, p) {
      $.ajax({
        type: "POST",
        url: `${this.url}/${d._id}/hijo`,
        data: p,
        dataType: "json",
        success: this.newAjaxSrc()
      });
    }
    deleteHijo(d) {
      $.ajax({
        type: 'DELETE',
        url: `/api/estudiantes/${d._id}`,
        dataType: 'json',
        success: this.newAjaxSrc()
      })
      this.newAjaxSrc().then(() => { console.log('updated table') }).catch((e) => { console.error() })
    }
    post(d) {
      $.ajax({
        type: "POST",
        url: `${this.url}/${d._id}`,
        data: d,
        dataType: "json",
        success: this.newAjaxSrc()
      });
    }
    delete(d) {
      $.ajax({
        type: 'DELETE',
        url: `${this.url}/${d._id}`,
        dataType: 'json',
        success: this.newAjaxSrc()
      })
      this.newAjaxSrc().then(() => { console.log('updated table') }).catch((e) => { console.error() })
    }

    postPago(d, p) {
      $.ajax({
        type: "POST",
        url: `${this.url}/${d._id}/pago`,
        data: p,
        dataType: "json",
        success: this.newAjaxSrc()
      });
    }
    putPago(p) {
      console.log(p)
      $.ajax({
        type: "PUT",
        url: `api/pagos/${p._id}`,
        data: p,
        dataType: "json",
        success: this.newAjaxSrc()
      });
    }
    deletePago(d, p) {
      $.ajax({
        type: "DELETE",
        url: `${this.url}/${d._id}/pago/${p._id}`,
        data: p,
        dataType: "json",
        success: this.newAjaxSrc()
      });
    }
    uploadExcel(file_data, url) {
      let data = new FormData();
      data.append('planilla', file_data);
      const excelThis = this;
      $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: url,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000000,
        success: function (data) {
          console.log('uploadExcel| SUCCESS : ', data);
          excelThis.newAjaxSrc();
        },
        error: function (e) {
          console.log('uploadExcel| ERROR : ', e);
        },
      });

    }

    async newAjaxSrc(newUrl) {
      let dt = $('#table').DataTable({ "retrieve": true });
      // await dt.ajax.url((typeof url==="undefined")?newUrl:this.url);
      console.log('newAjaxSrc');
      await dt.ajax.url(this.url).load();
      await dt.clear().draw();
      //FIXME al eliminar un estudiante/representante no se actualiza la tabla
      //TODO algo mas
      // await dt.ajax.url(this.url).load();
    }
    async updateTable2(url) {
      Ajax.updateTable(url);
    }
    static async updateTable(url) {
      try {
        let dt = $('#table').DataTable({ "retrieve": true });
        await dt.ajax.url(url);
        await dt.ajax.reload();
        console.log('updateTable')

      }
      catch (e) { console.error(e) }
    }

  }
  class StartupModule {

    constructor(ajax, fecha) {
      this.ajax = ajax;
      this.file_data = undefined;
      this.fecha = fecha;
      this.setupSideBar();
      this.setupClickEvents();
      this.pbuttons();
    }
    pbuttons() {
      $('#p-btn-pagos').on('click', function () { });
      $('#p-btn-hijos').on('click', function () { });
    }
    setupSideBar() {
      const startupInstance = this
      $('li.mes').append(() => {
        $('.mes-actual')
          .closest('a')
          .attr('id', this.fecha.getAnoMesURL(new Date()));
        let meses = this.fecha.arrayMeses(new Date());
        let li = '';
        meses.reverse().forEach(function (mes) {
          li += startupInstance.addNewMonthRow(mes);
        });
        return li;
      });
    }

    addNewMonthRow(date) {
      return `
      <a class="nav-link btn-fecha"
        id="${this.fecha.getAnoMesURL(date)}" href="#" >
        <span data-feather="file-text"></span>
        ${this.fecha.getMesAno(date)}
      </a>  `;
    }
    setupClickEvents() {
      $('#agregarEstudianteNuevo').on('click', function () {
        this.ajax = ajax.urlSet('e');
        let student = {
          nombre: $('#nombre').val(),
          apellido: $('#apellido').val(),
          grupo: $('#proyecto').val(),
          tlf: $('#tlf').val(),
          email: $('#correo').val(),
          pagos: [{
            banco: $('#banco').val(),
            referencia: $('#referencia').val(),
            monto: $('#monto').val(),
            fecha: $('#fecha').val(),
          }]
        };
        this.ajax.post(student)
      });
      $('#agregarPadreNuevo').on('click', function () {
        this.ajax = ajax.urlSet('p');
        let padre = {
          nombre: $('#nombre-p').val(),
          apellido: $('#apellido-p').val(),
          tlf: $('#tlf-p').val(),
          email: $('#correo-p').val(),
          pagos: [{
            banco: $('#banco').val(),
            referencia: $('#referencia').val(),
            monto: $('#monto').val(),
            fecha: $('#fecha').val(),
          }]
        };
        this.ajax.post(padre)
      });
      $('#importarPaola').on('click', function () {
        $('#inputP').trigger('click');
      });
      let ajax = this.ajax
      $('#inputP').change(function () {
        const file_data = $('#inputP').prop('files')[0];
        ajax.uploadExcel(file_data, '/uploadPaola');
      });
    }
  }





  // Constantes
  let updateTable = async function (isStudentTable, isPagoTables) {
    $('#dashboard').text((isStudentTable) ? 'Estudiantes' : 'Representantes');
    if (isStudentTable) {
      $('#btn-collapse-p').hide(); $('#btn-collapse-e').show();
      $('#collapsePadre').collapse('hide');
      $('#p-btn-pagos').click();
      $('#p-btn-group').hide();

      $('#estudiantesLink').addClass('active')
      $('#padresLink').removeClass('active')
      subrow.pagoTable();
    }
    else {
      $('#btn-collapse-e').hide(); $('#btn-collapse-p').show();
      $('#collapseEstudiante').collapse('hide');
      $('#p-btn-group').show();
      // if (isPagoTables) { $('#p-btn-representados').click(); }
      // else { $('#p-btn-pagos').click(); }
      $('#estudiantesLink').removeClass('active')
      $('#padresLink').addClass('active')
    }

    ajax.urlSet(isStudentTable);
    modal.ajaxSet(ajax, isStudentTable);
    await datatableModule.setupDataTable(isStudentTable, ajax)
    //  console.log("Tipo de Tabla Cambiado Exitosamente a " + $('#dashboard').text())
  }
  let ajax = new Ajax('http//localhost:1234/api', true);
  CalendarModule();
  const date = new DateModule();
  new StartupModule(ajax, date);
  let datatableModule = await new DatatablesModule(date, true, ajax);
  let modal = new Modal(ajax, Constants, true);
  let subrow = new Subrow(true)
  await updateTable(false);
  feather.replace();


  $('#p-btn-hijos').on('click', function () { subrow.hijoTable(); modal.hijoTable(); })
  $('#p-btn-pagos').on('click', function () { subrow.pagoTable(); modal.pagoTable(); })

  $('#estudiantesLink').on('click', function () { updateTable(true); });
  $('#padresLink').on('click', function () { updateTable(false); });
});


