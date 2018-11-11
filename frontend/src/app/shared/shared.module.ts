import { NgModule } from '@angular/core';
import { Http, HttpModule} from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap/';
import { IconsModule } from '../icons/icons.module'

import { FormsModule }   from '@angular/forms';
import { PagoService }   from './pago-form/pago.service'
import { PagoFormComponent } from './pago-form/pago-form.component';
import { EstudianteFormComponent } from './estudiante-form/estudiante-form.component';
import { PadreFormComponent } from './padre-form/padre-form.component';

@NgModule({
  declarations: [
    PagoFormComponent,
    EstudianteFormComponent,
    PadreFormComponent
  ],
  providers: [
    Http,
    PagoService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    HttpModule,
    NgbDatepickerModule,
  ],
  exports:[
    EstudianteFormComponent,
    PadreFormComponent
  ]
})
export class SharedModule { }
