const chai   = require('chai');
chai.should();
const mongoose = require('mongoose');
const utils=require('../utils');
const Pago=require('../../src/models/pago');
const Padre=require('../../src/models/padre');
const Estudiante=require('../../src/models/estudiante');

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
      pag=await Pago.find({});
      pag.should.have.lengthOf(0);
    });
    it('.agregarPago() con Hijos', async() => {
      let expected=utils.getMockPago();
      let expHijo=utils.getMockStudent();
      let resultPadre=await Padre.crear(expectedPad);
      let resHijo=await resultPadre.agregarHijo(expHijo);
      await resultPadre.agregarHijo(utils.getMockStudent());
      await resultPadre.agregarHijo(utils.getMockStudent());
      let resultPago=await resultPadre.agregarPago(expected);
      await resultPadre.agregarPago(utils.getMockPago());

      await resultPadre.agregarPago(utils.getMockPago());




      resultPadre=await Padre.findOne({});
      resHijo=await Estudiante.findOne({});

      utils.assertSameId(resultPadre.pagos[0],resultPago);
      resHijo.pagos.should.have.lengthOf(3);
      utils.assertSameId(resHijo.pagos[0],resultPago);

    });
    it('.quitarPago() con Hijos', async() => {
      pad=await Padre.create(expectedPad);
      await pad.agregarHijo(utils.getMockStudent());
      await pad.agregarHijo(utils.getMockStudent());
      let pag=await pad.agregarPago(utils.getMockPago());
      await pad.agregarPago(utils.getMockPago());
      await pad.agregarPago(utils.getMockPago());

      pad= await Padre.findOne({});
      pad.pagos.should.have.lengthOf(3);

      await pad.quitarPago(pag);

      let resPago=await Pago.find({});
      resHijo=await Estudiante.findOne({});
      pad= await Padre.findOne({});
      resPago.should.have.lengthOf(2);
      pad.pagos.should.have.lengthOf(2);
      resHijo.pagos.should.have.lengthOf(2);
    });
    it('.agregarHijo()', async () => {
      const expectedEst=utils.getMockStudent();
      let resultPad=await Padre.create(expectedPad);
      await resultPad.agregarHijo(expectedEst);
      let resultEst=await Estudiante.findOne({});
      resultPad=await Padre.findOne({});
      utils.assertSameId(resultPad.hijos[0],resultEst)
    });
    it('.quitarHijo()', async() => {
      pad=await Padre.create(expectedPad);
      let resultHijo=await pad.agregarHijo(utils.getMockStudent());
      est=await Estudiante.find({});est.should.have.lengthOf(1);
      pad= await Padre.findOne({});
      pad.hijos.should.have.lengthOf(1);

      await pad.quitarHijo(resultHijo);

      pad= await Padre.findOne({});
      pad.hijos.should.have.lengthOf(0);
      est=await Estudiante.find({});
      est.should.have.lengthOf(0);
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
    describe('eliminar()', function(){
      var pad;
        before(async function()  {
        pad = await Padre.crear(expectedPad);
        await pad.agregarHijo(utils.getMockStudent());
        await pad.agregarHijo(utils.getMockStudent());
        await pad.agregarPago(utils.getMockPago());
        await pad.agregarPago(utils.getMockPago());
        await pad.agregarPago(utils.getMockPago());
      });

    it('.eliminar()', async function(){
      // (await Padre.find({})      ).should.have.lengthOf(1);
      // (await Estudiante.find({}) ).should.have.lengthOf(2);
      // (await Pago.find({})       ).should.have.lengthOf(3);
      await Padre.eliminar(pad._id);

      (await Padre.find({})      ).should.have.lengthOf(0);
      (await Estudiante.find({}) ).should.have.lengthOf(0);
      (await Pago.find({})       ).should.have.lengthOf(0);

    });
    });

  });
});

