module.exports = (sequelize, Sequelize, DataTypes) => {
    const Client = sequelize.define(
      "client", // Model name
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
        adresse: {
            type: DataTypes.STRING
          },
        email: {
          type: DataTypes.STRING
        },
        tel: {
          type: DataTypes.STRING
        },
        mobile: {
          type: DataTypes.STRING
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
  
    return Client;
  };
  