const express = require('express');
const app = express();
require('dotenv').config({ path: './config/config.env' });
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

//Connect to DB
connectDB();

//import list routes
const listRoutes = require('./routes/list.routes');
const itemRoutes = require('./routes/items.routes');
const userRoutes = require('./routes/user.routes');

app.use(bodyParser.json());
//app.use(cors());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('Welcome to api');
});

//Set Routes
app.use('/lists', [listRoutes, itemRoutes]);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});