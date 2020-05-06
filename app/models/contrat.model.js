module.exports = (sequelize, Sequelize, DataTypes) => {
    const Contrat = sequelize.define(
      "contrat", // Model name
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
        reconductible: {
          type: DataTypes.STRING
        },
        dateSignature: {
            type: DataTypes.DATE
          },
        montant: {
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
  
    return Contrat;
  };
  