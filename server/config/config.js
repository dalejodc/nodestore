//PORT
PORT = process.env.PORT || 5000;

//TOKEN 
process.env.TOKEN_EXPIRES_IN = '2h'; 

//SEED
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'se-token-ed-dev';

// DATABASE
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/store';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.DB_URL = urlDB;
