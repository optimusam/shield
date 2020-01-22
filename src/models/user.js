const user = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastLogin: {
            type: DataTypes.DATE
        }
    })

    User.associate = models => {
        User.hasMany(models.File, { onDelete: 'CASCADE' });
    };

    User.findByLogin = async login => {
        let user = await User.findOne({
            where: { username: login },
        });
        return user;
    };

    return User;
};

export default user;

