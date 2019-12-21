/*
*
* token service
*
*/

var Config = require('../config');
var jwt = require('jsonwebtoken');
var helpers = require('./helpers');
var Data = require('../data');


module.exports = class TokenService{

    constructor(container){
        this.config = container.get(Config);
        this.data = container.get(Data);
        // this.data.create('admin',{username : 'badou', hashedPassword : helpers.hash('lemmein',this.config.passwordHashingSecret)})
    }

    //generate regular user token
    get(ipAddress){
        var token = jwt.sign({ ip }, this.config.jwtPrivateKey);
        return token;
    }

    //generate admin token | requires username and password
    post = async (payload)=>{

        var {username,password} = payload;

        if(username && password){
            let [data,err] = await this.data.read('admin',{username});
            let userObject = data[0];
            if(userObject){
                let hash = helpers.hash(password,this.config.passwordHashingSecret);
                if(hash == userObject.hashedPassword){
                    let token = jwt.sign({
                        _id : userObject._id,
                        username
                    }, this.config.jwtPrivateKey);
                    return [token,false];
                }else{
                    return [false,"invalid username-password combination"]
                }
            }else{
                return [false,"user does not exist"]
            }
            
            

        }else{
            return [false,"missing username or password"]
        }


    }

}