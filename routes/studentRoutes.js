var express = require('express');
var router = express.Router();
var sModel = require("../models/studentModel");

router.post('/login',async function(req, res, next) {
    let email = req.body.email;
    let password = req.body.pass;
    let result = await sModel.loginStudent(email,password);
    res.status(result.status).send(result.result);
});



router.get('/', async function(req, res, next) {
    let result = await sModel.getAllStudents();
    res.status(result.status).send(result.result);
});


router.get('/filter/', async function(req, res, next) {
    let name = req.query.name;
    let courseId = req.query.courseId;
    let result = await sModel.getStudentsFilteredBy(name,courseId);
    res.status(result.status).send(result.result);
});

router.post('/:id/enrollments',async function(req, res, next) {
    let planId = req.body.planId;
    let stuId = req.body.stuId;
    let result = await sModel.enrollStudent(stuId,planId);
    res.status(result.status).send(result.result);
});

router.get('/:id/enrollments',async function(req, res, next) {
    let stuId = req.params.id;
    let result = await sModel.getStudentEnrollments(stuId);
    res.status(result.status).send(result.result);
});


module.exports = router;

