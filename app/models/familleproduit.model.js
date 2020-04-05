module.exports = (sequelize, Sequelize, DataTypes) => {
    const FamilleProduit = sequelize.define(
      "familleproduit", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        nom: {
          type: DataTypes.STRING
        },
        code: {
            type: DataTypes.STRING,
           // unique : true,
           require : true
          },
        Risqueid: {
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
  
    return FamilleProduit;
  };
  