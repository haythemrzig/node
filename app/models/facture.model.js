
module.exports = (sequelize, Sequelize, DataTypes) => {

    const Facture = sequelize.define(
      "facture", // Model name
      {     
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
          },
      description: {
        type: DataTypes.STRING
      },
      cotisationHT: {
        type: DataTypes.STRING
      },
      taxe: {
        type: DataTypes.STRING
      },
      cotisationTTC: {
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
  
    
   
    return Facture;
  };
  