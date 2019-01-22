$(document).ready(async function () {
  await Promise.all([
    $.getScript("/public/js/datatables/options.const.js",
      // () => console.log("Constantes Cargadas")
    ),
    $.getScript("/public/js/date.module.js",
      // () => console.log("Cargado DateModule")
    ),
    $.getScript("/public/js/startup.module.js",
      // () => console.log("Cargado StartupModule")
    ),
    $.getScript("/public/js/datatables/ajax.js",
      // () => console.log("Cargado Ajax")
    ),
    // $.getScript("/public/js/datatables/modal.js",
    // () => console.log("Cargado ModalModule")
    // ),
    // $.getScript("/public/js/datatables/subrow.js",
    // ( )=> {console.log("Cargado funcion para filas hijos");}
    // ),
    $.getScript("/public/js/calendar.module.js",
      // () => console.log("Cargado bootstrap-datepicker ")
    ),
    $.getScript("/public/js/datatables/datatables.module.js",
      // () => console.log("Cargado datatables.module")
    ),
  ])
  class Modal {
    constructor(ajax, constantes, isStudentTable) {
      this.grupos = constantes.grupos();
      this.bancos = constantes.bancos();
      this.ajax = ajax;
      this.dt = $('#table').DataTable({ 'retrieve': true });
      this.isStudentTable = (isStudentTable === undefined) ? true : isStudentTable;
      this.isPagoTable = true;
      this.setupModal();
      this.setupClickers();
    }
    pagoTable() { this.isPagoTable = true }
    hijoTable() { this.isPagoTable = false }
    ajaxSet(newAjax, isStudentTable) {
      this.ajax = newAjax;
      this.dt = $('#table').DataTable({ 'retrieve': true });
      if (!(isStudentTable === undefined)) { this.isStudentTable = isStudentTable }
    }
    setupClickers() {
      let m = this;
      //EDITAR ESTUDIANTE/PADRE
      $('#table').on('click', 'button.btn.btn-edit', function () {
        m.dt = $('#table').DataTable({ 'retrieve': true });
        let rowIndex = $(this).data('row');
        let val = {
          ...(m.dt.row(rowIndex).data()),
          rowIndex: rowIndex
        }
        if (m.isStudentTable) {
          console.log('student table modal')
          $('#estudianteModal').val(val);
          $('#estudianteModal').modal('show');
          $(`.btn-modal-save-student`).on(`click`, function () {
            let modal = $('#estudianteModal')
            let e = m.findEstudianteModal(modal)
            $('#estudianteModal').modal('toggle');
            m.ajax.put(e)
            $(this).off();
          });
        } else {

          console.log('padre table modal')
          $('#padreModal').val(val);
          $('#padreModal').modal('show');
          $(`.btn-modal-save-padre`).on(`click`, function () {
            let modal = $('#padreModal')
            let p = m.findPadreModal(modal)
            $('#padreModal').modal('toggle');
            m.ajax.put(p)
            $(this).off();
          });
        }
      });

      //DELETE ESTUDIANTE
      $('#table').on('click', 'button.btn.btn-delete', function () {
        m.dt = $('#table').DataTable({ 'retrieve': true });
        let rowIndex = $(this).data('row');
        let data = {
          ...(m.dt.row(rowIndex).data()),
          rowIndex: rowIndex
        };
        $('#deleteModal').val(data);
        $('#deleteModal').modal('show');
        $(`.btn-delete-modal`).on(`click`, function () {
          let d = $('#deleteModal').val();
          $('#deleteModal').modal('toggle');
          m.ajax.delete(d)
          $(this).off();
        });
      })

      //AÑÁDIR PAGO/HIJO
      $('#table').on('click', 'button.btn.btn-add', function () {
        m.dt = $('#table').DataTable({ 'retrieve': true });
        const rowIndex = $(this).data('row');
        const d = m.dt.row(rowIndex).data();
        let modal;
        if (m.isStudentTable || m.isPagoTable) {
          modal = $('#pagoModal');
          console.log('Anadir Pago', JSON.stringify(d))
          modal.val({
            apellido: (d.apellido),
            nombre: (d.nombre),
            _id: d._id,
            rowIndex: rowIndex
          });
          $(`.btn-modal-save-pago`).on(`click`, function () {
            console.log('btn-modal-save-pago AGREGARPAGO')
            let p = m.findPagoModal(modal);
            let d = { _id: modal.val()._id };
            m.ajax.postPago(d, p)
            console.log(d)
            console.log(p)
            $(this).off();
            modal.modal('toggle');
          });
          modal.modal('show');
        }
        else {
          modal = $('#estudianteModal');
          modal.val({
            papellido: (d.apellido),
            pnombre: (d.nombre),
            _id: d._id,
            rowIndex: rowIndex
          });
          $(`.btn-modal-save-student`).on(`click`, function () {
            let p = m.findEstudianteModal(modal);
            let d = { _id: modal.val()._id };
            m.ajax.postHijo(d, p)
            console.log(d)
            console.log(p)
            $(this).off();
            modal.modal('toggle');
          });
          modal.modal('show');

        }

      });

      //EDIT HIJO
      $('#table').on('click', 'button.btn.btn-edit-hijo', function () {
        console.log('fucl')
        m.dt = $('#table').DataTable({ 'retrieve': true });
        let row = $(this).data('row');
        const pdata = (m.dt.row($(this).data('row')).data())
        const p = {
          ...pdata.hijos.find(hijo => hijo._id === $(this).data('hijoid')),
        };
        console.log(p)
        const modal = $('#estudianteModal');
        modal.val(p);
        modal.modal('show');
        $(`.btn-modal-save-student`).on(`click`, function () {
          let p = m.findEstudianteModal(modal);
          m.ajax.putHijo(p)
          $(this).off();
          modal.modal('toggle');
        });
      });
      //DELETE HIJO
      $('#table').on('click', 'button.btn.btn-delete-hijo', function () {
        m.dt = $('#table').DataTable({ 'retrieve': true });
        const pdata = (m.dt.row($(this).data('row')).data())
        const p = {
          ...pdata.hijos.find(hijo => hijo._id === $(this).data('hijoid')),
        };
        console.log(p)
        $('#deleteModal').val(p);
        $('#deleteModal').modal('show');
        $(`.btn-delete-modal`).on(`click`, function () {
          let d = $('#deleteModal').val();
          $('#deleteModal').modal('toggle');
          m.ajax.deleteHijo(d)
          $(this).off();
        });
      })
      //EDITAR PAGO
      $('#table').on('click', 'button.btn.btn-edit-pago', function () {
        m.dt = $('#table').DataTable({ 'retrieve': true });
        const row = $(this).data('row');
        const data = (m.dt.row(row).data())
        console.log(data)
        console.log($(this).data('pagoid'))
        const p = {
          ...data.pagos.find(pago => pago._id === $(this).data('pagoid')),
          nombre: data.nombre,
          apellido: data.apellido
        };
        console.log(p)
        const modal = $('#pagoModal');

        $('#pagoModal').val(p);

        $('#pagoModal').modal('show');
        $(`.btn-modal-save-pago`).on(`click`, function () {
          let p = m.findPagoModal(modal);
          console.log('btn-modal-save-pago EDITARPAGO', p)
          m.ajax.putPago(p)
          $(this).off();
          modal.modal('toggle');
        });
      });
      //DELETE PAGO
      $('#table').on('click', 'button.btn.btn-delete-pago', function () {
        m.dt = $('#table').DataTable({ 'retrieve': true });
        const deleteModal = $('#deleteModal');
        const rowIndex = $(this).data('row');
        let data = (m.dt.row(rowIndex).data());
        let p = { _id: $(this).data('pagoid') }
        deleteModal.on(`show.bs.modal`, function () {
          $(this).find(`.modal-title`).text(`¿Seguro que desea eliminar el pago?`);
          $(this).off();
        });
        deleteModal.val(data);
        deleteModal.modal('show');
        $(`.btn-delete-modal`).on(`click`, function () {
          const d = { _id: deleteModal.val()._id };
          const p = { _id: $('.btn-delete-pago').data('pagoid') };
          deleteModal.modal('toggle');
          ajax.deletePago(d, p)
          $(this).off();
        });
      });
    }
    setupModal() {
      const m = this;
      $(`#estudianteModal`).on(`show.bs.modal`, function () {
        const modal = $(this);
        const e = modal.val();
        m.findEstudianteModal(modal, e);
      });
      $(`#padreModal`).on(`show.bs.modal`, function () {
        const modal = $(this);
        const p = modal.val();
        m.findPadreModal(modal, p);
      });
      $(`#pagoModal`).on(`show.bs.modal`, function () {
        const modal = $(this);
        const d = modal.val();
        console.log('#pagoModal');
        console.log(d);
        m.findPagoModal(modal, d);
      });
      $(`#deleteModal`).on(`show.bs.modal`, function () {
        const modal = $(this);
        const d = modal.val();
        let text = (typeof d.nombre !== undefined) ? `a ${d.nombre} ${d.apellido}` : 'el pago'
        modal.find(`.modal-title`).text(`¿Seguro que desea eliminar ${text}?`);
      });
    }
    findPadreModal(modal, p) {
      if (typeof p === 'undefined') {
        return {
          nombre: modal.find(`.modal-body #p-nombre`).val(),
          apellido: modal.find(`.modal-body #p-apellido`).val(),
          tlf: modal.find(`.modal-body #p-tlf`).val(),
          email: modal.find(`.modal-body #p-correo`).val(),
          _id: modal.val()._id,
        }
      }
      else {
        modal.find(`.modal-title`).text(`Cambiar datos de ` + p.nombre);
        modal.find(`.modal-body #p-nombre`).val(p.nombre);
        modal.find(`.modal-body #p-apellido`).val(p.apellido);
        modal.find(`.modal-body #p-tlf`).val(p.tlf);
        modal.find(`.modal-body #p-correo`).val(p.email);
      }
    }
    findEstudianteModal(modal, e) {
      if (typeof e === 'undefined') {
        return {
          nombre: modal.find(`.modal-body #nombre`).val(),
          apellido: modal.find(`.modal-body #apellido`).val(),
          grupo: this.grupos[modal.find(`.modal-body #grupo`).val()],
          tlf: modal.find(`.modal-body #tlf`).val(),
          email: modal.find(`.modal-body #correo`).val(),
          _id: modal.val()._id,
        }
      }
      else if (typeof e.pnombre !== 'undefined') {
        modal.find(`.modal-title`).text(`Agregar hijo de ${e.pnombre} ${e.papellido}`);
      }
      else {
        modal.find(`.modal-title`).text(`Cambiar datos de ` + e.nombre);
        modal.find(`.modal-body #nombre`).val(e.nombre);
        modal.find(`.modal-body #apellido`).val(e.apellido);
        modal.find(`.modal-body #grupo`).val(this.grupos.indexOf(e.grupo));
        modal.find(`.modal-body #tlf`).val(e.tlf);
        modal.find(`.modal-body #correo`).val(e.email);
      }
    }
    findPagoModal(modal, p) {
      if (typeof p === 'undefined') {
        console.log('WRITE PAGOS');
        return {
          banco: this.bancos[modal.find(`.modal-body #banco`).val()],
          monto: modal.find(`.modal-body #monto`).val(),
          referencia: modal.find(`.modal-body #referencia`).val(),
          date: modal.find(`.modal-body #date`).val(),
          _id: modal.val()._id,
        }
      }
      else {

        let titulo = (typeof p.banco === "undefined")
          ? `Agregar pago nuevo para ${p.nombre} ${p.apellido}`
          : `Cambiar datos del pago de referencia ${p.referencia} del banco ${p.banco}`;
        modal.find(`.modal-title`).text(titulo);
        console.log(this.bancos)
        modal.find(`.modal-body #banco`).val(this.bancos.indexOf(p.banco));
        modal.find(`.modal-body #monto`).val(p.monto);
        modal.find(`.modal-body #referencia`).val(p.referencia);
        modal.find(`.modal-body #date`).val(p.date);
      }
    }
  }
  class Subrow {
    constructor(isPagoTable) {
      this.isPagoTable = isPagoTable;
      let sthis = this;
      $('#table').on('click', 'td.details-control', this.drawer(sthis));
    }
    pagoTable() {
      this.isPagoTable = true;
      this.drawer(this);
      $('.shown .details-control').click()
    }
    hijoTable() {
      this.isPagoTable = false;
      this.drawer(this);
      $('.shown .details-control').click()
    }

    drawer(sthis) {
      return function () {
        let table = $('#table').DataTable({ "retrieve": true });
        let html;
        let tr = $(this).closest('tr');
        let filas = table.row(tr);
        let data = {
          ...($('#table').DataTable({ "retrieve": true }).row(tr).data()), PadreRow: tr[0]._DT_RowIndex
        };
        if (filas.child.isShown()) {
          //Los pagos del estudiante estan mostrados, se van a ocultar
          filas.child.hide();
          tr.removeClass('shown');
        }
        else {
          if (sthis.isPagoTable) {
            console.log(sthis.isPagoTable);
            html = sthis.htmlFila(data, sthis.htmlPagoTitulo, sthis.htmlPagoHijos /*ó hijo.titulo, hijo.hijo*/);
          }
          else {
            html = sthis.htmlFila(data, sthis.htmlHijoTitulo, sthis.htmlHijoHijos /*ó hijo.titulo, hijo.hijo*/);

          }
          filas.child(html).show();
          tr.addClass('shown');
          feather.replace();
        }
      };
    }

    htmlFila(d, titulo, hijo) {
      return `
        <table class="table table-striped">
            ${titulo()}
            ${hijo(d)}
        </table>`;
      // ${htmlPagoTitulo()}
      // ${htmlPagoHijos(d)}
    }
    htmlPagoTitulo() {
      return `
      <tr><td>Banco</td> <td>Referencia</td> <td>Fecha</td> <td>Monto</td> <td>Opciones</td> </tr>`;
    }

    htmlPagoHijos(d) {
      let fecha = new DateModule();
      let html = '';
      for (let i = 0; i < d.pagos.length; i++) {
        html += `
          <tr> 
            <td>${d.pagos[i].banco}</td> 
            <td>${d.pagos[i].referencia}</td> 
            <td>${fecha.getFecha(d.pagos[i].fecha)}</td>
            <td>${d.pagos[i].monto}</td> 
            <td>
               <button type="button" data-pagoId="${d.pagos[i]._id}"  data-row='${d.PadreRow}'
                  class="btn btn-edit-pago btn-outline-dark btn-sm">
                <span data-feather="edit-2"></span> 
              </button>
              <button type="button" data-pagoId="${d.pagos[i]._id}" data-row='${d.PadreRow}'
                  class="btn btn-delete-pago btn-outline-dark btn-sm">
                <span data-feather="file-minus"></span> 
              </button>
            </td> 
          </tr>`
      }
      return html;
    }

    htmlHijoTitulo() {
      return `
      <tr><td>Nombre</td> <td>Apellido</td> <td>Grupo</td> <td>Opciones</td> </tr>`;
    }

    htmlHijoHijos(d) {
      let html = '';
      for (let i = 0; i < d.hijos.length; i++) {
        html += `
          <tr> 
            <td>${d.hijos[i].nombre}</td> 
            <td>${d.hijos[i].apellido}</td> 
            <td>${d.hijos[i].grupo}</td> 
            <td>
               <button type="button" data-hijoId="${d.hijos[i]._id}" data-row='${d.PadreRow}'class="btn btn-edit-hijo btn-outline-dark btn-sm">
                <span data-feather="edit-2"></span> 
              </button>
              <button type="button" data-hijoId="${d.hijos[i]._id}" data-row='${d.PadreRow}'class="btn btn-delete-hijo btn-outline-dark btn-sm">
                <span data-feather="file-minus"></span> 
              </button>
            </td> 
          </tr>`
      }
      return html;
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
    await datatableModule.setupDataTable(isStudentTable)
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


