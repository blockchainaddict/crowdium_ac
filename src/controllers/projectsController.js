const fs = require('fs');
const path = require('path');
let db = require("../database/models");

const projectsLocation = path.join(__dirname, '../data/projectsDatabase.json');
const projects = JSON.parse(fs.readFileSync(projectsLocation, 'utf-8'));

const projectsController = {
    projects: (req,res)=>{
        db.Projects.findAll(
            {
        //     where: {
        //         rating: {[db.Sequelize.Op.gte] : 9}
        //     },
        //     order: [
        //         ["title", "DESC"]
        //     ],
            limit: 6
        }
        )
            .then(function(projects){
                res.render("projectsdb.ejs", {projects: projects});
            })
		
	},
	project: (req,res)=>{
		let id = req.params.id;
        
        db.Projects.findByPk(id)
            .then(function(projects){
                res.render("projectdb.ejs", {project: projects});

        })
		// let project = projects.find(project =>{
		// 	return project.id == id;
		// })
	},
    create: (req,res) =>{
        let info = req.body;

		// datetime stuff
		let creation_date_iso = new Date(req.body.date);
		console.log("ISO" + creation_date_iso);

		let day_of_rec = creation_date_iso.toISOString().substring(0, 10)
		let time_of_rec = creation_date_iso.toISOString().substring(11);
		let today = new Date();

		let delivery_date = creation_date_iso.setDate(creation_date_iso.getDate() + 3);
		let days_to_deadline = creation_date_iso.getDate() > (today -2);
		
		delivery_date = creation_date_iso.getDate() + "-" + (creation_date_iso.getMonth()+1) + "-" + creation_date_iso.getFullYear();
		console.log("DELIVERY DATE 2" + delivery_date);

		console.log(days_to_deadline);


		let info_time = {
			day: day_of_rec,
			time: time_of_rec,
			delivery: delivery_date,
			days_to_deadline
		}
        
        const newProj = {
			id: projects.length + 1,
			type_of_project: req.body.type_of_project,
			date: req.body.date,
			delivery_date: info_time.delivery,
			days_to_deadline: days_to_deadline,
			house_m2: req.body.meters,
			house_floors: req.body.floors,
			house_rooms: req.body.rooms,
			house_bedrooms: req.body.bedrooms,
			house_bathrooms: req.body.bathrooms,
			comments: req.body.comments,
			img: req.file ? req.file.filename : 'default-image.png'

		}

		projects.push(newProj);
		fs.writeFileSync(projectsLocation, JSON.stringify(projects, null, " "));

        // db.Projects.create(newProj);
        res.redirect('/projects');
    }
}

module.exports = projectsController;