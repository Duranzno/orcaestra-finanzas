let ajax;
(async function() {
  await $.getScript( "/public/js/datatables/ajax.js");
  console.log("Cargados scripts dentro de modals.module");
  ajax=new Ajax;
})()
$('#table').on('click','button.btn.btn-edit',function(){
  let dt=$('#table').DataTable({"retrieve": true});
  let rowIndex=$(this).data('row');
  let data=(dt.row(rowIndex).data());
  $("#padreModal").val( data);
  $('#padreModal').modal('show');
})
$('#table').on('click','button.btn.btn-delete',function(){
  let dt=$('#table').DataTable({"retrieve": true});
  let rowIndex=$(this).data('row');
  let data=(dt.row(rowIndex).data());
  ajax.deleteEstudiante(data._id);
  $("#deleteModal").val( data);
  $('#deleteModal').modal('show');
})

$('#table').on('click','button.btn.btn-add-pago',function(){
  let dt=$('#table').DataTable({"retrieve": true});
  let rowIndex=$(this).data('row');
  let data=(dt.row(rowIndex).data());
  $("#pagoModal").val( data);
  $('#pagoModal').modal('show');
  // data-toggle="modal" data-target="#estudianteModal"
})

$(`.btn-modal-save-student`).on(`click`, function() {
    let modal=$('#estudianteModal')
    let e= findEstudianteModal(modal)

    $('#estudianteModal').modal('toggle');
    console.log("Despues de AJAX",e);
});



$(`#estudianteModal`).on(`show.bs.modal`, function(event) {
  const modal=$(this);
  const e=modal.val();
  findEstudianteModal(modal,e);    
});

function findPadreModal(modal,p){
  if(typeof p==='undefined'){
    return {
        nombre: modal.find(`.modal-body #nombre`).val(),
        apellido: modal.find(`.modal-body #apellido`).val(),
        tlf: modal.find(`.modal-body #tlf`).val(),
        email: modal.find(`.modal-body #correo`).val(),
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
        grupo: modal.find(`.modal-body #grupo`).val(),
        tlf: modal.find(`.modal-body #tlf`).val(),
        email: modal.find(`.modal-body #correo`).val(),
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
      }
  }
  else{
    modal.find(`.modal-title`).text(`Cambiar datos del Pago` + p.referencia);
    banco: modal.find(`.modal-body #banco`).val(p.banco);
    monto: modal.find(`.modal-body #monto`).val(p.monto);
    referencia: modal.find(`.modal-body #referencia`).val(p.referencia);
    date: modal.find(`.modal-body #date`).val(p.date);
  }
} 
