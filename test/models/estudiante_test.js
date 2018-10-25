const chai   = require('chai');
chai.should();
const expect=chai.expect;
const mongoose = require('mongoose');
const mockData=require('../utils');
const Estudiante=require('../../app/models/estudiante');
const Pago=require('../../app/models/pago');

describe('Estudiantes', () => {
  before(()=>mongoose.connect('mongodb://localhost:27017/testdb',{useNewUrlParser: true}));
  after(() => mongoose.disconnect());
  afterEach(() => Estudiante.deleteMany({}));

  describe('methods', () => {
    describe('.agregarPago()',() => {
      let expectedEst,est;
      after(() => Pago.deleteMany({}));
      before(async () => {
        expectedEst = mockData.getStudent();
        est      = await Estudiante.create(expectedEst);
      });

      it('deberia agregarPago inicial', async() => {
        try{
          let expected=mockData.getPago();
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

        }
        catch (e) {
          console.error(e);
        }


      });
    });
  });
  describe('statics', () => {
    describe('.crear()', () => {
      let expected;
      before(() => {
        expected = mockData.getStudent();
      });

      it('deberia crear nuevo', async function() {
        try{
          let result=await Estudiante.crear(expected);
          result.nombre.should.be.equal(expected.nombre);
          console.log(result);
        } catch (e) {console.error(e)}
      });
      it('deberia devolver ya creado', async() => {
        try {
          const changedEmail="noemail@email.com";
          let originalResult=await Estudiante.findOne({});
          originalResult.nombre.should.be.equal(expected.nombre);
          expected.email=changedEmail;
          let changedResult=await Estudiante.crear(expected);
          changedResult.nombre.should.equal(changedEmail).but.not.equal.to(originalResult.email)

        } catch (e) {console.error(e)}
      });
    });
    describe('.crearPagoById()', () => {
      it('', async() => {
        try{
          const expectedPago=mockData.getPago();
          const expectedEst=mockData.getStudent();
          let result=await Estudiante.crear(expectedEst);
          const id=result._id;
          let resultPago=Estudiante.crearPagoById(id, expectedPago);
          resultPago.referencia.should.be.equal(expectedPago.referencia);

        } catch (e) {console.error(e)}
      });
    });
    describe('.eliminarById', async() => {
      it('eliminarById()', async() => {
        try{
          Estudiante.deleteMany({});
          const expected=mockData.getStudent();
          let result =await Estudiante.create(expected);
          await Estudiante.eliminarById(result._id);
          result = await Estudiante.find({});
          result.should.be.empty;
        }catch (e) {console.error(e)}

      });
      it('eliminarById() with Pago', async() => {
        try{
          Estudiante.deleteMany({});
          const expectedEst=mockData.getStudent();
          const expectedPago=mockData.getPago();
          let result =await Estudiante.create(expectedEst);
          await result.agregarPago(expectedPago);
          await Estudiante.eliminarById(result._id);
          result = await Pago.find({});
          result.should.be.empty;
          result = await Estudiante.find({});
          expect(result).to.be.empty;

        }catch (e) {console.error(e)}

      });
    });
  });




});
