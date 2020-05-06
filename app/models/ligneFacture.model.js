
module.exports = (sequelize, Sequelize, DataTypes) => {

    const ligneFacture = sequelize.define(
      "lignefacture", // Model name
      {     
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
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
  
    
   
    return ligneFacture;
  };
  