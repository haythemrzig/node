module.exports = (sequelize, Sequelize, DataTypes) => {
    const ApporteurParticulier = sequelize.define(
      "ApporteurParticulier", // Model name
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
        Apporteurid: {
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
  
    return ApporteurParticulier;
  };
  