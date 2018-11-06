import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbCollapseModule,NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import { IconsModule } from './icons/icons.module'
import { SharedModule }      from './shared/shared.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { EstudianteFormComponent} from './shared/estudiante-form/estudiante-form.component';
import { PadreFormComponent} from './shared/padre-form/padre-form.component';
import { PagoFormComponent} from './shared/pago-form/pago-form.component';


@NgModule({
  imports: [
    BrowserModule,
    IconsModule,
    FormsModule,
    SharedModule,
    //Theming
    NgbCollapseModule,
    NgbModalModule,
    // NgbModule,
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent],
  entryComponents:[PagoFormComponent, EstudianteFormComponent, PadreFormComponent]
})
export class AppModule { }
