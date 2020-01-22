const file = (sequelize, DataTypes) => {
    const File = sequelize.define('file', {
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    File.associate = models => {
        File.belongsTo(models.User);
    };

    return File;
};

export default file;