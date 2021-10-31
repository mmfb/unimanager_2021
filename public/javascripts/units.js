window.onload = async function() {
    try {
        let units = await $.ajax({
            url: "/api/units",
            method: "get",
            dataType: "json"
        });
        let html = "";
        for (let unit of units) {
            html+=`<section onmouseover="showUnit(${unit.cla_id})"
                            onclick="toUnit(${unit.cla_id})">
                <h3>${unit.cla_name}</h3>
                <p>${unit.cla_credits} credits</p>
            </section>`
        }
        document.getElementById("units").innerHTML = html;
    } catch (err) {
        console.log(err);
    }
}

function toUnit(id) {
    sessionStorage.setItem("unitId", id);
    window.location = "unit.html";
}


async function showUnit(id) {
    try {
        let unit = await $.ajax({
            url: "/api/units/"+id,
            method: "get",
            dataType: "json"
        });
        document.getElementById("title").innerHTML= "Unit "+unit.cla_name;
        document.getElementById("credits").innerHTML= unit.cla_credits;
        document.getElementById("depart").innerHTML= unit.dep_name;
        
    } catch(err) {
        console.log(err);
    }
}
