// Requerimos modulos para trabajar con archivos
const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

// Declaramos variables para trabajar con el archivo de usuarios
const usersLocation = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersLocation, 'utf-8'));

// Courses
const coursesLocation = path.join(__dirname, '../data/courses.json');
const courses = JSON.parse(fs.readFileSync(coursesLocation, 'utf-8'));

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
                    res.cookie('rememberAccount', userToLog.email, {maxAge: 600000});
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
        delete req.session.userToLog; //delete the user from the session
        if(req.cookies.rememberAccount){
            res.clearCookie('rememberAccount');
            // delete req.cookies.rememberAccount;
        }
        res.redirect('/');
    },
    create: (req,res)=>{
        res.render('createUser');
    },
    createUser: (req,res)=>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const {first_name, last_name, email, password, phone_number} = req.body;

            newUser = {
                id: users[users.length - 1].id + 1,
                first_name,
                last_name,
                email,
                password: bcrypt.hashSync(password, 10),
                phone_number
            }

            for(let i=0; i<users.length; i++){
                console.log(users[i].email);
                if(users[i].email == newUser.email){
                    console.log('EMAIL TAKEN');
                    return res.render('createUser', {errors: {email: {msg: 'Email taken'}}})
                }
            }
    
            // if(users.findByField('email', newUser.email)!=undefined){
            //     return res.render('createUser', {errors: {email: {msg: 'Email taken'}}
            //     });
            // }
    
            users.push(newUser);
            console.log("new user created: ", newUser);
            fs.writeFileSync(usersLocation, JSON.stringify(users, null, " "));
            res.redirect('/login');
        }

        else{
            res.render('createUser', {errors: errors.mapped()});
        }
    },
    profile: (req,res)=>{
        res.render('user_profile.ejs', {
            userLogged: req.session.userToLog,
            courses
        });
    },
    update: (req,res)=>{
        let userId = req.params.id;
        let userToUpdate = users.find(user => user.id == userId);
        console.log(userToUpdate);

        const { email, first_name, last_name, phone_number } = req.body;

        userToUpdate.email = email;
        userToUpdate.first_name = first_name;
        userToUpdate.last_name = last_name;
        userToUpdate.phone_number = phone_number;

        console.log(userToUpdate);

        // userToUpdate = {
        //     email,
        //     first_name,
        //     last_name,
        //     phone_number
        // }

        let newListOfUsers = users;
        newListOfUsers[userId-1] = userToUpdate;

        fs.writeFileSync(usersLocation, JSON.stringify(newListOfUsers, null, " "));
        res.redirect("/perfil");
    },

    subscribeToCourse: (req,res)=> {
        let newCourse = courses[req.body.course_id];
        console.log(req.session.userToLog);
        // Agarro la lista de usuarios que tiene el curso y le agrego este nuevo
        let usersList = newCourse.users_list;
        console.log(typeof(usersList));

        usersList.push(req.session.userToLog);
        console.log(usersList);



        // re-write the file with the new userlist for the course
        res.send('subscribed to course: ' + req.body.course_id);
    }
}

module.exports = usersController;