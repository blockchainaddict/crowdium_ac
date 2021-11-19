// Requiring file system handler and path for joining directories
const fs = require('fs');
const path = require('path');

// Bring DB
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Category = require('../database/models/Category');

// Call each model
const Videos = db.Video;
const Course = db.Course;
const Categories = db.Category;
const User = db.User;

// encrypt password
const bcrypt = require('bcryptjs');
const { off } = require('process');

// Methods
const usersController = {
	users: (req,res) =>{
        User.findAll()
			.then(users=>{
				return res.render('users/users.ejs', {users, userLogged:req.session.userToLog});
			})
			.catch((err) => {console.log(err)});
	},
    createUserForm: (req,res)=>{
        res.render('users/createUser.ejs');
    },
    createUser: (req,res)=>{
        const { first_name, last_name, email, password } = req.body;
        User.create({
            first_name,
            last_name,
            email,
            password: bcrypt.hashSync(password, 10)
        })
            .then(()=>{
                return res.redirect('/');
            })
            .catch((err)=> res.send(err));
    }
}

module.exports = usersController;