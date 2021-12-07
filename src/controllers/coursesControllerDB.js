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
const User = db.User;
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
				return res.render('courses/courses.ejs', {courses, categories, userLogged:req.session.userToLog, pageInfo: req.originalUrl});
			})
			.catch((err) => {console.log(err)});
	},
    gallery: (req,res) =>{
		res.render('gallery.ejs', {userLogged:req.session.userToLog}); //Esto tiene que venir de la DB
	},
    startHere: (req,res) =>{
        Course.findAll()
            .then(course =>{
                res.render('start_here.ejs', {course, userLogged:req.session.userToLog, pageInfo: req.originalUrl});
            });
	},
	course: (req,res) =>{
		let id = req.params.id;
		let userLogged = req.session.userToLog;
		
		let courseProm = Course.findByPk(id, {include: ['users', 'videos']});
		let userProm = User.findByPk(userLogged.id, {include: ['courses']});
		let videoProm = Videos.findAll();
			
		Promise.all([courseProm, userProm, videoProm])
		.then(([course, user, videos])=>{
				res.render('courses/course.ejs', {course, user, videos, id, userLogged:req.session.userToLog, pageInfo: req.originalUrl});
			})
	},
	categories: (req,res) =>{
		Categories.findAll()
			.then(categories =>{
				return res.render('courses/categories.ejs', {categories, userLogged:req.session.userToLog});
			})
	},
	category: (req,res) =>{
		let promCategories = Categories.findByPk(req.params.id, {include: ['courses']});
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
				return res.render('courses/createCourse.ejs', {categories, userLogged:req.session.userToLog, pageInfo: req.originalUrl})
			});
	},

	createCourse: (req,res)=>{
		const { name, description, id_category, title, url } = req.body;
		
		Course.create({
			name,
			description,
			id_category: parseInt(id_category),
			course_img: req.file ? req.file.filename : 'default_course_img.jpg'
		})
		.then(()=>{
			return res.redirect('/courses');
		})
		.catch(err=>{res.send(err);});
		
	},
	// NO ESTA TESTEADO
	deleteCourse: (req,res)=>{
		Course.destroy({ 
		where: {id: req.params.id},
		truncate: true, 
		restartIdentity: true
		})
		.then(()=>{
			return res.redirect('/courses', {pageInfo: req.originalUrl});
		})
	},

	subscribeToCourse: (req,res)=>{
		let userLogged = req.session.userToLog;
		let id_course = parseInt(req.body.id_course);
		
		User_Course.create({
			id_user: userLogged.id,
			id_course
		})
		.then(()=>{
			res.redirect('/miscursos');
		})
	},
	unsubscribeToCourse: (req,res)=>{
		let id_user = req.session.userToLog.id;
		let id_course = req.params.id;

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
	editCourseForm: (req,res)=>{
		let categoryProm = Categories.findAll();
		let courseProm = Course.findByPk(req.params.id);

		Promise.all([categoryProm, courseProm])
		.then(([categories, course]) =>{
			return res.render('courses/editCourse.ejs', {categories, course, pageInfo: req.originalUrl})
		})
		.catch(err=>res.send(err));
	},
	editCourse: (req,res)=>{
		// const { name, description, id_category } = req.body;

		let courseId = req.params.id;
		console.log('- - - - - ' + req.body.name);

		Course.update({
			name: req.body.name,
			description: req.body.description,
			id_category: parseInt(req.body.id_category),
			course_img: req.file ? req.file.upload_img : 'default_course_img.jpg'
		},
		{
			where: {id: courseId}
		})
		.then(()=>{
			return res.redirect('/courses');
		})
		.catch(err=>{res.send(err);})

	},

	createVideoForm: (req,res)=>{
		Course.findAll()
		.then((courses)=>{
			return res.render('courses/createVideo.ejs', {courses, pageInfo: req.originalUrl});
		})
		.catch(err=>res.send(err));
		
	},
	createVideo:(req,res)=>{
		const { title, url, id_course } = req.body;
		console.log('--- --- --- ' + id_course);
		
		Videos.create({
			title,
			url,
			id_course: parseInt(id_course)
		})
		.then(()=>{
			return res.redirect('/courses')
		})
		.catch(err=>{res.send(err)});
	
	},

	it: (req,res)=>{
		User_Course.findAll()
			.then(uc=>{
				res.send(uc);
			})
	}


}

module.exports = coursesController;