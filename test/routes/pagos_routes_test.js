//TEST Imports
require('chai').should();
const request = require('supertest'),
  apiPort=3000,
  expect=require('chai').expect;
  utils=require('../utils');

const {Pago}=require("../../src/models");
//App Imports
const mongoose = require('mongoose'),
  db = process.env.ORCAESTRA_DB_TEST,
  app = require('../../src/app')(mongoose);


describe('/api/pagos', function(){
  let expectedPago,pago;
  let server;
  before(async function(){
    await mongoose.connect(db,{useNewUrlParser: true});
    server = app.listen(apiPort);

  });
  beforeEach(async function() {
    expectedPago=utils.getMockPago();
    pago=await Pago.crear(expectedPago);
  });
  after(() => {
    mongoose.disconnect();
    server.close();
  });
  afterEach(() => Pago.deleteMany({}));

  it(`GET /api/pagos/:pagoid`, function(done){
    request(app)
      .get(`/api/pagos/${pago._id}`)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        // console.log(err);
        expect(res.body._id).to.equal(pago._id.toString());
        expect(res.body.referencia).to.equal(expectedPago.referencia);
        done()
      })
  });
  it(`PUT /api/pagos/:pagoid`, function(done){
    const secondPago=utils.getMockPago();
    pago.referencia=secondPago.referencia;
    request(app)
      .put(`/api/pagos/${pago._id}`)
      .send(pago)
      .set('Accept','application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.banco).to.equal(expectedPago.banco);
        expect(res.body.referencia).to.equal(secondPago.referencia);

        done()
      })
  });
});
