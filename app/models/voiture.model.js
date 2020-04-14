module.exports = (sequelize, Sequelize, DataTypes) => {
    const Voiture = sequelize.define(
      "voiture", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        anneeFab: {
          type: DataTypes.STRING
        },
        modele: {
            type: DataTypes.STRING
          },
        immatriculation: {
          type: DataTypes.STRING
        },
        dateAcquisition: {
          type: DataTypes.DATE
        },
        adresse: {
          type: DataTypes.STRING
        },
        marque: {
            type: DataTypes.STRING
          },
          trims: {
            type: DataTypes.STRING
          },
          carburant: {
            type: DataTypes.STRING
          },
          dateMiseEnCirculation: {
            type: DataTypes.DATE
          },
          codePostal: {
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
  
    return Voiture;
  };
  