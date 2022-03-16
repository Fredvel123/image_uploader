const { Sequelize } = require("sequelize");

const sequelize =  new Sequelize(process.env.NAME_DB, process.env.USER_DB, process.env.PASSWD_DB, {
  host: process.env.HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000 
  },
  logging: false
})

const testDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('The database is connected successfully');
  } catch (err) {
    console.log('error, the database is not connected');
    console.error(err)
  }
}

testDatabase();

module.exports = sequelize;