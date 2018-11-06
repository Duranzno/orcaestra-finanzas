import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagoFormComponent} from './shared/pago-form/pago-form.component';
import { EstudianteFormComponent} from './shared/estudiante-form/estudiante-form.component';
import { PadreFormComponent} from './shared/padre-form/padre-form.component';


@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'

})
export class AppComponent {
  title = 'orcaestra-finanzas';
  parentIsCollapsed = true;
  studentIsCollapsed = true;
  constructor(private modalService: NgbModal) { }
  modalStudent() {
    const modalRef = this.modalService.open(PagoFormComponent);
    // modalRef.componentInstance.name = 'World';
  }

}
