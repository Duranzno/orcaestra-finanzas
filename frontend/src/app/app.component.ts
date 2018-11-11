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
  fileName = 'shit and giggles';
  title = 'orcaestra-finanzas';
  parentIsCollapsed = true;
  studentIsCollapsed = true;
  constructor(
    private modalService: NgbModal) {
     }
  openFileBrowser(event: any, url: string) {
    event.preventDefault();
    const element: HTMLElement = document.getElementById('uploadInput') as HTMLElement;
    // uploadPlantillaTo(url)
    console.log(url);
    element.click();
  }
  onFileChange(event: any) {
    const files = event.target.files;
    this.fileName = files[0].name;
    console.log(files);
  }
  modalStudent() {
    const modalRef = this.modalService.open(PagoFormComponent);
    // modalRef.componentInstance.name = 'World';
  }
}
