const path = require('path');
const fs = require('fs');
const usersLocation = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));

function cookieAuthMiddleware(req,res,next){
    let userToLog;
    if(req.cookies.remember != undefined && req.session.userToLog == undefined){

        if(errors.isEmpty()){
            for(let i=0;i<users.length; i++){
                console.log('Vuelta 1 en file usuarios');
                if(users[i].email == req.cookies.remember){
                    userToLog = users[i];
                    break;
                }
            }
        }
        req.session.userToLog = userToLog;
    }
    next();
}

module.exports = cookieAuthMiddleware;