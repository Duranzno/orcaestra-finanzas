class Ajax{
	constructor(url) {
		this.url=url||'http://localhost:1234/api/estudiantes/';
	}
	// putPago(){console.log('asfasd');}
	// putEstudiante(){return "PUT PAGO";}
	// putPadre(){}
	// deletePago(){}
	deleteEstudiante(id){
		$.ajax({
        type: 'DELETE',
        url: this.url + id,
        dataType: 'json',
      })
		.then(()=>{
    	// newAjaxSrc();
			console.log('Se eliminó el estudiante'+id)
		})
	}
// 

			// deletePadre(){}
	// postPago(){}
	// function postHijo(){
	// 	console.log("a");
	// }
	// console.log("AJAX")
}
    // $.ajax({
    //   type: 'PUT',
    //   url: 'http://localhost:1234/api/estudiante/' + id,
    //   data: e,
    //   dataType: 'json',
    // });
    // newAjaxSrc();

    // 
// let newAjaxSrc = function(url) {
//   url = url ? url : 'http://localhost:1234';
//   console.log(url);
//   table.ajax.url(url).load();
// };