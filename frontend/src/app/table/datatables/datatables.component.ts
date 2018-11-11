import { Component, OnDestroy, OnInit } from '@angular/core';
@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.css']
})
export class DatatablesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};		
  constructor() { }

  ngOnInit():void {
	 this.dtOptions = {
      data: dataSet,
      columns:columnDefs
    }
  }
  ngOnDestroy() {
  }
}
const website = location.href.slice(0, -1) || 'http://localhost:1234/';
const columnDefs = [
	 {  title:'#',
      className: 'details-control',
      orderable: false,
      data: null,
      defaultContent: '',
    },
    {  
      title:'Nombre',
      data: 'nombre'
    },
    {  
      title:'Apellido',
      data: 'apellido'
    },
    {  
      title:'Grupo',
      data: 'grupo'
    },
    {  
      title:'Correo',
      data: 'email'
    },
    {  
      title:'Telefono',
      data: 'tlf'
    },
    // {
    //   targets: -1,
    //   data: null,
    //   render: function htmlModalPago(d, i) {
    //     return `<button type="button" data-toggle="modal" data-target="#estudianteModal" class="btn btn-edit-pago btn-sm" 
    //                     data-estudianteId="${d._id}" data-nombre="${
    //       d.nombre
    //     }" data-apellido="${d.apellido}" data-tlf="${d.tlf}" data-grupo="${
    //       d.grupo
    //     }"
    //                     data-email="${d.email}">
    //             <span data-feather="edit"></span></button>`;
    //   },
      //   },
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
  },};	
const dtOptions = {
    ajax: {
      url: `${website} api/estudiantes`,
      dataSrc: '',
      deferRender: true,
    },
    columns: columnDefs,  
    language: dtESP,
    dom: 'Bfrtip', // element order: NEEDS BUTTON CONTAINER (B) ****
    select: 'single', // enable single row selection
    sPaginationType: 'full_numbers',
    altEditor: true, // Enable altEditor ****
    responsive: true,
    paging: false,
    order: [[1, 'asc']],
}; 
const dataSet=[
    {"nombre":"Jose","apellido":"Duran","email":"aledurax@gmail.com","grupo":"IMB","tlf":"3",
      "pagos":[
        {"banco":"Banco Caroni","referencia":"408","fecha":"2018-11-07T14:48:30.035Z","monto":721,"_id":"5be2fb3f9056b3588eca0c83","__v":0}
        ],
      "_id":"5be2fb3f9056b3588eca0c81","createdAt":"2018-11-07T14:48:31.106Z","__v":1
    },
    {"nombre":"Fernando","apellido":"Duran","email":"aledurax@gmail.com","grupo":"Pre Juvenil","tlf":"2",
      "pagos":[
          {"banco":"Banco de Venezuela","referencia":"218","fecha":"2018-11-07T14:48:30.035Z","monto":194,"_id":"5be2fb3f9056b3588eca0c84","__v":0}
        ],
      "_id":"5be2fb3f9056b3588eca0c80","createdAt":"2018-11-07T14:48:31.106Z","__v":1
    },
    {"nombre":"Alejandro","apellido":"Duran","email":"aledurax@gmail.com","grupo":"Sin Determinar","tlf":"1",
      "pagos":[
        {"banco":"Sofitasa","referencia":"585","fecha":"2018-11-07T14:48:30.035Z","monto":882,"_id":"5be2fb3f9056b3588eca0c85","__v":0}
        ],
      "_id":"5be2fb3f9056b3588eca0c7f","createdAt":"2018-11-07T14:48:31.091Z","__v":1
    },
    {"nombre":"Yuli","apellido":"Duran","email":"aledurax@gmail.com","grupo":"Coro de Padres","tlf":"4",
      "pagos": [
        {"banco":"Banco Caroni","referencia":"848","fecha":"2018-11-07T14:48:30.035Z","monto":852,"_id":"5be2fb3f9056b3588eca0c86","__v":0}
      ],
      "_id":"5be2fb3f9056b3588eca0c82","createdAt":"2018-11-07T14:48:31.107Z","__v":1
    }
  ]
