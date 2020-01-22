import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import createUsersWithFiles from './models/seed'
import models, { sequelize } from './models';
import routes from './routes'

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes.authenticate)
app.use('/user', routes.user)

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        createUsersWithFiles();
    }

    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
});
