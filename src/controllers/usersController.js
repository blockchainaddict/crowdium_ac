// Requerimos modulos para trabajar con archivos
const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

// Declaramos variables para trabajar con el archivo de usuarios
const usersLocation = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));

const bcrypt = require('bcryptjs');
const { off } = require('process');

const usersController = {
    login: (req,res) =>{
        res.render("login.ejs")
    },
    processLogin: (req,res) =>{
        let errors = validationResult(req);
        let userToLog = undefined;

        if(errors.isEmpty()){
            for(let i=0; i<users.length; i++){
                if(users[i].email == req.body.email){
                    if(bcrypt.compareSync(req.body.password, users[i].password)){
                        console.log('Password match');
                        userToLog = users[i];
                        break;
                    }
                }
            }

            if(userToLog == undefined){
                res.render('login.ejs', {errors: errors});
                console.log(errors.mapped());
            }
            else{
                req.session.userToLog = userToLog;

                if(req.body.remember != undefined){
                    res.cookie('remember account', userToLog.email, {maxAge: 60000});
                }
                else{
                    console.log('do not remember account');
            }
            res.redirect('/');

            }

            
        }
        else{
            console.log(errors.mapped());
            console.log("WHWHW");
            res.render('login', {errors: errors.mapped(), oldData : req.body})
        }
    },
    logout: (req,res) =>{
        delete req.session.userToLog;
        res.redirect('/');
    },
    create: (req,res)=>{
        res.render('createUser');
    },
    createUser: (req,res)=>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            newUser = {
                id: users[users.length - 1].id + 1,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }
    
            // if(User.findByField('email', newUser.email)!=undefined){
            //     return res.render('createUser', {errors: {email: {msg: 'Email taken'}}
            // });
            // }
    
            users.push(newUser);
            console.log("new user created: ", newUser);
            fs.writeFileSync(usersLocation, JSON.stringify(users, null, " "));
            res.redirect('/login');
        }

        else{
            res.render('createUser', {errors: errors.mapped()});
        }
    }

}

module.exports = usersController;