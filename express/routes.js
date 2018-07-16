module.exports = function (app) {
    const pagoControlador = require("./pagoControlador");
    const studentControlador = require("./pagoControlador");

    // Pagina Principal
    app.get("/", (req, res) => {
        res.render("../public/views/index")
    });
    app.get("/table", (req, res) => {
        res.render("../public/views/tabletest")
    });
    // app.post("/api/addPago", pagoControlador.create());

    // app.post("/api/addStudent", studentControlador.create());
};
