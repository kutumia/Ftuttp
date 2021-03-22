const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pd = require("./pd.model.js")(sequelize, Sequelize);
db.dd = require("./dd.model.js")(sequelize, Sequelize);
db.ad = require("./ad.model.js")(sequelize, Sequelize);
db.upazilla = require("./upazilla.model.js")(sequelize, Sequelize);
db.trainedFarmer = require("./trainedFarmer.model.js")(sequelize, Sequelize);
db.expense = require("./expense.model.js")(sequelize, Sequelize);
db.fieldDay = require("./fieldDay.model.js")(sequelize, Sequelize);
db.demonstrationFinal = require("./demonstrationFinal.model.js")(sequelize, Sequelize);
db.demonstrationInitial = require("./demonstrationInitial.model.js")(sequelize, Sequelize);
db.vermiCompostFinal = require("./vermiCompostFinal.model.js")(sequelize, Sequelize);
db.vermiCompostInitial = require("./vermiCompostInitial.model.js")(sequelize, Sequelize);
db.kormoshuchi = require("./kormoshuchi.model.js")(sequelize, Sequelize);
db.progress = require("./progress.model.js")(sequelize, Sequelize);
db.noa = require("./noa.model.js")(sequelize, Sequelize);
db.trainedFarmerUpload = require("./trainedFarmerUpload.model.js")(sequelize, Sequelize);
db.expenseUpload = require("./expenseUpload.model.js")(sequelize, Sequelize);
db.fieldDayUpload = require("./fieldDayUpload.model.js")(sequelize, Sequelize);
db.demonstrationFinalUpload = require("./demonstrationFinalUpload.model.js")(sequelize, Sequelize);
db.demonstrationInitialUpload = require("./demonstrationInitialUpload.model.js")(sequelize, Sequelize);
db.vermiCompostFinalUpload = require("./vermiCompostFinalUpload.model.js")(sequelize, Sequelize);
db.vermiCompostInitialUpload = require("./vermiCompostInitialUpload.model.js")(sequelize, Sequelize);
db.kormoshuchiUpload = require("./kormoshuchiUpload.model.js")(sequelize, Sequelize);
db.progressUpload = require("./progressUpload.model.js")(sequelize, Sequelize);
db.noaUpload = require("./noaUpload.model.js")(sequelize, Sequelize);

module.exports = db;