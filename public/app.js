// var request = require('request');

var API_URL = 'http://localhost:5000'; // The weebsite where API will be hosted

// working
function validateForm() {

    var username = document.getElementById("uname").value; //uname
    var password = document.getElementById("pass").value; //pass

    if (username == "admin" && password == "admin") {
        document.getElementById('demo').innerHTML = '<p id="demo" style="color:green;">Success</p>';
        const isAuthenticated = true;
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        localStorage.setItem('user', username);
        localStorage.setItem('password', password);
        
        location.href = '/db_view';

    }else{
        document.getElementById('demo').innerHTML = '<p id="demo" style="color:red;">Error</p>';
    }
}

// working
function create(){
    var name =  document.getElementById('name').value;
    var age =  document.getElementById('age').value;
    var department =  document.getElementById('department').value;
    var supervisor =  document.getElementById('supervisor').value;
    var duties =  document.getElementById('duties').value;
    var license =  document.getElementById('license').value;

    $.post(`${API_URL}/api/register/${name}/${age}/${department}/${supervisor}/${duties}/${license}`).then((response) =>{
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
}

// Working
function logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    localStorage.removeItem('isAuthenticated');
    location.href = '/';
}

// Working
if(localStorage.getItem('isAuthenticated')){
    $.get(`${API_URL}/api/db`).then((response) =>{
        document.getElementById('view_db').innerHTML = `${response}`;
    });
}
else{
    document.getElementById('view_db').innerHTML = `Sorry Not Authenticated! Please logout and try again`;
}


