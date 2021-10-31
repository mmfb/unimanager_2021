var unitId;
var stuId;
window.onload = async function() {
    try {
        unitId = sessionStorage.getItem("unitId");
        // logout seria fazer o deleteItem
        stuId = sessionStorage.getItem("stuId");
        if (stuId) {
            // Devia também verificar se o estudante já está inscrito nesta unidade
            document.getElementById("enroll").style.display = "block";
        }
        let unit = await $.ajax({
            url: "/api/units/"+unitId,
            method: "get",
            dataType: "json"
        });
        document.getElementById("title").innerHTML= "Unit "+unit.cla_name;
        document.getElementById("credits").innerHTML= unit.cla_credits;
        document.getElementById("depart").innerHTML= unit.dep_name;
        
        // preencher o combobox dos planos de estudo da unidade
        let plans = await $.ajax({
            url: `/api/units/${unitId}/plans`,
            method: "get",
            dataType: "json"
        });
        let html="";
        for (let plan of plans)
            html += `<option value="${plan.plan_id}">
                ${plan.cour_name}</option>`
        document.getElementById("plan").innerHTML =  html;
    } catch(err) {
        console.log(err);
    }
}

async function enroll() {
    try {
        // vamos enviar os id do estudante no url e no body
        // podiamos enviar só num local, mas também não tem problema enviar desta forma
        // dados mais privados devem ser enviados no body (mais escondido que o url)
        let obj = {
            planId: document.getElementById("plan").value,
            stuId: stuId
        }
        let result = await $.ajax({
            url: `/api/students/${stuId}/enrollments`,
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
        document.getElementById("enroll").innerHTML =
            "Student enrolled with enrollment Id "+enrolment.enr_id;
    } catch (err) {
        console.log(err);
    }    
}

