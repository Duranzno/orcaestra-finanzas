module.exports = class Pago {
    constructor(id, banco, monto, referencia, fecha, idEstudiante, proyecto) {
        if (arguments.length === 4) {
            this.id = -1;
        } else if (arguments.length === 5) {
            this.id = id;
        }
        this.banco = banco;
        this.monto = monto;
        this.referencia = referencia;
        this.fecha = fecha;
    }
};
