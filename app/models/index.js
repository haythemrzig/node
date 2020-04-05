const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, Sequelize, DataTypes);
db.agence = require("./agence.model.js")(sequelize, Sequelize, DataTypes);
db.utilisateur = require("./utilisateur.model.js")(sequelize, Sequelize, DataTypes);
db.compagnie = require("./compagnie.model.js")(sequelize, Sequelize, DataTypes);
db.client = require("./client.model.js")(sequelize, Sequelize, DataTypes);
db.particulier = require("./particulier.model.js")(sequelize, Sequelize, DataTypes);
db.societe = require("./societe.model.js")(sequelize, Sequelize, DataTypes);
db.risque = require("./risque.model.js")(sequelize, Sequelize, DataTypes);
db.familleproduit = require("./familleproduit.model.js")(sequelize, Sequelize, DataTypes);
db.apporteur = require("./apporteur.model.js")(sequelize, Sequelize, DataTypes);
db.apporteurparticulier = require("./apporteurparticulier.model.js")(sequelize, Sequelize, DataTypes);
db.apporteursociete = require("./apporteursociete.model.js")(sequelize, Sequelize, DataTypes);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id"
});

db.ROLES = ["utilisateur", "admin", "agence","compagnie"];

module.exports = db;
