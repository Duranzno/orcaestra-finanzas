class Constantes {
  constructor(grupos,colE,bancos,colP) {}
  static grupos(){return [ 'Sin Determinar', 'Coro de Padres', 'Inicial', 'Preparatorio "B"', '"Alma Llanera"', 'IMA', 'IMB', 'PMA', 'PMB', 'Pre-Infantil', 'Infantil', 'Pre Juvenil', 'Juvenil', 'Kinder Musical', ];}
  static colE(){ return [ 
    { title:'Pagos', className: 'details-control', orderable: false, data: null, defaultContent: '', },
    { title:'Nombre', data: 'nombre'}, { title:'Apellido', data: 'apellido'}, 
    { title:'Grupo', data: 'grupo'}, { title:'Correo', data: 'email'}, { title:'Telefono', data: 'tlf'}, 
    { title:'Opciones', targets: -1, data: null, 
      render: function(data, type, row, meta) { 
        return ` 
          <button type="button" data-row='${meta.row}' class="btn btn-add-pago btn-sm btn-outline-dark"> <span data-feather="file-plus"></span>
         </button> <button type="button" data-row='${meta.row}' class="btn btn-edit btn-sm btn-outline-dark"> <span data-feather="edit"></span> 
         </button> <button type="button" data-row='${meta.row}' class="btn btn-delete btn-outline-dark btn-sm"> <span data-feather="user-x"></span> </button>`; 
       }, 
    }, 
  ];}
  static colP() { return [ 
    { title:'Extra', className: 'details-control', orderable: false, data: null, defaultContent: '', }, 
    { title:'Nombre', data: 'nombre'}, { title:'Apellido', data: 'apellido'}, { title:'Correo', data: 'email'}, 
    { title:'Telefono', data: 'tlf'}, 
    { title:'Opciones', targets: -1, data: null, 
        render: function(data, type, row, meta) { 
          return ` 
            <button type="button" data-row='${meta.row}' class="btn btn-add-pago btn-sm btn-outline-dark"> <span data-feather="file-plus"></span>
           </button> <button type="button" data-row='${meta.row}' class="btn btn-edit btn-sm btn-outline-dark"> <span data-feather="edit"></span> 
           </button> <button type="button" data-row='${meta.row}' class="btn btn-delete btn-outline-dark btn-sm"> <span data-feather="user-x"></span> </button>`; 
         }, 
      },
  ]};
  static banco(){ return
    [ 'Desconocido', 'Banesco', `Banco de Venezuela`, `BBVA Provincial`, `Banco Mercantil`, `BOD`, 
    `Banco Bicentenario`, `Bancaribe`, `BNC`, `Banco del Tesoro`, `Bancaribe`, `Banco Exterior`,
     `BFC`, `Sofitasa`, `Bancrecer`, `Banplus`, `Banco Plaza`, `Banco Caroni`, `DELSUR`, ];
  } 
  static dtESP(isStudentTable){
    let personas=isStudentTable?'${personas}':'representantes'
    return {
      decimal: `,`,
      emptyTable: `No hay ${personas} disponibles en la base de datos`,
      info: `Mostrando _START_ a _END_ de _TOTAL_ ${personas}`,
      infoEmpty: `Mostrando 0 a 0 de 0 ${personas}`,
      infoFiltered: `(filtrado de _MAX_ ${personas} totales)`,
      infoPostFix: ``,
      thousands: `.`,
      lengthMenu: `Mostrando _MENU_ opciones`,
      loadingRecords: `Cargando...`,
      processing: `Procesando...`,
      search: `Buscando:`,
      zeroRecords: `No se han encontrado ${personas} con esas caracteristicas`,
      paginate: {
        first: `Primero`,
        last: `Ultimo`,
        next: `Siguiente`,
        previous: `Previo`,
      },
      aria: {
        sortAscending: `: Ordenar de forma ascendete`,
        sortDescending: `: Ordenar de forma descendente`,
    },
  };
  }
}

