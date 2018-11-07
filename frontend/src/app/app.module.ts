//Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//Libraries Modules
import {NgbCollapseModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

//My modules
import { IconsModule } from './icons/icons.module';
import { SharedModule } from './shared/shared.module';
import { TableModule } from './table/table.module';

//My Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
//Shared Components
import { EstudianteFormComponent} from './shared/estudiante-form/estudiante-form.component';
import { PadreFormComponent} from './shared/padre-form/padre-form.component';
import { PagoFormComponent} from './shared/pago-form/pago-form.component';
import { DatatablesComponent} from './table/datatables/datatables.component';


@NgModule({
  imports: [
    BrowserModule,
    IconsModule,
    FormsModule,
    SharedModule,
    TableModule,
    // Libraries
    NgbCollapseModule,
    NgbModalModule,
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    // DatatablesComponent
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent],
  entryComponents: [
    PagoFormComponent,
    EstudianteFormComponent,
    PadreFormComponent]
})
export class AppModule { }
