var pg = require('pg');

const connectionString = "postgres://htfncprrfygtdc:71af38061a0904633fef4ffec874644e35ef40719081e39f4f27507554e601a4@ec2-52-206-193-199.compute-1.amazonaws.com:5432/dajf1d0bm2brh0"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10,
    ssl: {
        require: true, 
        rejectUnauthorized: false
    }
})

module.exports = pool;