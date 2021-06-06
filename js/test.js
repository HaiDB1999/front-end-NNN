const url = "http://localhost:3000/employees";
let Employees = [];

var sendAPI = (method, url, data) => {
    var req = new XMLHttpRequest();
    req.open(method, url, true);
    req.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    req.send(JSON.stringify(data));
    req.onload = function() {
        if ((method === 'GET') && (this.statusText === 'OK')) {
            Employees = JSON.parse(this.responseText);
        }
    }
}

// sendAPI("POST", url, x)
sendAPI("GET", url, null)
setTimeout(function() {
    let htmlObj = document.getElementById("employees-table");
    let htm = ''
    Employees.forEach(emp => {
        htm = htm + "<tr>" +
            "<th>" + emp.id + "</th>" +
            "<th>" + emp.first_name + "</th>" +
            "<th>" + emp.last_name + "</th>" +
            "<th>" + emp.address + "</th> </tr>";
    })
    htmlObj.innerHTML = htmlObj.innerHTML + htm;
}, 200);

function SubmitCreate() {
    let x = {}
    x.first_name = document.getElementById("newFirstName").value;
    x.last_name = document.getElementById("newLastName").value;
    x.address = document.getElementById("newAddress").value;
    console.log(x);
    if (!(x.first_name === '' || x.last_name === '' || x.address === ''))
        sendAPI("POST", url, x)
}

function SubmitEdit() {
    let x = {};
    debugger
    x.id = document.getElementById("key").value;
    x.first_name = document.getElementById("updateFirstName").value;
    x.last_name = document.getElementById("updateLastName").value;
    x.address = document.getElementById("updateAddress").value;
    console.log(x);
    debugger
    if (!(x.first_name === '' || x.last_name === '' || x.address === ''))
        sendAPI("PUT", url + "/" + x.id, x)
}