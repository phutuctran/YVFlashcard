var DATA = []
function getAllData() {
    const container = document.getElementById("lessonU-container");
    $.ajax({
        url: '/Home/GetAllUserLessonInfo',
        type: 'GET', // Phương thức HTTP
        success: function (data) {
            DATA = data;
            for (let i = 0; i < data.length; i++) {
                container.appendChild(renderLesson(data[i].image, data[i].name, i));
            }
        },
        error: function (error) {
            alert("Không thể tải dữ liệu ngay lúc này!");
        }
    });

}

getAllData();


function loadWordImageLessonU() {
     var finder = new CKFinder();
     finder.selectActionFunction = function (fileUrl) {

         document.getElementById("LessonUserImg").src = fileUrl;
         document.getElementById("inpLessonUserImage").value = fileUrl;
     }
     finder.popup();
}

function loadWordImageForEditLessonU() {
     var finder = new CKFinder();
     finder.selectActionFunction = function (fileUrl) {

         document.getElementById("LessonUserImgEdit").src = fileUrl;
         document.getElementById("inpLessonUserImageEdit").value = fileUrl;
     }
     finder.popup();
}


function renderLesson(imgSrc, name, Id) {
    const lessonU = document.createElement("div");
    lessonU.className = "col-3 mt-5";
    lessonU.innerHTML = `
         <div class="lesson-container" style="border: 1px solid black; border-radius: 10px; width: 250px; height: 250px;">
                    <div class="btn-container mt-2" style="float: right;">
                        <button onclick="ShowDataDeleteModal(${Id})" class="btn btn-success ellipse-btn" data-bs-toggle="modal" data-bs-target="#delete-modal"><i class="fa-regular fa-trash-can"></i></button>
                        <button onclick="ShowDataEditModal(${Id})" class="btn btn-success ellipse-btn" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-regular fa-pen-to-square "></i></button>
                    </div>
                    <div onclick="viewAllVocab(${Id})" class="img-content " style="height: 110px; width: 100px; margin-right: auto; margin-left: auto; margin-top: 50px;">
                        <img src="${imgSrc}" width="100px" height="100px">
                    </div>
                    <div class="lesson-name mt-3 ">
                        <p style="text-align: center; font-size: x-large;">${name} </p>
                    </div>
                </div>
    `

    return lessonU;
}
function viewAllVocab(Id) {
    window.location.assign("/Home/vocabularyDetail?Id=" + DATA[Id].lessionInfoId);
}

function ShowDataDeleteModal(i) {
    document.getElementById("lessonIdDelete").value = DATA[i].lessionInfoId;
}

function ShowDataEditModal(i) {
    document.getElementById("lessonIdEdit").value = DATA[i].lessionInfoId;
    document.getElementById("LessonUserImgEdit").src = DATA[i].image;
    document.getElementById("inpLessonUserImageEdit").value = DATA[i].image;
    document.getElementById("editLessonNameU").value = DATA[i].name;
}
function addLessonU() {
    const username = document.getElementById("currentUsername").value;
    const imgSrc = document.getElementById("inpLessonUserImage").value;
    const lessonName = document.getElementById("createLessonName").value;

    var data = {
        username: username,
        name: lessonName,
        image: imgSrc
    }

    $.ajax({
        url: '/Home/InsertUserLessonInfo',
        type: 'POST', // Phương thức HTTP
        data: data,
        success: function (result) {
            if (result) {
                alert("Đã thêm lesson!");
                window.location.href = window.location.href;
            }
        },
        error: function (error) {
            alert("Không thể thêm ngay lúc này!");
        }
    });

    
}

function saveEditLessonU() {
    const imgSrc = document.getElementById("inpLessonUserImageEdit").value;
    const lessonName = document.getElementById("editLessonNameU").value;
    const lessonId = document.getElementById("lessonIdEdit").value;
    var data = {
        lessionInfoId: lessonId,
        name: lessonName,
        image: imgSrc
    }

    $.ajax({
        url: '/Home/UpdateUserLessonInfo',
        type: 'POST', // Phương thức HTTP
        data: data,
        success: function (result) {
            if (result) {
                alert("Đã chỉnh sửa lesson!");
                window.location.href = window.location.href;
            }
        },
        error: function (error) {
            alert("Không thể chỉnh sửa ngay lúc này!");
        }
    });
}

function DeleteLessonU() {
    const lessonId = document.getElementById("lessonIdDelete").value
    var data = {
        lessionInfoId: lessonId,
    }

    $.ajax({
        url: '/Home/DeleteUserLessonInfo',
        type: 'POST', // Phương thức HTTP
        data: data,
        success: function (result) {
            if (result) {
                alert("Đã xóa lesson!");
                window.location.href = window.location.href;
            }
        },
        error: function (error) {
            alert("Không thể chỉnh sửa ngay lúc này!");
        }
    });
}