module.exports = (sequelize, Sequelize, DataTypes) => {
    const Rendezvous = sequelize.define(
      "rendezvous", // Model name
      {
        // Attributes
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
          },
          description: {
            type: DataTypes.STRING
          },
          date: {
            type: DataTypes.DATE
          }, 
          lieu: {
              type: DataTypes.STRING,
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
  
    return Rendezvous;
  };
  