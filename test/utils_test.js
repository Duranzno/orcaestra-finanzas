const chai   = require('chai');
chai.should();
// const expect = chai.expect;
const dataMock = require("./utils");
describe('Utils', async() => {
  it('deberia crear Estudiante', async() => {
     let estudiante=dataMock.getStudent();
     estudiante.should.be.an('object');
     estudiante.should.have.property('nombre');
     console.log(estudiante);
  });
  it('deberia crear Pago', async() => {
    let pago=dataMock.getPago();
    pago.should.be.an('object');
    pago.should.have.property('banco');
    console.log(pago);
  });
  it('deberia crear Pago', async() => {
    let padre=dataMock.getPadre();
    padre.should.be.an('object');
    padre.should.have.property('nombre');
    console.log(padre);
  });

});
