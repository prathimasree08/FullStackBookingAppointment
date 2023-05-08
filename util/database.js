const Sequelize = require("sequelize");
const sequelize = new Sequelize("book-appointment","root","root",{
    dialect:"mysql",
    host:"localhost"
});

module.exports = sequelize;