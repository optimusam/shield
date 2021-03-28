import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import userModel from './user.js'
import fileModel from './file.js'
import fileQueueModel from './fileQueue.js'
dotenv.config()
const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {   
        host: process.env.HEROKU_POSTGRESQL_HOST,
        port: 5432,
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false   
    },
);
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const models = {
    User: userModel(sequelize, Sequelize.DataTypes),
    File: fileModel(sequelize, Sequelize.DataTypes),
    FileQueue: fileQueueModel(sequelize, Sequelize.DataTypes)
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});
export { sequelize };
export default models;