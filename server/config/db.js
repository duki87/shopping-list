const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb://duki87:VodaVrnjci87@ds257668.mlab.com:57668/shop-app', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;