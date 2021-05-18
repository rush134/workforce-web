// var request = require('request');

// var API_URL = 'http://localhost:5000'; // The weebsite where API will be hosted
var API_URL = 'https://work--force-api.herokuapp.com'; // The weebsite where this will be hosted


// Working
function authenticate() {

    var username = document.getElementById("uname").value; //uname
    var password = document.getElementById("pass").value; //pass

    $.post(`${API_URL}/api/authenticate`, { username, password }).then((response) => {
        if (response.success) {

            document.getElementById('demo').innerHTML = '<p id="demo" style="color:green;">Success</p>';

            const isAuthenticated = true;
            localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));

            localStorage.setItem('role', response.role);
            localStorage.setItem('user', username);
            localStorage.setItem('password', password);
            localStorage.setItem('department', response.department);

            location.href = '/db_view';
        }
        else {
            document.getElementById('demo').innerHTML = `<p id="demo" style="color:red;">Response: ${response}</p>`;
            // console.log($,{response});
            const isAuthenticated = false;
            // console.log('fail');
            localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        }
    });
}

// working
function create() {
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var age = document.getElementById('age').value;

    var dept_ = document.getElementsByName('radio_dept');
    var role_ = document.getElementsByName('radio_role');

    let department = null;
    let role = null;

    // https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/
    for (const d of dept_) {
        if (d.checked) {
            department = d.value;
            break;
        }
    }

    for (const r of role_) {
        if (r.checked) {
            role = r.value;
            break;
        }
    }

    $.post(`${API_URL}/api/register`, { name, password, age, department, role }).then((response) => {
        if (response.success) {
            document.getElementById('demo').innerHTML = `<p id="demo" style="color:green;"> ${response.message}</p>`;

            // document.getElementById('demo').innerHTML = `<p id="demo" style="color:green;"> ${response.qr_code}</p>`;

            // window.open(`/qr?code=${response.qr_code}`,'_blank');
            // window.open('/db_view');
            // location.href = '/db_view';
        }
        else {
            document.getElementById('demo').innerHTML = `<p id="demo" style="color:red;">Something went wrong! Try Again</p>`;
        }
    });
}

// Working
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    location.href = '/';
}

// Working
if (localStorage.getItem('isAuthenticated')) {

    document.getElementById('name_web').innerHTML = localStorage.getItem('user')

    let role = localStorage.getItem('role')
    let department = localStorage.getItem('department')

    $.post(`${API_URL}/api/db`, { role, department }).then((response) => {
        document.getElementById('view_db').innerHTML = `${response}`;
    });
}
else {
    document.getElementById('view_db').innerHTML = `Sorry Not Authenticated! Please logout and try again`;
}



/* OLD CODE
// working
function create(){
    var name =  document.getElementById('name').value;
    var password =  document.getElementById('password').value;
    var age =  document.getElementById('age').value;

    var dept_ = document.getElementsByName('radio_dept');
    var role_ = document.getElementsByName('radio_role');

    let department = null;
    let role = null;

    for (const d of dept_) {
        if (d.checked) {
            department = d.value;
            break;
        }
    }

    for (const r of role_) {
        if (r.checked) {
            role = r.value;
            break;
        }
    }

    // document.getElementById('demo').innerHTML = `<p id="demo" style="color:green;"> ${name+password+age}</p>`;

    // var department =  document.getElementById('department').value;
    // var supervisor =  document.getElementById('supervisor').value;
    // var duties =  document.getElementById('duties').value;
    // var license =  document.getElementById('license').value;


    $.post(`${API_URL}/api/register`, {name, password , age, department, role}).then((response) =>{
        if (response.success) {
            document.getElementById('demo').innerHTML = `<p id="demo" style="color:green;"> ${response.qr_code}</p>`;

            // window.open(`/qr?code=${response.qr_code}`,'_blank');
            // window.open('/db_view');
            // location.href = '/db_view';
        }
        else {
            document.getElementById('demo').innerHTML = `<p id="demo" style="color:red;">Something went wrong! Try Again</p>`;
        }
    });


    // $.post(`${API_URL}/api/register/${name}/${age}/${department}/${supervisor}/${duties}/${license}`).then((response) =>{
    //     if (response.success) {
    //         document.getElementById('demo').innerHTML = `<p id="demo" style="color:green;"> ${response.qr_code}</p>`;

    //         // window.open(`/qr?code=${response.qr_code}`,'_blank');
    //         // window.open('/db_view');
    //         // location.href = '/db_view';
    //     }
    //     else {
    //         document.getElementById('demo').innerHTML = `<p id="demo" style="color:red;">Something went wrong! Try Again</p>`;
    //     }
    // });
}

*/