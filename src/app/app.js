const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const airbrakeExpress = require('airbrake-js/dist/instrumentation/express');

const config = require('./config');

const createContext = require('./middleware/create-context');
const checkAuthentication = require('./middleware/check-authentication');
const { requestLogger, errorLogger } = require('./middleware/logger');
const addTokens = require('./middleware/add-tokens');
const auth = require('./middleware/authenticator');
const redisClient = require('./middleware/redis/redis-client');

const routes = require('./routes/route');

const app = express();

app.use(helmet());
app.use(compression());

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(cookieParser());

app.use(session({
  secret: 'won\'t tell because it\'s secret',
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
}));

app.use(createContext);

if (!config.skipLogging) {
  app.use(requestLogger);
  app.use(errorLogger);
}

if (process.env.NODE_ENV !== 'pact') {
  app.use(addTokens);
  app.use(auth.initialize());
  app.use(auth.session());
  app.use(checkAuthentication);
}

app.enable('view cache');
app.engine('.html', exphbs({
  defaultLayout: 'layout',
  extname: '.html'
}));
app.set('view engine', '.html');


if (config.airbrake.projectID) {
  const airbrake = require('./service/airbrake');
  app.use(airbrakeExpress.makeMiddleware(airbrake));
}

app.use(express.static(path.join(__dirname, '../../', 'public')));

app.use(config.appRoute, routes);

app.get(`${config.appRoute}/health`, (req, res) => {
  return res.status(200).send('I am ok');
});

app.get(`${config.appRoute}(/*)?`, (req, res) => {
  return res.render('home', req.tokens);
});

module.exports = app;

