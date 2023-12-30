//function backtoLanding(){
//    window.location.assign("http://127.0.0.1:5500/index.html");
//}

var xValues = ["Learned(Yours)", "Learned (System)", "Total word entered", "Total your lesson"];
var yValues = [];
var barColors = ["#F2D8D8", "#5C8984", "#C0DBEA", "#FFDCA9"];
var HisSys = [];
var HisUser = [];
var username = document.getElementById("currentUsername").value;
function GetData() {
    _data = {
        username: username,
    };
    $.ajax({
        url: '/Home/GetDataForHistory',
        type: 'POST', // Phương thức HTTP
        data: _data,
        success: function (result) {
            yValues = result;
            createChart();
        },
        error: function (error) {
            alert("Không thể tải dữ liệu ngay lúc này!");
        }
    });
    $.ajax({
        url: '/Home/GetLearnedHistorySystem',
        type: 'POST', // Phương thức HTTP
        data: _data,
        success: function (result) {
            HisSys = result;
            console.log(HisSys);
            createHis(HisSys, "System");
        },
        error: function (error) {
            alert("Không thể tải dữ liệu ngay lúc này!");
        }
    });
    $.ajax({
        url: '/Home/GetLearnedHistoryUser',
        type: 'POST', // Phương thức HTTP
        data: _data,
        success: function (result) {
            HisUser = result;
            console.log(HisUser);
            createHis(HisUser, "User");
        },
        error: function (error) {
            alert("Không thể tải dữ liệu ngay lúc này!");
        }
    });

}

GetData();

function createChart() {
    new Chart("myBarChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Statistics by Word count "
            }
        }
    });
}

function createHis(data, typeHis) {

    var container = document.getElementById("hisArea");
    for (let i = 0; i < data.length; i++) {
        if (data[i].type != "PASSCERF") {
            const row = document.createElement('tr')
            row.innerHTML = `
                        <td>${data[i].type}</td>
                        <td>${data[i].username}</td>
                        <td>${data[i].numLearnedWord}</td>
                        <td>${typeHis}</td>
                        `
            container.appendChild(row);
        }

    }
}


//var xValues = ["Learned(System)", "Learned(Yours)", "Theme entered",];
//var yValues = [55, 49, 44, ];
//var barColors = [
//  "#D8C4B6",
//  "#96C291",
//  "#FFDDCC",
 
//];

//new Chart("myPieChart", {
//  type: "pie",
//  data: {
//    labels: xValues,
//    datasets: [{
//      backgroundColor: barColors,
//      data: yValues
//    }]
//  },
//  options: {
//    title: {
//      display: true,
//      text: "Satictistic by Lesson count"
//    }
//  }
//});