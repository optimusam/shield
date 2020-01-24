const file = (sequelize, DataTypes) => {
    const File = sequelize.define('file', {
        vaultname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
        }
    });

    File.associate = models => {
        File.belongsTo(models.User);
    };
    
    return File;
};

export default file;