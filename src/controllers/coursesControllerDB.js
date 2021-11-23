// Requiring file system handler and path for joining directories
const fs = require('fs');
const path = require('path');

// Bring DB
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const Category = require('../database/models/Category');
const { send } = require('process');

// Call each model
const Videos = db.Video;
const Course = db.Course;
const Categories = db.Category;
const User_Course = db.User_Course;

// Methods
const coursesController = {
	courses: (req,res) =>{
        let coursesProm = Course.findAll({
			include: ["category"]
		});
		let categoriesProm = Categories.findAll();

		Promise.all([coursesProm, categoriesProm])
			.then(([courses, categories])=>{
				return res.render('courses/courses.ejs', {courses, categories, userLogged:req.session.userToLog});
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
		Course.findByPk(id, {include: ['users']})
			.then(course=>{
				res.render('courses/course.ejs', {course, id, userLogged:req.session.userToLog});
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
				return res.render('courses/category.ejs', {category, courses, userLogged:req.session.userToLog});
			})
			.catch((err)=>{console.log(err);})
	},

	createCourseForm: (req,res)=>{
		Categories.findAll()
			.then(categories =>{
				return res.render('courses/createCourse.ejs', {categories})
			});
	},

	createCourse: (req,res)=>{
		const { name, description, id_category } = req.body;

		Course.create({
			name,
			description,
			id_category: parseInt(id_category),
			course_img: req.file ? req.file.upload_img : 'default_course_img.jpg'
		})
		.then(()=>{
			return res.redirect('/courses');
		})
		.catch(err=>{res.send(err);})
	},
	// deleteCourse: (req,res)=>{
	// 	Course.destroy()
	// }

	subscribeToCourse: (req,res)=>{
		let id_user = req.session.userToLog;
		let id_course = parseInt(req.body.id_course);

		console.log("H EH EH E EE    ------------");
		console.log(id_user);
		console.log(id_course);
		
		User_Course.create({
			id_user : id_user.id,
			id_course
		})
		.then(()=>{
			res.redirect('/miscursos');
		})
	},
	unsubscribeToCourse: (req,res)=>{
		let id_user = req.session.userToLog.id;
		let id_course = req.params.id;
		console.log(" HEREEE -------- " + id_user + ' ' + id_course);

		User_Course.destroy({
			where: {
				[Op.and]: [{id_user: id_user}, {id_course: id_course}]
			}
		})
		.then(()=>{
			return res.redirect('/miscursos');
		})
		.catch(err=>{res.send(err);})
	},

	it: (req,res)=>{
		User_Course.findAll()
			.then(uc=>{
				res.send(uc);
			})
	}


}

module.exports = coursesController;