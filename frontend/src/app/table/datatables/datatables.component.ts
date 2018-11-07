import { Component, OnDestroy, OnInit } from '@angular/core';
@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.css']
})
export class DatatablesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};		
	persons = [ { 'id': 1, 'firstName': 'Ale', 'lastName': 'Duran' },
							{ 'id': 2, 'firstName': 'Fer', 'lastName': 'Duran' },
							{ 'id': 3, 'firstName': 'Arturo', 'lastName': 'Cova' }]
  constructor() { }

  ngOnInit():void {
	 this.dtOptions = dtOptions;
  }
  ngOnDestroy() {
  }
}
const website = location.href.slice(0, -1) || 'http://localhost:5000/';
const columnDefs = [
	 {
      className: 'details-control',
      orderable: false,
      data: null,
      defaultContent: '',
    },
    {data: 'nombre'},
    {data: 'apellido'},
    {data: 'grupo'},
    {data: 'email'},
    {data: 'tlf'},
    {
      targets: -1,
      data: null,
      render: function htmlModalPago(d, i) {
        return `<button type="button" data-toggle="modal" data-target="#estudianteModal" class="btn btn-edit-pago btn-sm" 
                        data-estudianteId="${d._id}" data-nombre="${
          d.nombre
        }" data-apellido="${d.apellido}" data-tlf="${d.tlf}" data-grupo="${
          d.grupo
        }"
                        data-email="${d.email}">
                <span data-feather="edit"></span></button>`;
      },
    },];;
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
  },};	;
const dtOptions={
    ajax: {
      url: website + '/estudiantes',
      dataSrc: '',
      deferRender: true,
    },
    language: dtESP,
    dom: 'Bfrtip', // element order: NEEDS BUTTON CONTAINER (B) ****
    select: 'single', // enable single row selection
    sPaginationType: 'full_numbers',
    altEditor: true, // Enable altEditor ****
    columns: columnDefs,
    responsive: true,
    paging: false,
    order: [[1, 'asc']],
  }   ;	
