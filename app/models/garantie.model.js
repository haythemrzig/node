
module.exports = (sequelize, Sequelize, DataTypes) => {
    const Garantie = sequelize.define(
      "garantie", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        niveau: {
          type: DataTypes.STRING
        },
        nom: {
            type: DataTypes.STRING
          },
          montantAssure: {
            type: DataTypes.STRING
          },
          montantFranchise: {
            type: DataTypes.STRING
          },
     
      },
      {
        // Options
        timestamps: true,
        underscrored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    );

    return Garantie;
  };
  