class StartupModule{
  constructor(ajax,fecha){
    this.ajax=ajax;
    this.file_data=undefined;
    this.fecha=fecha;
    this.setupSideBar();
    this.setupClickEvents();
  }
  
  setupSideBar() {
    const startupInstance=this
    $('li.mes').append(() => {
      $('.mes-actual')
        .closest('a')
        .attr('id', this.fecha.getAnoMesURL(new Date()));
      let meses = this.fecha.arrayMeses(new Date());
      let li = '';
      meses.reverse().forEach(function(mes) {
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
  setupClickEvents(){
    $('#agregarEstudianteNuevo').on('click', function() {
      this.ajax=ajax.urlSet('e');
      let student = {
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        grupo: $('#proyecto').val(),
        tlf: $('#tlf').val(),
        email: $('#correo').val(),
        pagos:[{
          banco: $('#banco').val(),
          referencia: $('#referencia').val(),
          monto: $('#monto').val(),
          fecha: $('#fecha').val(),
        }]
      };
      this.ajax.post(student)
    });
    $('#agregarPadreNuevo').on('click', function() {
      this.ajax=ajax.urlSet('p');
      let padre = {
        nombre: $('#nombre-p').val(),
        apellido: $('#apellido-p').val(),
        tlf: $('#tlf-p').val(),
        email: $('#correo-p').val(),
        pagos:[{
          banco: $('#banco').val(),
          referencia: $('#referencia').val(),
          monto: $('#monto').val(),
          fecha: $('#fecha').val(),
        }]
      };
      this.ajax.post(padre)
    });
    $('#importarPaola').on('click', function() {
       $('#inputP').trigger('click');
     });
     $('#inputP').change(function() {
       this.file_data = $('#inputP').prop('files')[0];
       let data = new FormData();
       this.ajax.uploadExcel(data,'/uploadPaola');
       this.file_data = undefined;
     });

     $('#inputM').change(function() {
       this.file_data = $('#inputM').prop('files')[0];
       let data = new FormData();
       this.ajax.uploadExcel(data,'/uploadMarwan')
       this.file_data = undefined;
     });
     $('#importarMarwan').on('click', function() {
       $('#inputM').trigger('click');
     });
  }
}

// function setupClickEvents() {
//   $('#agregarEstudianteNuevo').on('click', () => {
//     let student = {
//       nombre: $('#nombre').val(),
//       apellido: $('#apellido').val(),
//       grupo: $('#proyecto').val(),
//       tlf: $('#tlf').val(),
//       email: $('#correo').val(),
//     };
//     let pago = {
//       banco: $('#banco').val(),
//       referencia: $('#referencia').val(),
//       monto: $('#monto').val(),
//       fecha: $('#fecha').val(),
//     };
//     $.post('api/estudiante/new', student, 'json')
//       .done(function(est) {
//         console.log(est._id);
//         student._id = est._id;
//         $.post(`api/estudiante/${est._id}/pago`, pago, 'json').done(function(
//           data
//         ) {
//           console.log(data);
//           table.ajax.reload();
//           table.draw();
//           console.log('Sucess');
//         });
//       })
//       .fail(function() {
//         alert('error');
//       });
//     console.log(student._id);
//     if (student._id) {
//     }
//   });

//   let this.file_data;
//   $('#inputP').change(function() {
//     this.file_data = $('#inputP').prop('files')[0];
//     let data = new FormData();
//     data.append('planilla', this.file_data);
//     $.ajax({
//       type: 'POST',
//       enctype: 'multipart/form-data',
//       url: '/uploadPaola',
//       data: data,
//       processData: false,
//       contentType: false,
//       cache: false,
//       timeout: 600000,
//       success: function(data) {
//         console.log('SUCCESS : ', data);
//       },
//       error: function(e) {
//         console.log('ERROR : ', e);
//       },
//     });
//     this.file_data = undefined;
//   });
//   $('#importarPaola').on('click', function() {
//     $('#inputP').trigger('click');
//   });

//   $('#inputM').change(function() {
//     this.file_data = $('#inputM').prop('files')[0];
//     let data = new FormData();
//     data.append('planilla', this.file_data);
//     $.ajax({
//       type: 'POST',
//       enctype: 'multipart/form-data',
//       url: '/uploadMarwan',
//       data: data,
//       processData: false,
//       contentType: false,
//       cache: false,
//       timeout: 600000,
//       success: function(data) {
//         console.log('SUCCESS : ', data);
//       },
//       error: function(e) {
//         console.log('ERROR : ', e);
//       },
//     });
//     this.file_data = undefined;
//   });
//   $('#importarMarwan').on('click', function() {
//     $('#inputM').trigger('click');
//   });
// }
