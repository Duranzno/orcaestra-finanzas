// export const dtOptions = {      
//   ajax:{
//     url:"",
//     dataSrc: '',
//   },
//   columns:columnDefs,
//   language: dtESP,
//   responsive: true,
//   paging: false,
//   order: [[1, 'asc']],
// }    
export const columnDefs = [
  {
    title:'#',
    className: 'details-control',
    orderable: false,
    data: null,
    defaultContent: '',},
  {  
    title:'Nombre',
    data: 'nombre'},
  {  
    title:'Apellido',
    data: 'apellido'},
  {  
    title:'Grupo',
    data: 'grupo'},
  {  
    title:'Correo',
    data: 'email'},
  {  
    title:'Telefono',
    data: 'tlf'},
  {
    targets: -1,
    data: null,
    render: function htmlModalPago(d, i) {
      return `
      <button type="button" data-target="#estudianteModal" class="btn btn-sm"
        data-estudianteId="${d._id}" 
        data-nombre="${d.nombre}" data-apellido="${d.apellido}" 
        data-tlf="${d.tlf}" data-grupo="${d.grupo}" data-email="${d.email}">
        <span data-feather="edit"></span> EDIT
      </button>`;
    },},
];    
export const dtESP = {
  decimal: ',',
  emptyTable: 'No hay datos disponibles en la base de datos',
  info: 'Mostrando _START_ a _END_ de _TOTAL_ estudiantes',
  infoEmpty: 'Mostrando 0 a 0 de 0 estudiantes',
  infoFiltered: '(filtrado de _MAX_ estudiantes totales)',
  infoPostFix: '',
  thousands: '.',
  lengthMenu: 'Mostrando _MENU_ opciones',
  loadingRecords: 'Cargando...',
  processing: 'Procesando...',
  search: 'Buscando:',
  zeroRecords: 'No se han encontrado estudiantes con esas caracteristicas',
  paginate: {
    first: 'Primero',
    last: 'Ultimo',
    next: 'Siguiente',
    previous: 'Previo',
  },
  aria: {
    sortAscending: ': Ordenar de forma ascendete',
    sortDescending: ': Ordenar de forma descendente',
  },};	
