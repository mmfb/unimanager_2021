var pg = require('pg');

const connectionString = "postgres://postgres:root@localhost:5432/unimanager"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10
})
/*
,
    ssl: {
        require: true, 
        rejectUnauthorized: false
    }
*/

module.exports = pool;