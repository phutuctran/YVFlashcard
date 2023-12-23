function loadAvtImage() {
    var finder = new CKFinder();
    finder.selectActionFunction = function (fileUrl) {

        document.getElementById("AvtImg").src = fileUrl;
        document.getElementById("inpAvtImage").value = fileUrl;
    }
    finder.popup();
}

function doubleCheckNewPass() {
    let newPass = document.getElementById("newpass-input").value;
    let confirPass = document.getElementById("confirm-input").value;
    if (newPass === confirPass)
        return true;
    else
        return false;
}
let avtImg = document.getElementById("AvtImg").src;
let iptImg = document.getElementById("inpAvtImage").value;
let userName = document.getElementById("userName-input").value;
let email = document.getElementById("emailUser-input").value;
let curPass = document.getElementById("pass-input").value;
let newPass = document.getElementById("newpass-input").value;
let confirPass = document.getElementById("confirm-input").value;



