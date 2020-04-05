module.exports = (sequelize, Sequelize, DataTypes) => {
    const Risque = sequelize.define(
      "risque", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        code: {
          type: DataTypes.STRING,
            require : true
        },
        nom: {
          type: DataTypes.STRING,
            require : true
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
  
    return Risque;
  };
  