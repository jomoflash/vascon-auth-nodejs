const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('hbs')

const UserRoutes = require('./api/routes/users');
const AdminRoutes = require('./api/routes/admins');
const WebRoutes = require('./web-server/web.server');

const app = express();

app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));

// api routes
app.use('/user', UserRoutes);
app.use('/admin', AdminRoutes);


const path = require('path');


// Define paths for Express config
const publicDirectoryPath = './web-server/public'
const viewsPath = path.join(__dirname, './web-server/templates/views')
const partialsPath = path.join(__dirname, './web-server/templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// web server routes
app.use('', WebRoutes )



module.exports = app;