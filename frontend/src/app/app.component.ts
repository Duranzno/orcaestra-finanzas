import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
    styleUrls: ['./app.component.css'],
  template: `
  <navbar></navbar>
  <h1>{{title}}</h1>
  <button class="btn btn-primary">Click Me</button>
  `,

})
export class AppComponent {
  title = 'orcaestra-finanzas';
}
