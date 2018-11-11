//Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//Libraries Modules
import {NgbCollapseModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { Http, HttpModule} from '@angular/http';
import { IconsModule } from './icons/icons.module';

//My modules
import { SharedModule } from './shared/shared.module';
import { TableModule } from './table/table.module';

//My Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from './sidebar.component';


@NgModule({
  imports: [
    BrowserModule,
    IconsModule,
    FormsModule,
    HttpModule,

    //Shared Modules
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
  ],
  providers: [Http,FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
