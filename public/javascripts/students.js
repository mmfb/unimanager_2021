window.onload = loadStudents;

async function loadStudents() {
    try {
        let students = await $.ajax({
            url: '/api/students',
            method: 'get',
            dataType: 'json'
        });
        createStudentsHTML(students);
        let courses = await $.ajax({
            url: '/api/courses',
            method: 'get',
            dataType: 'json'
        });
        let html = "<option value=''></option>";
        for(let course of courses) {
            html+=`<option value='${course.cour_id}'>
                            ${course.cour_name}
                    </option>`
        }
        document.getElementById("course").innerHTML = html;
    } catch (err) {
        console.log(err);
    }  
}


function createStudentsHTML(students) {
    let html = "";
    for (let student of students) {
        html += `<section>
            <h2>${student.stu_name}</h2>
            <h4>Email: ${student.stu_email}</h4>
            </section>`;
    }
    document.getElementById("students").innerHTML = html;
}

async function filter() {
    try {
        let name = document.getElementById("name").value;
        let courseId = document.getElementById("course").value;
        let students = await $.ajax({
            url: `/api/students/filter/?name=${name}&courseId=${courseId}`,
            method: 'get',
            dataType: 'json'
        });
        createStudentsHTML(students);
    } catch (err) {
        console.log(err);
    }  
   
}