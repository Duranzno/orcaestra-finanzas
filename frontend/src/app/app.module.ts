import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { IconsModule } from './icons/icons.module'
import { SharedModule }      from './shared/shared.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  imports: [
    BrowserModule,
    IconsModule,
    FormsModule,
    SharedModule,
    //Theming
    // NgbModule,
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
