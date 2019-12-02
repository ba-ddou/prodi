/*
*
*
*
*/
const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = class Config {
  constructor(){
    this.port = parseInt(process.env.PORT, 10);
    this.jwtPrivateKey = String(process.env.JWT_PRIVATE_KEY);
    this.passwordHashingSecret = String(process.env.PASSWORD_HASHING_SECRET);
    this.dbUri = String(process.env.DB_URI)
  }
    
}