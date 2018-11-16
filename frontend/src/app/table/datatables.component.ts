import { Component, OnDestroy, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import {columnDefs,dtESP} from './table';
import {htmlFilaPago} from './child-rows';
import { Subject } from 'rxjs';
import { EstudiantesService } from './estudiantes.service';

@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
})
export class DatatablesComponent implements AfterViewInit, OnDestroy, OnInit{
  @ViewChild(DataTableDirective)
  private datatableElement: DataTableDirective;  
  dtOptions:any= {};	
  dtTrigger:  Subject<any> = new Subject();	
  website ="http://192.168.1.141:1234" ||'http://localhost:1234'  ||  location.href.slice(0, -1);
  constructor(private estService:EstudiantesService) { }

  ngOnInit():void {
    this.dtOptions = {      
      ajax:{
        url:this.website + '/api/estudiantes',
        dataSrc: '',
      },
      columns:columnDefs,
      language: dtESP,
      responsive: true,
      paging: false,
      order: [[1, 'asc']],
    };
  }
  click() {
    this.dtOptions.columns[0].name="AAA";
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) =>{
      $('#table tbody').on('click', 'td.details-control', function() {
        let tr = $(this).closest('tr');
        let filasPagos = dtInstance.row(tr);
        if (filasPagos.child.isShown()) {
          // Los pagos del estudiante estan mostrados, se van a ocultar
          filasPagos.child.hide();
          tr.removeClass('shown');}
        else {
          filasPagos.child(htmlFilaPago(filasPagos.data())).show();
          tr.addClass('shown');
        };  
      });
      this.rerender();
    });
   this.estService.hello();
  };
  ngAfterViewInit(): void {this.dtTrigger.next();}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
}


