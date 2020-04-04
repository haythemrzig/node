module.exports = (sequelize, Sequelize, DataTypes) => {
    const Societe = sequelize.define(
      "societe", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        raison_sociale: {
          type: DataTypes.STRING
        },
        fax: {
          type: DataTypes.STRING
        },
        numero_registre: {
          type: DataTypes.STRING
        },
        date_creation: {
          type: DataTypes.DATE
        },
        siteWeb: {
          type: DataTypes.STRING
        },
        Clientid: {
            type: DataTypes.UUID,
          }
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );
  
    return Societe;
  };
  