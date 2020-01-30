const fileQueue = (sequelize, DataTypes) => {
    const FileQueue = sequelize.define('filequeue', {
        sendAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'enqueued'
        }
    });

    FileQueue.associate = models => {
        FileQueue.belongsTo(models.User)
        FileQueue.belongsTo(models.File)
    };

    return FileQueue;
};

export default fileQueue;