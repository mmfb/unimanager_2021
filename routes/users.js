var express = require('express');
var router = express.Router();
var pool = require('../models/connection');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await pool.query('SELECT * from utilizador');
  res.send(users);

});

router.get('/database', async function(req, res, next) {
  res.send({ database: process.env.DATABASE_URL});
});


module.exports = router;
