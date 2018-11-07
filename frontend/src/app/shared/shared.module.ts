import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap/';
import { IconsModule } from '../icons/icons.module'

import { FormsModule }   from '@angular/forms';

import { PagoFormComponent } from './pago-form/pago-form.component';
import { EstudianteFormComponent } from './estudiante-form/estudiante-form.component';
import { PadreFormComponent } from './padre-form/padre-form.component';

@NgModule({
  declarations: [
    PagoFormComponent,
    EstudianteFormComponent,
    PadreFormComponent
  ],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    FormsModule,
    IconsModule,
  ],
  exports:[
    PagoFormComponent,
    EstudianteFormComponent,
    PadreFormComponent
  ]
})
export class SharedModule { }
