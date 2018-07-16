module.exports = class Estudiante {
    proyectos = [
        "Coro de Padres",
        "Inicial",
        "Alma llanera",
        "IMA",
        "IMB",
        "PMA",
        "PMB ",
        "Pre Infantil",
        "Infantil",
        "Pre Juvenil",
        "Juvenil"
    ];
    constructor(id, nombre, apellido, proyecto) {
        if (arguments.length === 3) {
            this.id = -1;
        } else if (arguments.length === 4) {
            this.id = id;
        }
        this.nombre = nombre;
        this.apellido = apellido;
        this.proyecto = proyecto;
    } ;
};
//UNA PERSONA PUEDE ESTAR EN DOS CURSOS


