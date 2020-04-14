module.exports = (sequelize, Sequelize, DataTypes) => {
    const Devis = sequelize.define(
      "devis", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        numeroPolice: {
          type: DataTypes.STRING
        },
        numeroPoliceExterne: {
            type: DataTypes.STRING
          },
        dateEffet: {
          type: DataTypes.DATE
        },
        dateFin: {
          type: DataTypes.DATE
        },
        echeancePrincipale: {
          type: DataTypes.STRING
        },
        modeFractionnement: {
          type: DataTypes.STRING
        },
        delaiPreavis: {
          type: DataTypes.STRING
        },
        montantAgence: {
          type: DataTypes.STRING
        },
        montantTTC: {
          type: DataTypes.STRING
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
  
    return Devis;
  };
  