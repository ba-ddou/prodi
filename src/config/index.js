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
    this.port = parseInt(process.env.PORT, 10)
  }
    
}