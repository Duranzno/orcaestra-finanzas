//TEST Imports
require('chai').should();
const supertest = require('supertest'),
  apiPort=3000,
  api = supertest(`http://localhost:${apiPort}`),
  utils=require('../utils'),
  {Pago}=require("../../src/models");

//App Imports
const mongoose = require('mongoose'),
  db = 'mongodb://localhost:27017/restTest',
  app = require('../../src/app')(mongoose);


describe('/pago', () => {
  // let expectedPago,pago;
  let server;
  before(async () => {
    await mongoose.connect(db,{useNewUrlParser: true});
    server = app.listen(apiPort);
    expectedPago=utils.getMockPago();
    pago=await Pago.crear(expectedPago);
  });
  after(() => {
    mongoose.disconnect();
    server.close();

  });
  afterEach(() => Pago.deleteMany({}));

  it(`deberia no implementado `, function(done){
    api.get(`/`)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body);
        res.body.should.equal("hello world");
        done()
      })
  });
});
