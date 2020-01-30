import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import pug from 'pug'
import path from 'path'
import createUsersWithFiles from './models/seed'
import userInViews from './lib/middleware/userInViews'
// import secured from './lib/middleware/secured'
import models, { sequelize } from './models'
import routes from './routes'

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src/public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// app.js

var session = require('express-session');

// config express-session
var sess = {
    secret: process.env.secret,
    cookie: {},
    resave: false,
    saveUninitialized: true
};

if (app.get('env') === 'production') {
    // Use secure cookies in production (requires SSL/TLS)
    sess.cookie.secure = true;
    
    // Uncomment the line below if your application is behind a proxy (like on Heroku)
    // or if you're encountering the error message:
    // "Unable to verify authorization request state"
    // app.set('trust proxy', 1);
}

app.use(session(sess));

// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// app.js

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(userInViews())
app.use('/', routes.authRoute)
app.use('/', routes.indexRoute)
app.use('/', routes.usersRoute)
app.use('/', routes.dashboardRoute)
app.use('/', routes.fileRoute)
app.use('/', routes.fileQueueRoute)

const eraseDatabaseOnSync = false;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        createUsersWithFiles();
    }

    app.listen(process.env.PORT, () =>
        console.log(`app listening on port ${process.env.PORT}!`),
    );
});
