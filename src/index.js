// module import
import express from 'express';
import cors from 'cors'
import dotenv  from 'dotenv'
import path from 'path'
import userInViews from './lib/middleware/userInViews.js'
import models, { sequelize } from './models/index.js'
import routes from './routes/index.js'
import sgMail from '@sendgrid/mail'
import pkg from 'sequelize'
import flash from 'express-flash'

dotenv.config()
// app creation
const app = express();
const {Op} = pkg;
// middleware used
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'))
app.set('view engine', 'pug')

const __dirname = path.resolve();
// app.js
app.set('views', path.join(__dirname, './src/views'))
import session from 'express-session'
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
    app.set('trust proxy', 1);
}

app.use(session(sess));

// Load Passport
import passport from 'passport'
import Auth0Strategy from 'passport-auth0'

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

app.use(flash())
//route handler
app.use(userInViews())
app.use('/', routes.indexRoute)
app.use('/', routes.authRoute)
app.use('/', routes.dashboardRoute)
app.use('/', routes.usersRoute)
app.use('/', routes.fileRoute)
app.use('/', routes.fileQueueRoute)
app.use('/', routes.vaultRoute)

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// running every 28 minutes
setInterval(async () => {
    console.log('28 minutes passed')

    try {
      const res = await models.FileQueue.findAll({
          where: {
              status: "enqueued",
              sendAt: {
                [Op.lt] : new Date()
              }   
          },
          include: [models.File]
      })
      const promises = res.map( async (fileDetails) => {
        const emailIds = fileDetails.file.emailTo;
        console.log(emailIds)
        const msg = {
                    to: [{email: emailIds[0]}, {email: emailIds[1]}, {email: emailIds[2]}],
                    from: 'test@shield.com',
                    subject: `Vault ${fileDetails.file.vaultname} sent by Shield Whistleblower System`,
                    text: 'Hi there',
                    html: `
                    <p>Hi there.</p>
                    <p> You have been sent access to the the vault ${fileDetails.file.vaultname} by an anonymous whistleblower.</p>
                    <p>${fileDetails.file.link}</p> 
                    <p>Shield Whistleblower System is a secure and anonymous way to send evidence to news media outlets by people who want to bring evidence and news to light without the fear of threats to their life and identity.</p>
                    <p><strong>Mail Sent by Shield Whistleblower System</strong></p>`,
                };
        await sgMail.send(msg)
        console.log(fileDetails.file.vaultname, 'sent')
        await fileDetails.update({status: 'sent'})
        console.log('fileDetails.file.vaultname', 'updated as sent')
      });
    await Promise.all(promises);
   } catch (e) {
      console.error('could not resolve promise', JSON.stringify(e));
    }
}, 1680000)

// 1680000 ms = 28 mins

// 604800000 ms = 7 days

const eraseDatabaseOnSync = false;
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    // if (eraseDatabaseOnSync) {
    //     createUsersWithFiles();
    // }

    app.listen(PORT, () =>
        console.log(`app listening on port ${PORT}!`),
    );
});
