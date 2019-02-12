//TEST Imports
require('chai').should();
const request = require('supertest'),
  apiPort=3000,
  expect=require('chai').expect;
  utils=require('../utils');

const addr="/api/estudiantes",
  {Estudiante,Pago}=require("../../src/models"),
  pd=require('../../src/utils/excel/parseDate');
//App Imports
const mongoose = require('mongoose'),
  db = process.env.ORCAESTRA_DB_TEST,
  app = require('../../src/app')(mongoose);


describe(addr, function(){
  let expectedEst,est,expectedPago,pago;
  let server;
  before(async function(){
    await mongoose.connect(db,{useNewUrlParser: true});
    Estudiante.deleteMany({});
    Pago.deleteMany({});
    server = app.listen(apiPort);
  });
  beforeEach(async function() {
    expectedEst=utils.getMockStudent();
    expectedPago = utils.getMockPago();
    est=await Estudiante.crear(expectedEst);
    pago = await est.agregarPago(expectedPago);

  });
  afterEach(async () => {
    await Estudiante.deleteMany({});
    await Pago.deleteMany({});
  });
  after(async() => {
    await Estudiante.deleteMany({});
    await Pago.deleteMany({});
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
        expect(res.body).to.be.an('array');
        utils.assertSameId(res.body[0],est);
        done()
      })
  });

  it(`GET ${addr}/id`, function(done){
    request(app)
      .get(`${addr}/${est._id}`)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        utils.assertSameId(res.body,est);
        utils.assertSameId(res.body.pagos[0],pago);
        expect(res.body.pagos[0].banco).to.be.equal(pago.banco);
        done()
      })
  });

  // xit(`GET ${addr}/:banco`, async() => {});
  // xit(`GET ${addr}/:ano/:mes`);
  describe(`GET ${addr}/:ano/:mes`, () => {
    let expPag=[utils.getMockPago(),utils.getMockPago(),
      utils.getMockPago()];
    let expEst;

    before(async function()  {
      Pago.deleteMany({});
      Estudiante.deleteMany({});
      expPag[0].fecha=pd.parseDate('12/17/1996');
      expPag[1].fecha=pd.parseDate('01/17/2018');
      expPag[2].fecha=pd.parseDate('05/17/200');
      expEst=[
        await Estudiante.crear(utils.getMockStudent()),
        await Estudiante.crear(utils.getMockStudent()),
        await Estudiante.crear(utils.getMockStudent()),
      ];
      await Promise.all([
          expEst[0].agregarPago(expPag[0]),
          expEst[1].agregarPago(expPag[1]),
          expEst[2].agregarPago(expPag[0])
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
  xit(`GET ${addr}/:banco` , async() => {

  });
  it(`POST ${addr}`, async function() {
    await Estudiante.deleteMany({});
    expectedEst = utils.getMockStudent();
    await request(app)
      .post(`${addr}`)
      .send(expectedEst)
      .set('Accept', 'application/json')
      .expect(200);
    try {
      let result=await Estudiante.findOne({});
      result.tlf.should.equal(expectedEst.tlf.toString());
      result.email.should.equal(expectedEst.email)
    } catch (e) {
      console.error(e);
    }
  });

  it(`PUT ${addr}/:id` ,async function() {
    try{
    await Estudiante.deleteMany({});
    est=await Estudiante.crear(expectedEst);
    expectedEst.nombre="Diana";
    expectedEst.apellido="Surga";

    await request(app)
      .put(`${addr}/${est._id}`)
      .send(expectedEst)
      .set('Accept', 'application/json')
      .expect(200);

    let result=await Estudiante.findOne({});

    result.nombre.should.equal("Diana");
    result.apellido.should.equal("Surga");
    result.grupo.should.equal(expectedEst.grupo);
    result.tlf.should.equal(expectedEst.tlf.toString());
    result.email.should.equal(expectedEst.email)

    }
    catch (e) {console.error(e)}
  });

  it(`DELETE ${addr}/:id`,async function(){
    let result=await Estudiante.find({});
    let p=await Pago.find({});
    p.should.have.lengthOf(1);
    result.should.have.lengthOf(1);

    await request(app)
      .delete(`${addr}/${est._id}`)
      .expect(200);

    p=await Pago.find({});
    result=await Estudiante.find({});
    p.should.have.lengthOf(0);
    result.should.have.lengthOf(0);
  });

  it(`POST ${addr}/:id/pago`,async function() {
    await Pago.deleteMany({});
    (await Pago.find({})).should.have.lengthOf(0);
    expectedPago.referencia="666";
    try {
      await request(app)
        .post(`${addr}/${est._id}/pago`)
        .send(expectedPago)
        .expect(200);
      let result=await Estudiante.findOne({}).populate({"path":"pagos"});
      result.pagos[0].referencia.should.equal(expectedPago.referencia);
      result.pagos[0].banco.should.equal(expectedPago.banco);

    } catch (e) {console.error(e)}
  });

});
