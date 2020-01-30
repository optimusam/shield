const file = (sequelize, DataTypes) => {
    const File = sequelize.define('file', {
        vaultname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    File.associate = models => {
        File.belongsTo(models.User)
        File.hasOne(models.FileQueue)
    };
    
    return File;
};

export default file;