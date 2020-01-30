const user = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
        },
        authId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
        },
        lastLogin: {
            type: DataTypes.DATE
        }
    })

    User.associate = models => {
        User.hasMany(models.File, { onDelete: 'CASCADE' });
        User.hasMany(models.FileQueue, { onDelete: 'CASCADE' });
    };

    User.findByLogin = async login => {
        let user = await User.findOne({
            where: { authId: login },
        });
        return user;
    };

    return User;
};

export default user;

