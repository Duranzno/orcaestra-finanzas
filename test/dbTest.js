const chai=require("chai");
const should=chai.should();
const expect=chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const mongoose = require('mongoose');
const Pago = require('../app/models/pago');
const Estudiante=require("../app/models/estudiante");
const Grupos=require("../app/models/grupos");
const Padre=require("../app/models/padre");

const estNuevo={nombre:"Alejandro",apellido:"Duran",grupo:"Inicial"};
const padNuevo={nombre:"Jose",apellido:"Duran"};
const pagNuevo={banco: "11Banco De Venezuela",referencia: "123",monto: '6868', fecha: '2018-02-15'};
describe(" DBs",()=>{
    before(async function(){
        mongoose.connect("mongodb://localhost:27017/testdb", {useNewUrlParser: true,});
        mongoose.connection.collection("pagos");
        let a =mongoose.connection.collections;
        // await mongoose.connection.dropCollection("pagos");
        // await mongoose.connection.dropCollection("padres");
        // await mongoose.connection.dropCollection("estudiantes");

    });
    after(()=>mongoose.connection.dropDatabase());

    describe("Estudiante",function () {
        afterEach(()=>{mongoose.connection.dropCollection("estudiantes");});

        describe(".crear()",()=>{
            it(" nuevo",function (done) {
                Estudiante.crear(estNuevo)
                    .then((e)=>{
                        expect(e.nombre).to.equal(estNuevo.nombre);
                        expect(e.apellido).to.equal(estNuevo.apellido);
                        expect(e.grupo).to.equal(estNuevo.grupo);
                        done();
                    })
                    .catch(err=>done(err))

            });
        });

    });
    describe(" Padres",function(){
        afterEach(function(){mongoose.connection.dropCollection("padres")});

        beforeEach(async function(){
            let padre= await Padre.crear(padNuevo);
        });
        it("Mostrar Todo",async function(){
            let h=await Estudiante.crear(estNuevo);
            let p=await Padre.crear(padNuevo);
            await p.agregarHijo(h);
            let padres=await Padre.find({})/*.populate("pagos")*/.populate("hijos");
            console.log(JSON.stringify(padres));
            padres[0].pagos.should.be.a.instanceOf(Array);
            padres[0].hijos.should.be.a.instanceOf(Array);
            padres[0].pagos.should.have.a.lengthOf(0);
            padres[0].hijos.should.have.a.lengthOf(1);
        });

        it("Busqueda",(done)=>{
            Padre.find({})
            .then((result) => {
                expect(result).to.be.an.instanceOf(Array);
                expect(result.length).to.equal(1);
                expect(result[0].nombre).to.equal("Jose");
                expect(result[0].apellido).to.equal("Duran");
                done();
            }).catch((err) => {
                done(err);
            });

        });
        it("Creación de Pagos Compartidos",async function(){
            let pago=await Pago.crear(pagNuevo);
            let p=await Padre.crear(padNuevo);
            await p.agregarPago(pago);
            padre.pagos[0].should.equal(pago._id);
            // padre.hijos[0].pagos[0].should.equal(pago._id)

        });
        xit("Eliminación de Pagos Compartidos");
        xit("Eliminado");
        xit("Cambiar Representante");

        describe("Hijos",()=>{
            const h={
                nombre:"Alejandro",
                apellido:"Duran",
                grupo:"Inicial",
            };
            beforeEach(()=>Estudiante.crear(h));

            afterEach(function(done){
                mongoose.connection.dropCollection("estudiantes");
                done();
            });

            it("Añadido creado",function(done){
                Padre.find({"nombre":"Jose"})
                    .then((result) => {
                        expect(result[0]).to.be.an.instanceOf(Object);
                        expect(result.length).to.equal(1);
                        expect(result[0].nombre).to.equal("Jose");
                        expect(result[0].apellido).to.equal("Duran");

                        let hijo=result[0].agregarHijo(h)
                            .then((result)=>{
                                expect(result.nombre).to.equal(h.nombre);
                                expect(result.apellido).to.equal(h.apellido);
                                expect(result.grupo).to.equal(h.grupo);
                                done();})
                            .catch((err)=>{done(err)});})
                    .catch((err) => done(err));
            });
                //
                //

            it("Añadido por id",async function(){
                let hijo=await Estudiante.findOne(h);

                let padre=await Padre.findOne({"nombre":"Jose"});
                padre.should.be.an.instanceOf(Object);
                padre.nombre.should.equal("Jose");
                padre.apellido.should.equal("Duran");

                await padre.agregarHijo(hijo);
                let padreFound=await Padre.findOne({"nombre":"Jose"}).populate({"path":"hijos"});
                padreFound.hijos[0].nombre.should.equal(h.nombre);
            });
            });

        });

    });

