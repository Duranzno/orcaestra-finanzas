// Require
const mongoose = require('mongoose'),
    Pago = require('../app/models/pago'),
    Estudiante=require("../app/models/estudiante"),
    Grupos=require("../app/models/grupos"),
    Padre=require("../app/models/representante");
const TAG = "todoSpec|";
const pagos = [{
    banco: "00Banesco",
    referencia: "125",
    monto: `69`,
    fecha: '2018-01-15'
  }, {
    banco: "11Banco De Venezuela",
    referencia: "123",
    monto: '6868',
    fecha: '2018-02-15'
  }, {
    banco: "22Banesco",
    referencia: "124",
    monto: '500',
    fecha: '2018-01-02',
  
  }, {
    banco: "33Banco Fondo Comun",
    monto: '666',
    referencia: "126",
    fecha: '2018-03-02',
  },
      {
          banco: "44Comun",
          monto: '666',
          referencia: "126",
          fecha: '2018-03-02',
      },
      {
          banco: "55Comun",
          monto: '666',
          referencia: "126",
          fecha: '2018-03-02',
      }];
// const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/testdb';
describe("| DBs",()=>{
    it("null",()=>{
        expect(null).toBeNull();
        expect(null).toBeDefined();
        let a=undefined
        expect(a).toBeUndefined();
            
    })
    beforeAll(()=>mongoose.connect("mongodb://localhost:27017/testdb", {useNewUrlParser: true,}));
    afterAll(()=>{mongoose.connection.dropDatabase();})
    describe("|Pagos",()=>{   
        
        afterAll(()=>{
            mongoose.connection.dropCollection("pagos");
        });         
        
        it("|should save to Database",(done)=>{
            var pago=new Pago();
            pago.banco="BOFA";
            pago.referencia="1";
            pago.fecha='2018-01-15';
            pago.monto="100";
            pago.save((err)=>{
                expect(err).toBeNull();
                Pago.find(function(err,result){
                    // expect(result.length).toBe(1);
                    expect(result[0].banco).toBe("BOFA");
                    expect(result[0].referencia).toEqual('1');
                    done()

                });
                // asyncSpecWait();
            })
            
        })
    })

    describe("|Estudiantes",()=>{
        afterAll(()=>{
            
            mongoose.connection.dropCollection("estudiantes");
        });
        const est= {
            nombre: 'Alejandro',
            apellido: 'Duran',
            email: 'aledurax@gmail.com',
            tlf: "1",
            cedula: "214125",
            grupo: Grupos[Math.floor(Math.random() * Grupos.length)],
        }
        it("crear nuevo",(done)=>{
            Estudiante.crear(est)
            .then((result) => {
                expect(result).toBeDefined();
                expect(result.nombre).toBe(est.nombre);
                expect(result.apellido).toBe(est.apellido);
            }).catch((err) => {
                expect(err).toBeNull();
            });
            done();
        })
    })

    describe("| Padres",function(){
        beforeEach((done)=>{
            let padre=new Padre();
            padre.nombre="Jose";
            padre.apellido="Duran";
            padre.save();
            done();
        });

        afterEach(()=>{  
            mongoose.connection.dropCollection("padres");
        });   

        it("|Busqueda",(done)=>{
            Padre.find({"nombre":"Jose"})
            .then((result) => {
                expect(result[0]).toBeDefined(); 
                expect(result.length).toEqual(1);
                expect(result[0]).toBe("Jose");
                expect(result[0].apellido).toBe("Duran")
                expect(result[0].hello()).toBe("hello")
            
            }).catch((err) => {expect(err).toBeNull();                });   // expect(result)
            
            done();
        });
        
    //     // describe("|Hijos",()=>{
    //     //     // afterAll(()=>mongoose.connection.dropCollection("estudiantes"));
    //     //     it("| Añadido creado",(done)=>{
    //     //         let hijo=new Estudiante();
    //     //         hijo.nombre="Alejandro";
    //     //         hijo.apellido="Duran";
    //     //         hijo.grupo="IMB";
    //     //         hijo.save();

    //     //         let padre=Padre.findOne({})
    //     //         .then((result) => {
    //     //             expect(result.nombre).toBe("Jose");
    //     //             expect(padre.hello()).toBe("hello")
    //     //             let hijo=padre.agregarHijo(hijo)
                    
    //     //             Padre.findOne({})
    //     //             .then((result) => {
    //     //                 expect(result.hijos[0]).toBeDefined;
    //     //                 // expect(result.hijos[0].nombre).toBe("Alejandro");
    //     //                 // expect(result.hijos[0].nombre).toBe("Duran");
    //     //                 // expect(result.hijos[0].nombre).toBe("IMB");
    //     //             })
    //     //             .catch((err) => expect(err).toBeNull());
    //     //         }).catch((err) =>expect(err).toBeNull());
    //     //         done();
    //     //     });

    //     // //     xit("Añadido por id",(done)=>{    
    //     // //         done();
    //     // //     });

    //     // //     xit("Eliminado",(done)=>{    
    //     // //         done();
    //     // //     });
            
    //     // //     xit("Creación de Pagos Compartidos",(done)=>{    
    //     // //         done();
    //     // //     });
            
    //     // //     xit("Eliminación de Pagos Compartidos",(done)=>{    
    //     // //         done();
    //     // //     });
    //     // })
    })
    
    

})