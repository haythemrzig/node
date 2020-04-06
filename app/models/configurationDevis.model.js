
module.exports = (sequelize, Sequelize, DataTypes) => {
    const ConfigurationDevis = sequelize.define(
      "configurationdevis", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        questionnaire: {
          type: DataTypes.STRING
        },
        code: {
            type: DataTypes.STRING,
           // unique : true,
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

    return ConfigurationDevis;
  };
  