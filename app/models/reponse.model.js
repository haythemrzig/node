
module.exports = (sequelize, Sequelize, DataTypes) => {

    const Reponse = sequelize.define(
      "reponse", // Model name
      {     
        reponse: {
          type: DataTypes.STRING,
            require : true
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
  
    
   
    return Reponse;
  };
  