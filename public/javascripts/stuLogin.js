async function login() {
    try {
        let obj = {
            email: document.getElementById("email").value,
            pass: document.getElementById("pass").value
        }
        let student = await $.ajax({
            url: '/api/students/login',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
        sessionStorage.setItem("stuId",student.stu_id);
        window.location = "stuProfile.html";
    } catch (err) {
        document.getElementById("msg").innerText = err.responseJSON.msg;
    }
}