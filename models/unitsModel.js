var pool = require("./connection");

module.exports.getAllUnits = async function() {
    try {
        let sql = "select * from classes";
        let result = await pool.query(sql);
        let units = result.rows;
        return {status:200, result: units};
    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
} 

module.exports.getUnitById = async function(id) {
    try {
        let sql = "select * from classes,departments where cla_dep_id = dep_id and cla_id = $1";
        let result = await pool.query(sql,[id]);
        if (result.rows.length > 0)  // pg
            return {status: 200, result: result.rows[0] };
        else return {status: 404, result: {msg: "Unit not found!"}};
    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }

} 

module.exports.getUnitPlans = async function(id) {
    try {
        let sql = "select * from studyplans inner join courses on plan_cour_id = cour_id where plan_cla_id = $1";
        let result = await pool.query(sql,[id]);
        return {status: 200, result: result.rows };
    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }

} 

