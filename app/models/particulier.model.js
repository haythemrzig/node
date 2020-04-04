module.exports = (sequelize, Sequelize, DataTypes) => {
    const Particulier = sequelize.define(
      "particulier", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        cin: {
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
  
    return Particulier;
  };
  