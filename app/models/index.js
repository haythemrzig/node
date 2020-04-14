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
db.garantie = require("./garantie.model.js")(sequelize, Sequelize, DataTypes);


db.familleproduit = require("./familleproduit.model.js")(sequelize, Sequelize, DataTypes);
db.configurationdevis = require("./configurationdevis.model.js")(sequelize, Sequelize, DataTypes);
db.rendezvous = require("./rendezvous.model.js")(sequelize, Sequelize, DataTypes);
db.voiture = require("./voiture.model.js")(sequelize, Sequelize, DataTypes);
db.apporteur = require("./apporteur.model.js")(sequelize, Sequelize, DataTypes);
db.apporteurparticulier = require("./apporteurparticulier.model.js")(sequelize, Sequelize, DataTypes);
db.apporteursociete = require("./apporteursociete.model.js")(sequelize, Sequelize, DataTypes);


db.devis = require("./devis.model.js")(sequelize, Sequelize, DataTypes);
db.Reponse = require("./reponse.model")(sequelize, Sequelize, DataTypes);
db.devisGarantie = require("./devisGarantie.model")(sequelize, Sequelize, DataTypes);

db.voiture.hasMany(db.devis,{
  onDelete:"cascade"
});

db.compagnie.hasMany(db.devis,{
  onDelete:"cascade"
});

db.apporteur.hasMany(db.devis,{
  onDelete:"cascade"
});
db.risque.hasMany(db.familleproduit,{
  onDelete:"cascade"
});
db.risque.hasMany(db.configurationdevis,{
  onDelete:"cascade"
});

db.risque.hasMany(db.devis,{
  onDelete:"cascade"
});
db.familleproduit.hasMany(db.garantie,{
  onDelete:"cascade"
});
db.familleproduit.hasMany(db.devis,{
  onDelete:"cascade"
});
db.client.hasMany(db.rendezvous,{
  onDelete:"cascade"
});
db.client.hasMany(db.devis,{
  onDelete:"cascade"
});
db.rendezvous.belongsTo(db.client);
db.familleproduit.belongsTo(db.risque);
db.garantie.belongsTo(db.familleproduit);
db.configurationdevis.belongsTo(db.risque);
db.devis.belongsTo(db.risque);
db.devis.belongsTo(db.familleproduit);
db.devis.belongsTo(db.client);
db.devis.belongsTo(db.voiture);
db.devis.belongsTo(db.compagnie);
db.devis.belongsTo(db.apporteur);


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

db.configurationdevis.belongsToMany(db.devis, {
  through:db.Reponse,
  foreignKey: "configurationdevis_id",
  
  otherKey: "devis_id",
});
db.devis.belongsToMany(db.configurationdevis, {
  through: db.Reponse,
  foreignKey: "devis_id",
  otherKey: "configurationdevis_id"
});




db.garantie.belongsToMany(db.devis, {
  through: db.devisGarantie,
  foreignKey: "garantie_id",
  otherKey: "devis_id"
});
db.devis.belongsToMany(db.garantie, {
  through: db.devisGarantie,
  foreignKey: "devis_id",
  otherKey: "garantie_id"
});



db.ROLES = ["utilisateur", "admin", "agence","compagnie"];

module.exports = db;
