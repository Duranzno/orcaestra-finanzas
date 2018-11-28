
$(document).ready(async function() {
  
  
  await Promise.all([
      $.getScript( "/public/js/datatables/options.const.js",
          ( )=>console.log("Constantes Cargadas")
        ),
      $.getScript( "/public/js/date.module.js", 
          ( )=> console.log("Cargado DateModule")
        ),
      $.getScript( "/public/js/startup.module.js",
          ( )=> console.log("Cargado StartupModule")
        ),
      $.getScript( "/public/js/datatables/ajax.js", 
          ( )=> console.log("Cargado Ajax")
        ),
      $.getScript( "/public/js/datatables/modal.js", 
          ( )=> console.log("Cargado ModalModule")
        ),
      // $.getScript( "/public/js/datatables/subrow.js", 
          // ( )=> {console.log("Cargado funcion para filas hijos");}
        // )
      $.getScript( "/public/js/calendar.module.js", 
          ( )=> console.log("Cargado bootstrap-datepicker ")
        ),
      $.getScript( "/public/js/datatables/datatables.module.js", 
          ( )=> console.log("Cargado datatables.module")
        ),
    ])
  // Constantes
  let isStudentTable=true;
  let ajax= new Ajax('http//localhost:1234/api',isStudentTable);
  updateIsStudentTable(true);
  CalendarModule();
  const date=new DateModule();
  new StartupModule(ajax,date); 
  let datatableModule= new DatatablesModule(date,isStudentTable,ajax);
  let modal=ModalFunction().constructor(isStudentTable,ajax,Constants);
//   // updateIsStudentTable(false);
//   // (CalendarModule()).configCalendar();
//   // setupClickEvents();
//   // setupSideBar(fecha);
	
  feather.replace();


  function updateIsStudentTable(val) {
    isStudentTable=val;
    $('#dashboard').text((isStudentTable)?'Estudiantes':'Representantes');
    if(isStudentTable){
      $('#btn-collapse-p').hide();$('#btn-collapse-e').show();
      $('#collapsePadre').collapse('hide');
      // this.datatableModule.isStudentTable=true;
      console.log(this.datatableModule);
    }
    else{
     $('#btn-collapse-e').hide();$('#btn-collapse-p').show(); 
     $('#collapseEstudiante').collapse('hide');
     
      console.log('padre');
    }
      
    // setupDataTable();
  }
  $('#estudiantesLink').on('click',function(){updateIsStudentTable(true);});
  $('#padresLink').on('click',function(){updateIsStudentTable(false)
    // console.log('clicked');
    // let dt=$('#table').DataTable({'retrieve': true});
    // dt.ajax.url("https://agile-journey-70659.herokuapp.com/estudiantes").load();
  })
});



//   // $('#table').on('click','button.btn.btn-edit',function(){
//   //   let rowIndex=$(this).data('row');
//   //   let data=(dt.datatableModule.row(rowIndex).data());
    
//   // });


