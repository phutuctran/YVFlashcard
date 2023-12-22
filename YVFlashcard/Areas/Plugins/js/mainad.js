var dataCEFR =[];
var specialVocab = [] ;
var idioms = [];
function getall() {
    //console.log("getall");
    dataCEFR = [];
    specialVocab = [];
    idioms = [];
    $.ajax({
        url: '/Admin/Admin/GetAllTheme',
        type: 'GET', 
        success: function (data) {

            for (let i = 0; i < data.length; i++) {
                if (data[i].categoryId == 1) {
                    dataCEFR.push(data[i]);
                }
                if (data[i].categoryId == 2) {
                    specialVocab.push(data[i]);
                }
                if (data[i].categoryId == 3) {
                    idioms.push(data[i]);
                }
            }
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}

getall();


(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

})(jQuery);


// -------------------------------------Load Img Handle---------------------

function loadImage() {
    var finder = new CKFinder();
    finder.selectActionFunction = function (fileUrl) {
        
        document.getElementById("modalImg").src = fileUrl;
        document.getElementById("inpImage").value = fileUrl;
    }
    finder.popup();
}

function loadCreateImageTheme() {
    var finder = new CKFinder();
    finder.selectActionFunction = function (fileUrl) {
        console.log(fileUrl);
        $('#inpImageCreate').val(fileUrl);
        document.getElementById("createImg").src = fileUrl;

    }
    
    finder.popup();
    
}




// ----------------------------------------render data ----------------------
let TYPE = 1;

function renderRow(img,name, des,id){
    const row = document.createElement('tr')
    row.innerHTML=`
        <td>1</td>
        <td><img src="${img}"  width="70px" height="70px"/></td>
        <td>${name}</td>
        <td>${des}</td>
        <td > 
            <div style="display: flex;">
                <button type="button" id="${id}" class="btn btn-primary btn-sm me-3" onclick="editHandle(${id})" data-bs-toggle="modal" data-bs-target="#themeModal">
                <i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="btn btn-primary btn-sm me-3" onclick ="viewHandle(${id})"> <i class="fa-solid fa-list-ul"></i></button>
                <button type="button" id="delete${id}" class="btn btn-primary me-3 btn-sm" onclick="deleteTheme(${id})"> <i class="fa-solid fa-trash"></i></button>
            </div>  
        </td>
    `
    return row;
}



function viewHandle(id) {
    var key;
    if (TYPE == 1) {
        key = dataCEFR[id].themeId;
    }
    else if (TYPE == 2) {
        key = specialVocab[id].themeId;
    }
    else if (TYPE == 3) {
        key = idioms[id].themeId;
    }
    window.location.href = '/Admin/Admin/wordList?ThemeId=' + key;
}


function renderAllRows(data){
    const container = document.getElementById("theme-table");
    for (let i = 0; i < data.length; i++){
        const temp = renderRow(data[i].image, data[i].name, data[i].description, i.toString());
        container.appendChild(temp);
    }
}


let dataIndex;



function editHandle(buttonId){
    const imgModal = document.getElementById("modalImg");
   
    var inpImg = document.getElementById("inpImageCreate");
    var name = document.getElementById("modalName");
    var des = document.getElementById("modalDes");
    dataIndex=buttonId;
    if (TYPE == 1) {
        inpImg.value = dataCEFR[buttonId].image;
        imgModal.src = dataCEFR[buttonId].image;
        name.value = dataCEFR[buttonId].name;
        des.value = dataCEFR[buttonId].description;
        return;
    }
    if (TYPE == 2) {
        inpImg.value = specialVocab[buttonId].image;
        imgModal.src = specialVocab[buttonId].image;
        name.value = specialVocab[buttonId].name;
        des.value = specialVocab[buttonId].description;
        return;
    }
    if (TYPE == 3) {
        inpImg.value = idioms[buttonId].image;
        imgModal.src = idioms[buttonId].image;
        name.value = idioms[buttonId].name;
        des.value = idioms[buttonId].description;
        return;
    }
}

function clearTableTheme(str){
    const container = document.getElementById("theme-table");
    container.innerHTML="";
    const infor = document.getElementById("theme-infor");
    infor.innerText=str;
}
function cefrHandle(){
    clearTableTheme("CEFR LEVEL");

    //console.log("here" +  dataCEFR);
    
    renderAllRows(dataCEFR);
   
    TYPE=1;
}
function specialVocabHandle(){
    clearTableTheme("SPECIALIZED VOCABULARY");
    renderAllRows(specialVocab);
    TYPE=2;
}
function idiomHandle(){
    clearTableTheme("IDIOMS");
    renderAllRows(idioms);
    TYPE=3;
}

function saveEdit() {
    let imgSrc = document.getElementById("inpImage").value;
    let name = document.getElementById("modalName").value;
    let des = document.getElementById("modalDes").value;
    var data = [];
    if (TYPE == 1) {
        data = {
            themeId: dataCEFR[dataIndex].themeId,
            image: imgSrc,
            description: des,
            name: name
        }
        dataCEFR[dataIndex].image = imgSrc;
        dataCEFR[dataIndex].name = name;
        dataCEFR[dataIndex].description = des;
        cefrHandle();

    }
    if (TYPE == 2) {
        var data = {
            themeId: specialVocab[dataIndex].themeId,
            image: imgSrc,
            description: des,
            name: name
        }
        specialVocab[dataIndex].img = imgSrc;
        specialVocab[dataIndex].name = name;
        specialVocab[dataIndex].des = des;
        specialVocabHandle();

    }
    if (TYPE == 3) {
        var data = {
            themeId: idioms[dataIndex].themeId,
            image: imgSrc,
            description: des,
            name: name
        }
        idioms[dataIndex].img = imgSrc;
        idioms[dataIndex].name = name;
        idioms[dataIndex].des = des;
        idiomHandle();

    }
    //console.log(data.themeId);
    $.ajax({
        url: '/Admin/Admin/UpdateTheme',
        type: 'POST', // Phương thức HTTP
        data: data,
        success: function (result) {
            console.log(result);  
        },
        error: function (error) {
            console.log(error);
            if (TYPE == 1) {
                cefrHandle();

            }
            if (TYPE == 2) {
                specialVocabHandle();

            }
            if (TYPE == 3) {
                idiomHandle();

            }
        }
    });
    document.getElementById("closeEditTheme-btn").click(); 
}
function deleteTheme(id) {
    let key = -1;
    if (TYPE == 1) {
        key = dataCEFR[id].themeId;
    }
    else if (TYPE == 2) {
        key = specialVocab[id].themeId;
    }
    else if (TYPE == 3) {
        key = idioms[id].themeId;
    }
    if (key != -1) {
        data = {
            id: key
        }
        $.ajax({
            url: '/Admin/Admin/DeleteTheme',
            type: 'POST', // Phương thức HTTP
            data: data,
            success: function (result) {
                console.log(result);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    getall();
    if (TYPE == 1) {
        cefrHandle();
    }
    else if (TYPE == 2) {
        specialVocabHandle();
    }
    else if (TYPE == 3) {
        idiomHandle();
    }
}

// ------------------add hanle-----------

function addRow() {
    let imgSrc = document.getElementById("inpImageCreate").value;
    let name = document.getElementById("createName").value;
    let des = document.getElementById("createDes").value;

    data = {
        categoryId: 1,
        image: imgSrc,
        description: des,
        name: name
    }
    if (TYPE == 1) {
        data.categoryId = 1;
    }
    else if (TYPE == 2) {
        data.categoryId = 2;
    }
    else if (TYPE == 3) {
        data.categoryId = 3;
    }

    $.ajax({
        url: '/Admin/Admin/InsertTheme',
        type: 'POST', // Phương thức HTTP
        data: data,
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.log(error);
        }
    });
    getall();
    if (TYPE == 1) {
        cefrHandle();
    }
    else if (TYPE == 2) {
        specialVocabHandle();
    }
    else if (TYPE == 3) {
        idiomHandle();
    }
   
}

