const chai   = require('chai');
chai.should();
const mongoose = require('mongoose');
const utils=require('../utils');
const Pago=require('../../app/models/pago');
const Padre=require('../../app/models/padre');
const Estudiante=require('../../app/models/estudiante');

describe('Padres', function() {
  let expectedPad;
  before(async ()=>{
    expectedPad=utils.getMockPadre();
    await mongoose.connect('mongodb://localhost:27017/testdb',{useNewUrlParser: true})
  });
  afterEach(() => {
    Padre.deleteMany({});
  });
  after(() => mongoose.disconnect());
  describe('methods', () => {
    afterEach(async() => {
      await Padre.deleteMany({});
      await Estudiante.deleteMany({});
      await Pago.deleteMany({});
    });

    it('.agregarPago()', async() => {
      let expected=utils.getMockPago();
      let resultPadre=await Padre.crear(expectedPad);
      let resultPago=await resultPadre.agregarPago(expected);

      resultPadre=await Padre.findOne({});

      utils.assertSameId(resultPadre.pagos[0],resultPago);
      resultPago.referencia.should.be.equal(expected.referencia);
      resultPago.banco.should.be.equal(expected.banco);

      //Checking again
      resultPago=await Pago.findOne({});
      resultPago.referencia.should.be.equal(expected.referencia);
      resultPago.banco.should.be.equal(expected.banco);
    });
    it('.quitarPago()', async() => {
      pad=await Padre.create(expectedPad);
      let resultPago=await pad.agregarPago(utils.getMockPago());
      pad= await Padre.findOne({});
      pad.pagos.should.have.lengthOf(1);
      await pad.quitarPago(resultPago);
      pad= await Padre.findOne({});
      pad.pagos.should.have.lengthOf(0);
    });
    it('.agregarHijo()', async () => {
      const expectedEst=utils.getMockStudent();
      let resultPad=await Padre.create(expectedPad);
      await resultPad.agregarHijo(expectedEst);
      let resultEst=await Estudiante.findOne({});
      resultPad=await Padre.findOne({});
      utils.assertSameId(resultPad.hijos[0],resultEst)
    });
    it('.qsuitarHijo()', async() => {
      pad=await Padre.create(expectedPad);
      let resultHijo=await pad.agregarHijo(utils.getMockStudent());
      pad= await Padre.findOne({});
      pad.hijos.should.have.lengthOf(1);
      await pad.quitarHijo(resultHijo);
      pad= await Padre.findOne({});
      pad.hijos.should.have.lengthOf(0);
    });
  });
  describe('statics', () => {
    afterEach(async() => {
      await Padre.deleteMany({});
      await Estudiante.deleteMany({});
      await Pago.deleteMany({});
    });
    describe('.crear()', () => {
      let expected;
      before(() => {
        expected = utils.getMockPadre();
      });

      it('deberia crear nuevo', async function() {
        let result=await Padre.crear(expected);
        result.nombre.should.be.equal(expected.nombre);
      });

      it('deberia devolver ya creado', async() => {
        const changedEmail="noemail@email.com";
        await Padre.crear(expected);
        let originalResult=await Padre.findOne({});
        originalResult.nombre.should.be.equal(expected.nombre);
        expected.email=changedEmail;
        let changedResult=await Padre.crear(expected);
        changedResult.email.should.equal(changedEmail).but.not.equal(originalResult.email)
      });
    });
    it('.transferirPago()', async() => {
      let pad= await Padre.create(expectedPad);
      const expectedPago=utils.getMockPago();
      let pago = await pad.agregarPago(expectedPago);
      let secondPad = await Padre.create(utils.getMockStudent());

      await Padre.transferirPago(pad._id, secondPad._id, pago._id);

      pad= await Padre.findOne({'_id': pad._id});
      secondPad= await Padre.findOne({'_id': secondPad._id});

      pad.pagos.should.have.lengthOf(0);
      secondPad.pagos.should.have.lengthOf(1);
      utils.assertSameId(secondPad.pagos[0], pago)
    });
    it('.transferirHijo()', async() => {
      let pad= await Padre.create(expectedPad);

      let hijo = await pad.agregarHijo(utils.getMockStudent());
      let secondPad = await Padre.create(utils.getMockStudent());

      await Padre.transferirHijo(pad._id, secondPad._id, hijo._id);

      pad= await Padre.findOne({'_id': pad._id});
      secondPad= await Padre.findOne({'_id': secondPad._id});

      pad.hijos.should.have.lengthOf(0);
      secondPad.hijos.should.have.lengthOf(1);
      utils.assertSameId(secondPad.hijos[0], hijo)
    });

  });
});

