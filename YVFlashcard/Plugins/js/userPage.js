function loadAvtImage() {
    var finder = new CKFinder();
    finder.selectActionFunction = function (fileUrl) {

        document.getElementById("AvtImg").src = fileUrl;
        document.getElementById("inpAvtImage").value = fileUrl;
    }
    finder.popup();
}

function doubleCheckNewPass(newPass, confirPass) {
    if (newPass === confirPass)
        return true;
    else
        return false;
}


function SaveInfo() {
    let avtImg = document.getElementById("AvtImg").src;
    let iptImg = document.getElementById("inpAvtImage").value;
    let userName = document.getElementById("userName-input").value;
    let email = document.getElementById("emailUser-input").value;
    let curPass = document.getElementById("pass-input").value;
    let newPass = document.getElementById("newpass-input").value;
    let confirPass = document.getElementById("confirm-input").value;
    var noti = document.getElementById("ErrorPassNoti");
    var confirmNoti = document.getElementById("ErrorConfirmPassNoti");
    if (!doubleCheckNewPass(newPass, confirPass)) {
        noti.hidden = true;
        confirmNoti.removeAttribute("hidden");
    }
    else {
        if (newPass == "") {
            newPass = curPass;
        }
        confirmNoti.hidden = true;
        data = {
            username: userName,
            password: newPass,
            email: email,
            oldpassword: curPass,
            avatar: iptImg
        }

        $.ajax({
            url: '/Home/UpdateUserInfo',
            type: 'POST', // Phương thức HTTP
            data: data,
            success: function (result) {
                if (result) {
                    alert("Cập nhật thông tin thành công!")
                    window.location.href = "/Home/UserPage";
                }
                else {
                    noti.removeAttribute("hidden");
                }
            },
            error: function (error) {
                alert("Không thể cập nhật ngay lúc này!");
            }
        });
    }

}


