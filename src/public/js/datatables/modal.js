function ModalFunction() {
  let dt, isStudentTable, ajax, grupos, bancos;
  function constructor(isStudentTable, ajax, constantes) {
    grupos = Constants.grupos();
    bancos = Constants.bancos();
    dt = $('#table').DataTable({ 'retrieve': true });
    isStudentTable = (isStudentTable === undefined) ? true : isStudentTable;
    ajax = ajax
    setupModal();
    setupClickers();
  }
  function setupClickers() {
    console.log()
    //Click setters
    //EDITAR ESTUDIANTE/PADRE
    $('#table').on('click', 'button.btn.btn-edit', function () {
      let rowIndex = $(this).data('row');
      let data = {
        ...(dt.row(rowIndex).data()),
        rowIndex: rowIndex
      };
      $('#estudianteModal').val(data);
      $('#estudianteModal').modal('show');
      $(`.btn-modal-save-student`).on(`click`, function () {
        let modal = $('#estudianteModal')
        let e = findEstudianteModal(modal)
        $('#estudianteModal').modal('toggle');
        ajax.put(e)
        $(this).off();
      });
    })

    //DELETE ESTUDIANTE
    $('#table').on('click', 'button.btn.btn-delete', function () {
      let rowIndex = $(this).data('row');
      let data = {
        ...(dt.row(rowIndex).data()),
        rowIndex: rowIndex
      };
      $('#deleteModal').val(data);
      $('#deleteModal').modal('show');
      $(`.btn-delete-modal`).on(`click`, function () {
        let d = $('#deleteModal').val();
        $('#deleteModal').modal('toggle');
        ajax.delete(d)
        $(this).off();
      });
    })

    //AÑÁDIR PAGO
    $('#table').on('click', 'button.btn.btn-add-pago', function () {
      const modal = $('#pagoModal');
      const rowIndex = $(this).data('row');
      const d = dt.row(rowIndex).data();
      let data = {
        apellido: (d.apellido),
        nombre: (d.nombre),
        _id: d._id, rowIndex: rowIndex
      };

      modal.val(data);
      modal.modal('show');
      $(`.btn-modal-save-pago`).on(`click`, function () {
        console.log('btn-modal-save-pago AGREGARPAGO')
        let p = findPagoModal(modal);
        let d = { _id: modal.val()._id };
        ajax.postPago(d, p)
        console.log(d)
        console.log(p)
        $(this).off();
        modal.modal('toggle');
      });
    });

    //EDITAR PAGO
    $('#table').on('click', 'button.btn.btn-edit-pago', function () {
      const data = (dt.row($(this).data('row')).data())
      const p = {
        ...data.pagos.find(pago => pago._id === $(this).data('pagoid')),
        nombre: data.nombre,
        apellido: data.apellido
      };
      const modal = $('#pagoModal');

      $('#pagoModal').val(p);

      $('#pagoModal').modal('show');
      $(`.btn-modal-save-pago`).on(`click`, function () {
        let p = findPagoModal(modal);
        console.log('btn-modal-save-pago EDITARPAGO', p)
        ajax.putPago(p)
        $(this).off();
        modal.modal('toggle');
      });
    });
    //DELETE PAGO
    $('#table').on('click', 'button.btn.btn-delete-pago', function () {
      const deleteModal = $('#deleteModal');
      let rowIndex = $(this).data('row');
      let data = (dt.row(rowIndex).data());
      p = { _id: $(this).data('pagoid') }
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
  };
  function setupModal() {
    //show.bs.modal
    $(`#estudianteModal`).on(`show.bs.modal`, function (event) {
      const modal = $(this);
      const e = modal.val();
      console.log(e)
      findEstudianteModal(modal, e);
    });
    $(`#deleteModal`).on(`show.bs.modal`, function (event) {
      const modal = $(this);
      const d = modal.val();
      // let text=(typeof d.nombre!==undefined)?`a ${d.nombre} ${d.apellido}?`:'el pago?'
      modal.find(`.modal-title`).text(`¿Seguro que desea eliminar esto?`);
    });
    $(`#pagoModal`).on(`show.bs.modal`, function (event) {
      const modal = $(this);
      const d = modal.val();
      console.log('#pagoModal');
      console.log(d);
      findPagoModal(modal, d);
    });
  };
  function findPadreModal(modal, p) {
    if (typeof p === 'undefined') {
      return {
        nombre: modal.find(`.modal-body #nombre`).val(),
        apellido: modal.find(`.modal-body #apellido`).val(),
        tlf: modal.find(`.modal-body #tlf`).val(),
        email: modal.find(`.modal-body #correo`).val(),
        _id: modal.val()._id,
      }
    }
    else {
      modal.find(`.modal-title`).text(`Cambiar datos de ` + p.nombre);
      modal.find(`.modal-body #nombre`).val(p.nombre);
      modal.find(`.modal-body #apellido`).val(p.apellido);
      modal.find(`.modal-body #tlf`).val(p.tlf);
      modal.find(`.modal-body #correo`).val(p.email);
    }
  }
  function findEstudianteModal(modal, e) {
    if (typeof e === 'undefined') {
      return {
        nombre: modal.find(`.modal-body #nombre`).val(),
        apellido: modal.find(`.modal-body #apellido`).val(),
        grupo: grupos[modal.find(`.modal-body #grupo`).val()],
        tlf: modal.find(`.modal-body #tlf`).val(),
        email: modal.find(`.modal-body #correo`).val(),
        _id: modal.val()._id,
      }
    }
    else {
      modal.find(`.modal-title`).text(`Cambiar datos de ` + e.nombre);
      modal.find(`.modal-body #nombre`).val(e.nombre);
      modal.find(`.modal-body #apellido`).val(e.apellido);
      modal.find(`.modal-body #grupo`).val(grupos.indexOf(e.grupo));
      modal.find(`.modal-body #tlf`).val(e.tlf);
      modal.find(`.modal-body #correo`).val(e.email);
    }
  }
  function findPagoModal(modal, p) {
    if (typeof p === 'undefined') {
      console.log('WRITE PAGOS');
      return {
        banco: bancos[modal.find(`.modal-body #banco`).val()],
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
      console.log(bancos)
      modal.find(`.modal-body #banco`).val(bancos.indexOf(p.banco));
      modal.find(`.modal-body #monto`).val(p.monto);
      modal.find(`.modal-body #referencia`).val(p.referencia);
      modal.find(`.modal-body #date`).val(p.date);
    }
  }

  return {
    constructor: constructor,
  }
}



