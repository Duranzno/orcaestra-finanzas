module.exports = {
  development: {
    username: "postgres",
    password: 123,
    database: "orkesta",
    // host: 127.0.0.1,
    dialect: "postgres",
    operatorsAliases: false

  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    // host: 127.0.0.1,
    dialect: "postgres",
    operatorsAliases: false
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: "postgres",
    operatorsAliases: false
  }
};
