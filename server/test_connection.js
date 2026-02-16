
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import headers from 'dns';

// Configure dotenv to read .env file
dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

console.log('Testing MongoDB Connection...');
console.log(`Username: ${USERNAME ? 'Found' : 'Missing'}`);
console.log(`Password: ${PASSWORD ? 'Found' : 'Missing'}`);

const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@krishfootwear.wzcnrmg.mongodb.net/KrishFootwear?retryWrites=true&w=majority`;

console.log(`Connecting to: ${URL.replace(PASSWORD, '****')}`); // Hide password in logs

// Check DNS resolution for the cluster
const hostname = 'krishfootwear.wzcnrmg.mongodb.net';
console.log(`Resolving DNS for ${hostname}...`);

headers.resolveSrv(`_mongodb._tcp.${hostname}`, (err, addresses) => {
    if (err) {
        console.error('DNS Resolution Error (SRV):', err.code, err.message);
        console.log('This usually means your IP is not whitelisted in MongoDB Atlas or a firewall is blocking the connection.');
    } else {
        console.log('DNS Resolution Successful (SRV):', addresses);
    }
});

// Attempt Mongoose connection
mongoose.connect(URL)
    .then(() => {
        console.log('Database connection successful!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Database connection error:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    });
