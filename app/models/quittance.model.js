
module.exports = (sequelize, Sequelize, DataTypes) => {

    const Quittance = sequelize.define(
      "quittance", // Model name
      {     
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
          },
      numero: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      dateQuittance: {
        type: DataTypes.DATE
      },
      dateEcheance: {
        type: DataTypes.DATE
      },
      periodeDu: {
        type: DataTypes.DATE
      },
      perdiodeAu: {
        type: DataTypes.DATE
    },
    totalTaxe: {
      type: DataTypes.STRING
    },
    totalHt: {
      type: DataTypes.STRING
    },
    total: {
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
  
    
   
    return Quittance;
  };
  