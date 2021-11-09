// Requiring file system handler and path for joining directories
const fs = require('fs');
const path = require('path');

// Creating handles for files
const projectsLocation = path.join(__dirname, '../data/projectsDatabase.json');
const projects = JSON.parse(fs.readFileSync(projectsLocation, 'utf-8'));

const coursesLocation = path.join(__dirname, '../data/courses.json');
const courses = JSON.parse(fs.readFileSync(coursesLocation, 'utf-8'));

// 
const coursesController = {
    gallery: (req,res) =>{
		res.render('gallery.ejs', {userLogged:req.session.userToLog});
	},
    startHere: (req,res) =>{
		res.render('start_here.ejs', {courses, userLogged:req.session.userToLog});
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