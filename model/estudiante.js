module.exports = class Estudiante {
    constructor(id, nombre, apellido, proyecto) {
        if (arguments.length === 3) {
            this.id = -1;
        } else if (arguments.length === 4) {
            this.id = id;
        }
        this.nombre = nombre;
        this.apellido = apellido;
        this.proyecto = proyecto;
    }
};


