module.exports = (sequelize, Sequelize, DataTypes) => {
    const Avenant = sequelize.define(
      "avenant", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        dateEffet: {
          type: DataTypes.DATE
        },
        dateFin: {
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
  
    return Avenant;
  };
  