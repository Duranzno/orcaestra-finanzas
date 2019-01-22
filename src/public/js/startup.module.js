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
      id=${this.fecha.getAnoMesURL(date)} href="#" >
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
    $('#inputP').change(function () {
      this.file_data = $('#inputP').prop('files')[0];
      let data = new FormData();
      this.ajax.uploadExcel(data, '/uploadPaola');
      this.file_data = undefined;
    });

    $('#inputM').change(function () {
      this.file_data = $('#inputM').prop('files')[0];
      let data = new FormData();
      this.ajax.uploadExcel(data, '/uploadMarwan')
      this.file_data = undefined;
    });
    $('#importarMarwan').on('click', function () {
      $('#inputM').trigger('click');
    });
  }
}
