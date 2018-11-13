import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap/';
import { IconsModule } from '../icons/icons.module'

import { HttpErrorHandler }     from '../http-error-handler.service';
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
    HttpErrorHandler,  
    PagoService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    HttpClientModule,
    NgbDatepickerModule,
  ],
  exports:[
    EstudianteFormComponent,
    PadreFormComponent
  ]
})
export class SharedModule { }
