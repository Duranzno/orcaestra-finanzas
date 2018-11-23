let ajax;
let dt=$('#table').DataTable({"retrieve": true});

(async function() {
  await $.getScript( "/public/js/datatables/ajax.js");
  console.log("Cargados scripts dentro de modals.module");
  ajax=new Ajax();
})()
//EDITAR ESTUDIANTE
$('#table').on('click','button.btn.btn-edit',function(){
  let rowIndex=$(this).data('row');
  let data=(dt.row(rowIndex).data());
  $("#estudianteModal").val( data);
  $('#estudianteModal').modal('show');
})
$(`.btn-modal-save-student`).on(`click`, function() {
    let modal=$('#estudianteModal')
    let e= findEstudianteModal(modal)
    console.log(e);
    $('#estudianteModal').modal('toggle');
    ajax.put(e)
});
$(`#estudianteModal`).on(`show.bs.modal`, function(event) {
  const modal=$(this);
  const e=modal.val();
  findEstudianteModal(modal,e);    
});
//DELETE ESTUDIANTE
$('#table').on('click','button.btn.btn-delete',function(){
  let rowIndex=$(this).data('row');
  let data=(dt.row(rowIndex).data());
  $("#deleteModal").val( data);
  $('#deleteModal').modal('show');
})
$(`#deleteModal`).on(`show.bs.modal`, function(event) {
  const modal=$(this);
  const e=modal.val();
  modal.find(`.modal-title`).text(`Eliminar ` + e.nombre);
});
// $(`.btn-delete-modal`).on(`click`, function() {
//   let d=$('#deleteModal').val();
//   console.log(d);
//   $('#deleteModal').modal('toggle');
//   ajax.delete(d)
// });

//AÑÁDIR PAGO
$('#table').on('click','button.btn.btn-add-pago',function(){
  let rowIndex=$(this).data('row');
  let data=(dt.row(rowIndex).data());
  $("#pagoModal").val(data);
  $('#pagoModal').modal('show');
});
$(`#pagoModal`).on(`show.bs.modal`, function(event) {
  const modal=$(this);
  const e=modal.val();
  modal.find(`.modal-title`).text(`Agregar Pago nuevo para ` + e.nombre);
  findPagoModal(modal,{});    
  });

$(`.btn-modal-save-pago`).on(`click`, function() {
  let p= findPagoModal($('#pagoModal'))
  let d= {_id:$('#pagoModal').val()._id};
  console.log('findpagoModal',JSON.stringify(p));
  console.log('val',JSON.stringify(d));
  $('#pagoModal').modal('toggle');
  ajax.postPago(d,p)
  $(this).off();
});

//EDITAR PAGO
$('#table').on('click','button.btn.btn-edit-pago',function(){
  let rowIndex=$(this).data('row');
  let data=(dt.row(rowIndex).data());
  p={_id:$(this).data('pagoid')}
  $("#pagoModal").val(data);
  $('#pagoModal').modal('show');
});
//DELETE PAGO
$('#table').on('click','button.btn.btn-delete-pago',function(){
  const deleteModal = $("#deleteModal");
  let rowIndex=$(this).data('row');
  let data=(dt.row(rowIndex).data());
  p={_id:$(this).data('pagoid')}
  deleteModal.on(`show.bs.modal`, function() {
    $(this).find(`.modal-title`).text(`¿Seguro que desea eliminar el pago?`);
    $(this).off();
  }); 
  deleteModal.val(data);
  deleteModal.modal('show');
  $(`.btn-delete-modal`).on(`click`, function() {
    const d={_id:deleteModal.val()._id};
    const p={_id:$('.btn-delete-pago').data('pagoid')};
    deleteModal.modal('toggle');
    ajax.deletePago(d,p)
    $(this).off();
  });
});

function findPadreModal(modal,p){
  if(typeof p==='undefined'){
    return {
        nombre: modal.find(`.modal-body #nombre`).val(),
        apellido: modal.find(`.modal-body #apellido`).val(),
        tlf: modal.find(`.modal-body #tlf`).val(),
        email: modal.find(`.modal-body #correo`).val(),
        _id:modal.val()._id,
      }
  }
  else{
    modal.find(`.modal-title`).text(`Cambiar datos de ` + p.nombre);
    modal.find(`.modal-body #nombre`).val(p.nombre);
    modal.find(`.modal-body #apellido`).val(p.apellido);
    modal.find(`.modal-body #tlf`).val(p.tlf);
    modal.find(`.modal-body #correo`).val(p.email);
  }
}
function findEstudianteModal(modal,e){
  if(typeof e==='undefined'){
    return {
        nombre: modal.find(`.modal-body #nombre`).val(),
        apellido: modal.find(`.modal-body #apellido`).val(),
        grupo: grupos[modal.find(`.modal-body #grupo`).val()],
        tlf: modal.find(`.modal-body #tlf`).val(),
        email: modal.find(`.modal-body #correo`).val(),
        _id:modal.val()._id,
      }
  }
  else{
    modal.find(`.modal-title`).text(`Cambiar datos de ` + e.nombre);
    modal.find(`.modal-body #nombre`).val(e.nombre);
    modal.find(`.modal-body #apellido`).val(e.apellido);
    modal.find(`.modal-body #grupo`).val(grupos.indexOf(e.grupo));
    modal.find(`.modal-body #tlf`).val(e.tlf);
    modal.find(`.modal-body #correo`).val(e.email);
  }
}
function findPagoModal(modal,p){
  if(typeof p==='undefined'){
    return {
        banco: modal.find(`.modal-body #banco`).val(),
        monto: modal.find(`.modal-body #monto`).val(),
        referencia: modal.find(`.modal-body #referencia`).val(),
        date: modal.find(`.modal-body #date`).val(),
        _id:modal.val()._id,
      }
  }
  else{
    // modal.find(`.modal-title`).text(`Cambiar datos del Pago` + p.referencia);
    modal.find(`.modal-body #banco`).val(p.banco);
    modal.find(`.modal-body #monto`).val(p.monto);
    modal.find(`.modal-body #referencia`).val(p.referencia);
    modal.find(`.modal-body #date`).val(p.date);
  }
} 
