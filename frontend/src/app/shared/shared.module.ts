import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoFormComponent } from './pago-form/pago-form.component';

@NgModule({
  declarations: [
    PagoFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PagoFormComponent
  ]
})
export class SharedModule { }
