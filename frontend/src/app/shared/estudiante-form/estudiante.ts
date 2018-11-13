import {PagoImpl} from '../pago-form/pago'
export class Estudiante{    
    constructor(
        public nombre:string="",
        public apellido:string="",
        public email:string="",
        public grupo:string="Sin Determinar",
        public tlf:string="",
        public pago=new PagoImpl(),
    ){}
}