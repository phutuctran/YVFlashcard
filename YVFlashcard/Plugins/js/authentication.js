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
    if(!(checkPassword(_pass))){
        alert("Mật khẩu phải có ít nhất 6 ký tự và tối thiểu một ký tự viết hoa!");
    }
    if(!(doubleCheck(_pass,_confPass))){
        alert("Xác nhận mật khẩu chưa chính xác!");
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
                alert("Đăng kí tài khoản thành công");
                setTimeout(function () {
                    window.location.href= "/Home/signIn";
                }, 1000);
            }
            else
            {
                alert("Tài khoản đã tồn tại hoặc không hợp lệ, vui lòng thử lại!");
            }
        },
        error: function (error) {
            alert("Không thể tạo tài khoản ngay lúc này!");
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
                alert("Đăng nhập thành công!");
                setTimeout(function () {
                    window.location.href = "/Home/Index";
                }, 1000);
            }
            else {
                alert("Tài khoản hoặc mật khẩu không đúng!");
            }
        },
        error: function (error) {
            alert("Không thể đăng nhập ngay lúc này!");
        }
    });
}
