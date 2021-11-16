// Requiring file system handler and path for joining directories
const fs = require('fs');
const path = require('path');

// Bring DB
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

// Call each model
const Videos = db.Video;
const Course = db.Course;
const Categories = db.Category;

// Methods
const coursesController = {
    gallery: (req,res) =>{
		res.render('gallery.ejs', {userLogged:req.session.userToLog}); //Esto tiene que venir de la DB
	},
    startHere: (req,res) =>{
        Videos.findAll({})
            .then(video =>{
                res.render('start_here.ejs', {video, userLogged:req.session.userToLog});
            });
	},
	courses: (req,res) =>{
        
		res.render('courses.ejs', {courses, userLogged:req.session.userToLog});
	},
	course: (req,res) =>{
		let id = req.params.id;
		res.render('course.ejs', {courses, id, userLogged:req.session.userToLog});
	},
	userCourses: (req,res) =>{
		res.render('user_courses.ejs', {courses, userLogged:req.session.userToLog});
	}
}

module.exports = coursesController;