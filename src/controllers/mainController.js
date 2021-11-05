const fs = require('fs');
const path = require('path');

const projectsLocation = path.join(__dirname, '../data/projectsDatabase.json');
const projects = JSON.parse(fs.readFileSync(projectsLocation, 'utf-8'));

const mainController = {
	index: (req,res) =>{
		res.render("index.ejs", {userLogged:req.session.userToLog});
	},
	gallery: (req,res) =>{
		res.render('gallery.ejs', {userLogged:req.session.userToLog});
	},
	dashboard: (req,res) =>{
		res.render('dashboard.ejs', {userLogged:req.session.userToLog});
	},
	create: (req, res) => {
		res.render("create.ejs", {userLogged:req.session.userToLog});
	},
	processCreate: (req,res) => {
		let info = req.body;

		// datetime stuff
		let creation_date_iso = new Date(req.body.date);
		console.log("CREATION DATE ISO" + creation_date_iso);
		let day_of_rec = creation_date_iso.toISOString().substring(0, 10)
		let time_of_rec = creation_date_iso.toISOString().substring(11);

		// let delivery_date = creation_date_iso.setDate(creation_date_iso.getDate() + 3);

		let delivery_date2 = creation_date_iso.getDate() + "-" + (creation_date_iso.getMonth()+1) + "-" + creation_date_iso.getFullYear();
		console.log("DELIVERY DATE 2" + delivery_date2);

		let info_time = {
			day: day_of_rec,
			time: time_of_rec,
			delivery: delivery_date2
		}

		// write on json file
		const newProj = {
			id: users[users.length - 1].id + 1,
			type_of_project: req.body.type_of_project,
			date: req.body.date,
			delivery_date: info_time.delivery,
			house_m2: req.body.meters,
			house_floors: req.body.floors,
			house_rooms: req.body.rooms,
			house_bedrooms: req.body.bedrooms,
			house_bathrooms: req.body.bathrooms,
			comments: req.body.comments,
			img: req.file ? req.file.filename : 'default-image.png'
		}

		projects.push(newProj);
		fs.writeFileSync(projectsLocation, JSON.stringify(projects, null, " "))

		res.render("booked.ejs", {info: info, info_time: info_time});
	},
	projects: (req,res)=>{
		res.render("projects.ejs", {projects});
	},
	project: (req,res)=>{
		let id = req.params.id;
		let project = projects.find(project =>{
			return project.id == id;
		})
		res.render("project.ejs", {projects, project: project});
	}
};

module.exports = mainController;