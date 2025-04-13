const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MONGODB connection Error:', error);
        process.exit(1);
    }
};

module.exports = connect;
