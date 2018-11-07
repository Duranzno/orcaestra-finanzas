import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { DatatablesComponent } from './datatables/datatables.component';

@NgModule({
  declarations: [
  	DatatablesComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule
  ],
  exports: [
	DatatablesComponent,
  ]
})
export class TableModule { }
