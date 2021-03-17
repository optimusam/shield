import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    process.env.HEROKU_POSTGRESQL_URL,
    {   
        host: process.env.HEROKU_POSTGRESQL_HOST,
        port: 5432,
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: true
        }   
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
    User: sequelize.import('./user'),
    File: sequelize.import('./file'),
    FileQueue: sequelize.import('./fileQueue')
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});
export { sequelize };
export default models;