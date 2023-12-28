//----------------------- sign in - sign up------------

 
function checkPassword(pass){
    if(pass.length < 6){
        return false;
    }
    for(let i = 0 ; i < pass.length; i++){
        if(pass.charCodeAt(i) >= 65 && pass.charCodeAt(i) <= 90)
            return true;
    }
    return false;
}

function doubleCheck(pass, confPass){
    if(pass === confPass)
        return true;
    else
        return false;
}

function signUp(){
    let _user = document.getElementById("userName_SignUp").value;
    let _pass = document.getElementById("pass_SignUp").value;
    let _confPass = document.getElementById("conf_pass_SignUp").value;
    let _email = document.getElementById("email_SignUp").value;
    if (!(checkPassword(_pass))) {
        showAlert("The password must have at least 6 characters and at least one uppercase letter!");
        closeAlert();
        return;
    }
    if (!(doubleCheck(_pass, _confPass))) {
        showAlert("Incorrect Password!");
        return;
    }
    let data = {
        username: _user,
        password: _pass,
        email: _email
    };

    $.ajax({
        url: '/Home/SignUp',
        type: 'POST', // Phương thức HTTP
        data: data,
        success: function (result) {
            if (result == true) {
                showAlert("Successful Sign Up!")
                closeAlert();
                setTimeout(function () {
                    window.location.href= "/Home/signIn";
                }, 1000);
            }
            else
            {
                showAlert("The account is either invalid or already exists.Please try again!");
                closeAlert();
                return;
            }
        },
        error: function (error) {
            alert("Can not Sign In right now!");
            closeAlert();
            return;
        }
    });
}

function checkAccount(){
    let _user = document.getElementById("userName_SignIn").value;
    let _pass = document.getElementById("pass_SignIn").value;

    let data = {
        username: _user,
        password: _pass
    };

    $.ajax({
        url: '/Home/SignIn',
        type: 'POST', // Phương thức HTTP
        data: data,
        success: function (result) {
            if (result == true) {
                showAlert("Succuessful Sign In");
                setTimeout(function () {
                    window.location.href = "/Home/Index";
                }, 1000);
            }
            else {
                showAlert("Incorrect username or password!");
                closeAlert();
                return;
            }
        },
        error: function (error) {
            showAlert("Can not Sign In right now!");
            closeAlert();
            return;
        }
    });
}

function showAlert(msg) {
    let element = document.getElementById("alert-container");
    element.classList.add("show");
    let showMsg = document.getElementById("alert-content");
    showMsg.innerText = msg; 

}

function closeAlert() {
    setTimeout(function () {
        document.getElementById("alert-container").classList.remove("show");
    }, 1500);
}