const express = require('express');
const app = express();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

//Connect to DB
connectDB();

//import list routes
const listRoutes = require('./routes/list.route');
const itemRoutes = require('./routes/items.route');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Welcome to api');
});

//Set Routes
app.use('/lists', [listRoutes, itemRoutes]);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});