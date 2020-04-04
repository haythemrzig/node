module.exports = (sequelize, Sequelize, DataTypes) => {
    const Utilisateur = sequelize.define(
      "utilisateur", // Model name
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
        prenom: {
          type: DataTypes.STRING,
        },
        cin: {
            type: DataTypes.STRING,
          },
          date_naissance :{
            type: DataTypes.DATE,
          },
          tel: {
            type: DataTypes.STRING,
          },
          autreTel: {
            type: DataTypes.STRING,
          },
          ville: {
            type: DataTypes.STRING,
          },
          codePostal: {
            type: DataTypes.STRING,
          },
          role: {
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
  
    return Utilisateur;
  };
  