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

// Methods
const coursesController = {
	courses: (req,res) =>{
        Course.findAll({
			include: ["category"]
		})
			.then(courses=>{
				return res.render('courses.ejs', {courses, userLogged:req.session.userToLog});
			})
			.catch((err) => {console.log(err)});
	},
    gallery: (req,res) =>{
		res.render('gallery.ejs', {userLogged:req.session.userToLog}); //Esto tiene que venir de la DB
	},
    startHere: (req,res) =>{
        Course.findAll()
            .then(course =>{
                res.render('start_here.ejs', {course, userLogged:req.session.userToLog});
            });
	},
	course: (req,res) =>{
		let id = req.params.id;
		Course.findByPk(id)
			.then(course=>{
				res.render('course.ejs', {course, id, userLogged:req.session.userToLog});
			})
	},
	userCourses: (req,res) =>{
		res.render('user_courses.ejs', {courses, userLogged:req.session.userToLog});
	},
	categories: (req,res) =>{
		Categories.findAll()
			.then(categories =>{
				return res.render('courses/categories.ejs', {categories, userLogged:req.session.userToLog});
			})
	},
	category: (req,res) =>{
		let promCategories = Categories.findByPk(req.params.id);
		let promCourses = Course.findAll();
		Promise
		.all([promCategories, promCourses])
			.then(([category, courses]) =>{
				return res.render('courses/category.ejs', {category,courses, userLogged:req.session.userToLog});
			})
			.catch((err)=>{console.log(err);})
	}
}

module.exports = coursesController;