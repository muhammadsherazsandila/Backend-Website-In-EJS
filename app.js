const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();
require("./config/mongooseConnection")

app.use(cookieParser());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views');


const ownerRouter = require('./routes/ownerRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const mainRouter = require('./routes/mainRouter');

app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(flash());

// Define routes
app.use('/owner', ownerRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/', mainRouter);

app.listen(3000)
