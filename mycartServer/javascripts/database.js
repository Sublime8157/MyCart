require('dotenv').config(); 
const mysql = require('mssql'); 

const config = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASS || 'masterkey_2233#',
    server: process.env.DB_HOST || 'localhost',  // Server address
    database: process.env.DB_NAME || 'MyCartV1',
    port: parseInt(process.env.DB_PORT, 10) || 1433,  // Default MSSQL port
    options: {
        encrypt: true,  // For Azure, set to true
        trustServerCertificate: true // For local development, you can set this to true
    }
};

mysql.connect(config, err => { 
    if(err) {
        console.error('Database connection failed:', err);
        return;
    }
})

module.exports = mysql; 



