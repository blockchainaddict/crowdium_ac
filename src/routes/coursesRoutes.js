// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');

// ************ Controller Require ************
const coursesControllerDB = require('../controllers/coursesControllerDB');

// Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = ('./public/images/course_images');
        cb(null, folder);
    },
    filename: function(req, file, cb){
        const courseImageFile = 'course-' + Date.now() + path.extname(file.originalname);
        cb(null, courseImageFile);
    }
})

const uploadFile = multer({storage: storage});

// Validators
const { body, check } = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
// const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');



const validateNewproject = [
    check('project_picture').custom((value, { req }) => {
        let file = req.file;
        if(!file) {
            throw new Error ('Image')
        }
    })
]

// INDEX
router.get('/courses', coursesControllerDB.courses);

router.get('/courses/categories', authMiddleware, coursesControllerDB.categories);
router.get('/courses/category/:id', authMiddleware, coursesControllerDB.category);

router.get('/courses/crear', authMiddleware, coursesControllerDB.createCourseForm);
router.post('/courses/crear', uploadFile.single('upload_img'), coursesControllerDB.createCourse);

// Crear videos
router.get('/videos/crear', coursesControllerDB.createVideoForm);
router.post('/videos/crear', coursesControllerDB.createVideo);

// ATENCION! SI ESTO ESTA ANTES ATAJA TODO LO QUE CONTENGA ALGO COMO ID
// Probalo en singular
router.get('/course/:id', authMiddleware, coursesControllerDB.course);
router.post('/course/:id', coursesControllerDB.subscribeToCourse);

// Edit courses
router.get('/courses/edit/:id', coursesControllerDB.editCourseForm);
router.put('/courses/update/:id', uploadFile.single('upload_img'), coursesControllerDB.editCourse);

router.get('/usercourse', coursesControllerDB.it);
router.delete('/course/:id', coursesControllerDB.unsubscribeToCourse);


module.exports = router;