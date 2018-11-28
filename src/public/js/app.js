// $(document).ready(async function() {
//   var isStudentTable=true;
//   let ajax;
  
//   await Promise.all([
//       $.getScript( "/public/js/datatables/options.const.js",
//           ( )=>console.log("Constantes Cargadas")
//         ),
//       $.getScript( "/public/js/date.module.js", 
//           ( )=> console.log("Date.Module Cargado")
//         ),
//       $.getScript( "/public/js/calendar.module.js", 
//           ( )=> console.log("Calendar.module Cargado")
//         ),
//       // $.getScript( "/public/js/datatables/datatables.module.js", 
//       //     ( )=> console.log("Cargado datatables.module")
//       //   ),
//       // $.getScript( "/public/js/startup.module.js",
//       //     ( )=> console.log("Cargado startup.module")
//       //   ),
//       // $.getScript( "/public/js/datatables/modal.js", 
//       //     ( )=> console.log("Cargado modal.js")
//       //   ),
//       // $.getScript( "/public/js/datatables/subrow.js", 
//           // ( )=> {console.log("Cargado funcion para filas hijos");}
//         // )
//     ])

// let calendar=new CalendarModule();
//   $('#estudiantesLink').on('click',()=>{
//     console.log('clicked')
//     $('.datepicker').datepicker({})
// });

// // let date=new DateModule();
//   // let fecha = DateModule();
  
//   // const dt = DatatablesModule(fecha,true);
  
//   // updateIsStudentTable(false);
//   // (CalendarModule()).configCalendar();
//   // setupClickEvents();
//   // setupSideBar(fecha);

//   feather.replace();
// });
// // function updateIsStudentTable(val) {
// //   isStudentTable=val;
// //   $('#dashboard').text((isStudentTable)?'Estudiantes':'Representantes');
// //   setupDataTable();
// //   console.log(ajax)
// // }
// // $('#padresLink').on('click',function(){
// //   setupDataTable('p')
// //   console.log('clicked');
// //   let dt=$('#table').DataTable({'retrieve': true});
// //   dt.ajax.url("https://agile-journey-70659.herokuapp.com/estudiantes").load();
// // })


//   // $('#table').on('click','button.btn.btn-edit',function(){
//   //   let rowIndex=$(this).data('row');
//   //   let data=(dt.table.row(rowIndex).data());
    
//   // });


