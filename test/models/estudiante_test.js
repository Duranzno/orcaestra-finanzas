const chai   = require('chai');
chai.should();
const expect=chai.expect;
const mongoose = require('mongoose');
const utils=require('../utils');
const Pago=require('../../src/models/pago');
const Estudiante=require('../../src/models/estudiante');

describe('Estudiantes', () => {
  before(()=>mongoose.connect('mongodb://localhost:27017/testdb',{useNewUrlParser: true}));
  after(() => mongoose.disconnect());
  afterEach(() => Estudiante.deleteMany({}));

  describe('methods', () => {
    let expectedEst,est,expectedPago;
    before(async () => {
      expectedEst = utils.getMockStudent();
      est      = await Estudiante.create(expectedEst);
      expectedPago=utils.getMockPago();
    });
    afterEach(() => Pago.deleteMany({}));

    it('.agregarPago()', async() => {
        let expected=utils.getMockPago();
        console.log(expected);
        let result=await est.agregarPago(expected);
        console.log(result);
        est=await Estudiante.findOne({});
        console.log(est);
        est.pagos.should.include(result._id);
        result.referencia.should.be.equal(expected.referencia);
        result.banco.should.be.equal(expected.banco);
        result=await Pago.findOne({});
        result.referencia.should.be.equal(expected.referencia);
        result.banco.should.be.equal(expected.banco);

    });
    it('.quitarPago()', async() => {
        est=await Estudiante.create(expectedEst);
        let resultPago=await est.agregarPago(expectedPago);
        await est.quitarPago(resultPago);
        est= await Estudiante.findOne({});
        est.pagos.should.have.lengthOf(0);
      });
  });

  describe('statics', () => {
    let expectedEst,est,expectedPago;
    before(async() => {
      expectedPago=utils.getMockPago();
      expectedEst = utils.getMockStudent();
    });
    afterEach(async() => {
      await   Estudiante.deleteMany({});
      await   Pago.deleteMany({});

    });

    describe('.crear()', () => {
      let expected;
      before(() => {
        expected = utils.getMockStudent();
      });

      it('deberia crear nuevo', async function() {
          let result=await Estudiante.crear(expected);
          result.nombre.should.be.equal(expected.nombre);
          console.log(result);
        });

      it('deberia devolver ya creado', async() => {
          const changedEmail="noemail@email.com";
          await Estudiante.crear(expected);
          let originalResult=await Estudiante.findOne({});
          originalResult.nombre.should.be.equal(expected.nombre);
          expected.email=changedEmail;
          let changedResult=await Estudiante.crear(expected);
          changedResult.email.should.equal(changedEmail).but.not.equal(originalResult.email)
      });
    });
    it('.agregarPagoById()', async() => {
          const expectedPago=utils.getMockPago();
          const expectedEst=utils.getMockStudent();
          let result=await Estudiante.crear(expectedEst);
          const id=result._id;
          let resultPago=await Estudiante.agregarPagoById(id, expectedPago);
          resultPago.referencia.should.be.equal(expectedPago.referencia);
      });
    it('.eliminarById()', async() => {
        const expected=utils.getMockStudent();
        let result =await Estudiante.create(expected);
        await Estudiante.eliminarById(result._id);
        result = await Estudiante.find({});
        result.should.have.lengthOf(0);
    });
    it('.eliminarById() with Pago', async() => {
          Estudiante.deleteMany({});
          const expectedEst=utils.getMockStudent();
          const expectedPago=utils.getMockPago();
          let result =await Estudiante.create(expectedEst);
          await result.agregarPago(expectedPago);
          await Estudiante.eliminarById(result._id);
          result = await Pago.find({});
          result.should.have.lengthOf(0);
          result = await Estudiante.find({});
          expect(result).to.have.lengthOf(0);


      });
    it('.transferirPago()', async() => {
      est      = await Estudiante.create(expectedEst);

      let pago = await est.agregarPago(expectedPago);
      let secondEst = await Estudiante.create(utils.getMockStudent());

      await Estudiante.transferirPago(est._id, secondEst._id, pago._id);

      est = await Estudiante.findOne({'_id': est._id});
      secondEst = await Estudiante.findOne({'_id': secondEst._id});

      est.pagos.should.have.lengthOf(0);
      secondEst.pagos.should.have.lengthOf(1);
      utils.assertSameId(secondEst.pagos[0], pago)
    });
  });
});
