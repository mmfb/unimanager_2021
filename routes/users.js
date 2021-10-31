var express = require('express');
var router = express.Router();
var pool = require('../models/connection');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await pool.query('SELECT * from utilizador');
  res.send(users);

});

module.exports = router;
