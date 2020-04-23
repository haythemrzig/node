
module.exports = (sequelize, Sequelize, DataTypes) => {
    const File = sequelize.define(
      "file", // Model name
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
        type: {
          type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
          },
          image: {
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

    return File;
  };
  