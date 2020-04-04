module.exports = (sequelize, Sequelize, DataTypes) => {
    const Compagnie = sequelize.define(
      "compagnie", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        nom: {
          type: DataTypes.STRING,
        },
        siteWeb: {
          type: DataTypes.STRING,
        },
        specialite: {
            type: DataTypes.STRING,
          },
          tel: {
            type: DataTypes.STRING,
          },
          status: {
            type: DataTypes.STRING,
          },
        Userid: {
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
  
    return Compagnie;
  };
  