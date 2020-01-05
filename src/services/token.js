/*
*
* token service
*
*/


var jwt = require('jsonwebtoken');
var helpers = require('./helpers');


module.exports = class TokenService{

    constructor(container){
        //get config object from typedi
        this.config = container.get("config");
        //get data object frm typedi
        this.data = container.get("data");

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
            // retreive admin object from the database
            let [data,err] = await this.data.read('admin',{username});
            let userObject = data[0];
            if(userObject){
                // hash the received password
                let hash = helpers.hash(password,this.config.passwordHashingSecret);
                // compare received password and stored password 
                if(hash == userObject.hashedPassword){
                    // generate JWT token
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