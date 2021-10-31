var pool = require("./connection");


module.exports.loginStudent = async function(email,pass) {
    try {
        let sql ="Select * from students where stu_email = $1 and stu_password = $2";
        let result = await pool.query(sql,[email,pass]);
        if (result.rows.length > 0)
            return { status:200, result:result.rows[0]};
        else return { status:401, result: {msg: "Wrong email or password"}};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}



module.exports.getAllStudents = async function() {
    try {
        let sql ="Select * from students";
        let result = await pool.query(sql);
        let students = result.rows;
        return { status:200, result:students};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}

module.exports.getStudentsFilteredBy = async function(name,courseId) {
    try {
        let sql;
        let params;
        if (!name && !courseId) {
            sql ="Select * from students";
            params = [];
        } else if (name && !courseId) {
            sql ="Select * from students where stu_name LIKE $1";
            params = ["%"+name+"%"];     
        } else if (!name && courseId) {
            sql ="Select * from students where stu_cour_id = $1";
            params = [courseId];     
        } else { // (name && courseId)
            sql ="Select * from students where stu_name LIKE $1 and stu_cour_id = $2";
            params = ["%"+name+"%",courseId];           
        }
        let result = await pool.query(sql,params);
        let students = result.rows;
        return { status:200, result:students};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }   
}

module.exports.enrollStudent = async function(stuId,planId) {
    try {
        let sql ="Insert into enrollment(enr_stud_id, enr_plan_id,enr_dt_enrollment) values($1,$2,$3)";
        let result = await pool.query(sql,[stuId,planId,new Date()]);
        return { status:200, result:result.rows[0]};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}


module.exports.getStudentEnrollments = async function(id) {
    try {
        let sql =`Select * from students inner join enrollment 
                  on enr_stud_id = stu_id inner join studyplans
                  on plan_id = enr_plan_id inner join classes
                  on plan_cla_id = cla_id where stu_id = $1`;
        let result = await pool.query(sql,[id]);
        let units = result.rows;
        return { status:200, result:units};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}
