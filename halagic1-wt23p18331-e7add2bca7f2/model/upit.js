const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

module.exports = function(sequelize, DataTypes){
    const Upit = sequelize.define("Upit", {
        tekst_upita: Sequelize.STRING
    });
    return Upit;
}