var express = require('express');
var router = express.Router();
var uModel = require("../models/unitsModel");

router.get('/', async function(req, res, next) {
    console.log("Sending all units");
    let result = await uModel.getAllUnits();
    res.status(result.status).send(result.result);
  });


  router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log("Sending unit with id "+id);
    let result = await uModel.getUnitById(id);
    res.status(result.status).send(result.result);
  });

  router.get('/:id/plans', async function(req, res, next) {
    let id = req.params.id;
    console.log("Sending unit plans for unit id "+id);
    let result = await uModel.getUnitPlans(id);
    res.status(result.status).send(result.result);
  });


module.exports = router;
