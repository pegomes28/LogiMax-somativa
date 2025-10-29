require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const managerRoutes = require('./routes/manager');
const driverRoutes = require('./routes/driver');
const veiculoRoutes = require('./routes/veiculo');
const tripRoutes = require('./routes/trip');
const driverRoutesApi = require('./routes/driver'); // drivers pages in manager area

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// connect db
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/sgm_logimax';
mongoose.connect(MONGO).then(()=> console.log('Mongo connected')).catch(err=> console.error(err));

// sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO })
}));

// make user available in views
app.use((req,res,next)=>{
  res.locals.currentUser = req.session.user || null;
  next();
});

// routes
app.use('/', authRoutes);
app.use('/manager', managerRoutes);
app.use('/driver', driverRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/trips', tripRoutes);

const PORT = process.env.PORT || 3011;
app.listen(PORT, ()=> console.log('Server running on', PORT));
