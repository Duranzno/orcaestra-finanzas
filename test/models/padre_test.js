const chai   = require('chai');
chai.should();
const expect=chai.expect;
const mongoose = require('mongoose');
const mockData=require('../utils');
const Pago=require('../../app/models/pago');
const Padre=require('../../app/models/padre');
const Estudiante=require('../../app/models/estudiante');

describe('Padres', function() {
  let expectedPad;
  before(async ()=>{
    expectedPad=mockData.getPadre();
    await mongoose.connect('mongodb://localhost:27017/testdb',{useNewUrlParser: true})
  });

  after(() => mongoose.disconnect());
  afterEach(() => {
    Padre.deleteMany({});
  });
  describe('methods', () => {
    it('.agregarHijo()', async () => {
      const expectedEst=mockData.getStudent();
      let resultPad=await Padre.create(expectedPad);
      await resultPad.agregarHijo(expectedEst);
      let resultEst=await Estudiante.findOne({});
      resultPad=await Padre.findOne({});
      resultPad.hijos.should.contain(resultEst._id);
    });
    it('.agregarPago()', async() => {
        try{
          let expected=mockData.getPago();
          console.log(expected);
          let result=await Padre.agregarPago(expected);
          console.log(result);
          pad=await Padre.findOne({});
          console.log(pad);
          pad.pagos.should.include(result._id);
          result.referencia.should.be.equal(expected.referencia);
          result.banco.should.be.equal(expected.banco);
          result=await Pago.findOne({});
          result.referencia.should.be.equal(expected.referencia);
          result.banco.should.be.equal(expected.banco);
        }
        catch (e) {console.error(e);}
    });
    it('.eliminar()', async () => {

    });
    it('.eliminarPago()', async () => {

    });
    afterEach(() => {
      Padre.deleteMany({});
      Estudiante.deleteMany({});
      Pago.deleteMany({});
    });
  });
  describe('statics', () => {
    describe('.agregarHijo()', () => {

    });
    describe('.crearPagoById()', () => {
      it('', async() => {
        try{
          const expectedPago=mockData.getPago();
          const expectedPad=mockData.getPadre();
          let result=await Padre.crear(expectedPad);
          const id=result._id;
          let resultPago=Padre.crearPagoById(id, expectedPago);
          resultPago.referencia.should.be.equal(expectedPago.referencia);
        } catch (e) {console.error(e)}
      });

    });
    describe('.crear()', () => {

    });
    describe('.eliminarById', async() => {
      it('eliminarById()', async() => {
        try{
          Padre.deleteMany({});
          const expected=mockData.getPadre();
          let result =await Padre.create(expected);
          await Padre.eliminarById(result._id);
          result = await Padre.find({});
          result.should.be.empty;
        }catch (e) {console.error(e)}

      });
      it('eliminarById() with Pago', async() => {
        try{
          Padre.deleteMany({});
          const expectedPad=mockData.getPadre();
          const expectedPago=mockData.getPago();
          let result =await Padre.create(expectedPad);
          await result.agregarPago(expectedPago);
          await Padre.eliminarById(result._id);
          result = await Pago.find({});
          result.should.be.empty;
          result = await Padre.find({});
          expect(result).to.be.empty;

        }catch (e) {console.error(e)}

      });
    });
  });
});

