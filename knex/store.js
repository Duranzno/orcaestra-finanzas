const knex = require("knex")(require("./knexfile"));
module.exports = {
    createStudent({nombre, apellido, proyecto}) {
        console.log(`Se obtuvo ${nombre} ${apellido} de ${proyecto}`);
        return Promise.resolve();
    }
};
