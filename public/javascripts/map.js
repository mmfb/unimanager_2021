var mymap;
var monumentos = [];
var students;

window.onload = async function () {
    mymap = L.map('mapid').setView([38.707325418964764, -9.152454160542419], 16);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWJ1Z2FsaG8iLCJhIjoiY2phOWdhbWR5MGprdDJ5cDgzenR5MXMxMCJ9.n38CZPOHiDjdbKXw2YuEmA'
    }).addTo(mymap);

    students = await $.ajax({
        url:"/api/students",
        method: "get",
        dataType: "json"
    });
    let html ="";
    let i = 0;
    for (let student of students) {
        if (student.stu_lat) {
            var marker = L.marker([student.stu_lat, student.stu_lng]).addTo(mymap);
            monumentos.push({student: student, marker: marker});
            student.marker = marker;   
        }
        html+=`<li onmouseover='center(${i})'>${student.stu_name}</li>`;
        i++;
    }
    document.getElementById("students").innerHTML = html;
}

function center(pos) {
    let student = students[pos];
    if (student.marker) {
        mymap.setView(student.marker.getLatLng());
    }
}