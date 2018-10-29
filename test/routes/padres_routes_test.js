//TEST Imports
require('chai').should();
const request = require('supertest'),
  apiPort=3000,
  expect=require('chai').expect;
  utils=require('../utils');

const addr="/api/padres",
  {Padre,Estudiante,Pago}=require("../../src/models"),
  pd=require('../../src/utils/excel/parseDate');
//App Imports
const mongoose = require('mongoose'),
  db = 'mongodb://localhost:27017/restdb',
  app = require('../../src/app')(mongoose);


describe(addr, function(){
  let expectedEst,est,expPad,pad,expectedPago,pago;
  let server;
  before(async function(){
    await mongoose.connect(db,{useNewUrlParser: true});
    Padre.deleteMany({});
    Padre.deleteMany({});
    Pago.deleteMany({});
    server = app.listen(apiPort);
  });
  beforeEach(async function() {
    expPad=utils.getMockPadre();
    expectedEst=utils.getMockStudent();
    expectedPago = utils.getMockPago();
    pad   = await Padre.crear(expPad);
    est   =await pad.agregarHijo(expectedEst);
    pago  = await pad.agregarPago(expectedPago);
  });
  afterEach(async () => {
    await Padre.deleteMany({});
    await Estudiante.deleteMany({});
    await Pago.deleteMany({});
  });
  after(async() => {
    await Padre.deleteMany({});
    await Pago.deleteMany({});
    await Padre.deleteMany({});

    await mongoose.disconnect();
    await server.close();
  });

  it(`GET ${addr}`, function(done){
    request(app)
      .get(addr)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        // console.log(err);
        // console.log(JSON.stringify(res.body));
        expect(res.body).to.be.an('array');
        utils.assertSameId(res.body[0],pad);
        utils.assertSameId(res.body[0],pad);
        done()
      })
  });

  it(`GET ${addr}/id`, function(done){
    request(app)
      .get(`${addr}/${pad._id}`)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        utils.assertSameId(res.body,pad);
        utils.assertSameId(res.body.pagos[0],pago);
        expect(res.body.pagos[0].banco).to.be.equal(pago.banco);
        done()
      })
  });

  describe(`GET ${addr}/:ano/:mes`, () => {
    let expPag=[utils.getMockPago(),utils.getMockPago(),
      utils.getMockPago()];
    let expPad;

    before(async function()  {
      Pago.deleteMany({});
      Padre.deleteMany({});
      expPag[0].fecha=pd.parseDate('12/17/1996');
      expPag[1].fecha=pd.parseDate('01/17/2018');
      expPag[2].fecha=pd.parseDate('05/17/200');
      expPad=[
        await Padre.crear(utils.getMockStudent()),
        await Padre.crear(utils.getMockStudent()),
        await Padre.crear(utils.getMockStudent()),
      ];
      await Promise.all([
          expPad[0].agregarPago(expPag[0]),
          expPad[1].agregarPago(expPag[0]),
          expPad[2].agregarPago(expPag[1])
        ])
    });
    it('deberia devolverme solo los del diciembre 96', async function() {
      const ano=1996,mes=12;
      let {body}=await request(app)
        .get(`${addr}/${ano}/${mes}`)
        .expect(200);
      console.log(JSON.stringify(body));
      body.should.have.lengthOf(2);
    });
  });
  // it(`GET ${addr}/:banco`);
  it(`POST ${addr}`, async function() {
    await Padre.deleteMany({});
    expectedEst = utils.getMockStudent();
    await request(app)
      .post(`${addr}`)
      .send(expectedEst)
      .set('Accept', 'application/json')
      .expect(200);
    try {
      let result=await Padre.findOne({});
      result.tlf.should.equal(expectedEst.tlf.toString());
      result.email.should.equal(expectedEst.email)
    } catch (e) {
      console.error(e);
    }
  });

  it(`PUT ${addr}/:id` ,async function() {
    try{
    await Padre.deleteMany({});
    pad=await Padre.crear(expPad);
    expPad.nombre="Diana";
    expPad.apellido="Surga";

    await request(app)
      .put(`${addr}/${pad._id}`)
      .send(expPad)
      .set('Accept', 'application/json')
      .expect(200);

    let result=await Padre.findOne({});

    result.nombre.should.equal("Diana");
    result.apellido.should.equal("Surga");
    result.tlf.should.equal(expPad.tlf.toString());
    result.email.should.equal(expPad.email)

    }
    catch (e) {console.error(e)}
  });

  it(`DELETE ${addr}/:id`,async function(){
    (await Pago.find({})).should.have.lengthOf(1);
    (await Padre.find({})).should.have.lengthOf(1);
    (await Estudiante.find({})).should.have.  lengthOf(1);

    await request(app)
      .delete(`${addr}/${pad._id}`)
      .expect(200);


    (await Pago.find({})).should.have.lengthOf(0);
    (await Padre.find({})).should.have.lengthOf(0);
    (await Estudiante.find({})).should.have.lengthOf(0);

  });

  it(`POST ${addr}/:id/pago`,async function() {
    await Pago.deleteMany({});
    (await Pago.find({})).should.have.lengthOf(0);
    expectedPago.referencia="666";
    try {
      await request(app)
        .post(`${addr}/${pad._id}/pago`)
        .send(expectedPago)
        .expect(200);
      let result=await Padre.findOne({}).populate({"path":"pagos"});
      result.pagos[0].referencia.should.equal(expectedPago.referencia);
      result.pagos[0].banco.should.equal(expectedPago.banco);
    } catch (e) {console.error(e)}
  });
  it(`POST ${addr}/:id/hijo`,async function() {
    await Estudiante.deleteMany({});
    (await Estudiante.find({})).should.have.lengthOf(0);
    try {
      await request(app)
        .post(`${addr}/${pad._id}/hijo`)
        .send(expectedEst)
        .expect(200);
      let result=await Padre.findOne({}).populate({"path":"hijos"});
      result.hijos[0].nombre.should.equal(expectedEst.nombre);
      result.hijos[0].apellido.should.equal(expectedEst.apellido);
    } catch (e) {console.error(e)}
  });

  it(`GET ${addr}/:id/:secId/:pagoId/pago`,async function() {
    await Pago.deleteMany({});
    let secPad=await Padre.crear(utils.getMockPadre());
    await request(app)
      .get(`${addr}/${pad._id}/${secPad._id}/${pago._id}/pago`)
      .expect(200);
    (await Padre.findOne({"_id":pad._id})).pagos.should.have.lengthOf(0);
    (await Padre.findOne({"_id":secPad._id})).pagos.should.have.lengthOf(1);
  });

  it(`GET ${addr}/:id/:secId/:hijoId/hijo`,async function() {
    await Estudiante.deleteMany({});
    let secPad=await Padre.crear(utils.getMockPadre());
    await request(app)
      .get(`${addr}/${pad._id}/${secPad._id}/${est._id}/hijo`)
      .expect(200);
    (await Padre.findOne({"_id":pad._id})).hijos.should.have.lengthOf(0);
    (await Padre.findOne({"_id":secPad._id})).hijos.should.have.lengthOf(1);
  });
});
