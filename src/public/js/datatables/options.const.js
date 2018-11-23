const grupos = [
    'Sin Determinar',
    'Coro de Padres',
    'Inicial',
    'Preparatorio "B"',
    '"Alma Llanera"',
    'IMA',
    'IMB',
    'PMA',
    'PMB',
    'Pre-Infantil',
    'Infantil',
    'Pre Juvenil',
    'Juvenil',
    'Kinder Musical',
  ];
var website = "http://localhost:1234" || location.href.slice(0, -1) || 'http://localhost:5000/';
const columnDefsEst = [
  {
    title:'Pagos',
    className: 'details-control',

    // render:function(){return'  <span data-feather="dollar-sign">A</span>'},
    orderable: false,
    data: null,
    defaultContent: '',
  },
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
    title:'Opciones',
    targets: -1,
    data: null,
    render: function(data, type, row, meta) {
      return `
      <button 
      type="button"  data-row='${meta.row}'
      class="btn btn-add-pago btn-sm btn-outline-dark">
        <span data-feather="file-plus"></span>
      </button>
      <button 
      type="button"  data-row='${meta.row}'
      class="btn btn-edit btn-sm btn-outline-dark">
        <span data-feather="edit"></span>
      </button>
      <button 
      type="button"   data-row='${meta.row}'
      class="btn btn-delete btn-outline-dark btn-sm">
        <span data-feather="user-x"></span>
      </button>`;
    },
  },

  

];
const columnDefsPad = [
  {
    title:'Pagos',
    className: 'details-control',
    // render:function(){return'  <span data-feather="dollar-sign">A</span>'},
    orderable: false,
    data: null,
    defaultContent: '',
  },
  {
    title:'Nombre',
    data: 'nombre'},
  {
    title:'Apellido',
    data: 'apellido'},
  {
    title:'Correo',
    data: 'email'},
  {
    title:'Telefono',
    data: 'tlf'},
  {
    title:'Opciones',
    targets: -1,
    data: null,
    render: function (d, i) {
      return `
      <button 
      type="button" data-toggle="modal" data-target="#padreModal" class=" btn-outline-dark btn btn-edit-pago btn-sm" id="edit" data-padreId="${d._id}" 
        data-nombre="${d.nombre}"
        data-apellido="${d.apellido}"
        data-tlf="${d.tlf}"
        data-email="${d.email}">
        <span data-feather="edit"></span>
      </button>
      <button 
      type="button" data-toggle="modal" data-target="#padreModal" class="btn btn-edit-pago btn-outline-dark btn-sm" id="delete" data-padreId="${d._id}" 
        data-nombre="${d.nombre}"
        data-apellido="${d.apellido}"
        data-tlf="${d.tlf}"
        data-email="${d.email}">
        <span data-feather="user-x"></span>
      </button>
      <button 
      type="button" data-toggle="modal" data-target="#padreModal" class="btn btn-edit-pago btn-outline-dark btn-sm" id="delete" data-padreId="${d._id}" 
        data-nombre="${d.nombre}"
        data-apellido="${d.apellido}"
        data-tlf="${d.tlf}"
        data-email="${d.email}">
        <span data-feather="user-x"></span>
      </button>`;
    },
  },
];
const dtESP = {
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
  },
};