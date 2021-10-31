window.onload = async function() {
    try {
        let stuId = sessionStorage.getItem("stuId");
        let units = await $.ajax({
            url: `/api/students/${stuId}/enrollments`,
            method: "get",
            dataType: "json"
        });
        let html = "";
        for (let unit of units) {
            html+=`<section>
                <h3>${unit.cla_name}</h3>
                <p>Grade: ${unit.enr_grade} </p>
            </section>`
        }
        document.getElementById("units").innerHTML = html;
    } catch (err) {
        console.log(err);
    }
}
