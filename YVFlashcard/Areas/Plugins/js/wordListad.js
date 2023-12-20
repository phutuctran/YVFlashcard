var DATA = [];
var LESSIONID;
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

function loadCreateImage() {
    var fileInput = document.getElementById('InputImg');
    var createImg = document.getElementById('createImg');

    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        // Set up the FileReader to read the selected file
        reader.onload = function (e) {
            // Set the source of the createImg to the loaded image
            createImg.src = e.target.result;
        };

        // Read the selected file as a data URL
        reader.readAsDataURL(fileInput.files[0]);
    }
}

function loadWordImage() {
    var finder = new CKFinder();
    finder.selectActionFunction = function (fileUrl) {

        document.getElementById("WordImg").src = fileUrl;
        document.getElementById("inpWordImage").value = fileUrl;
    }
    finder.popup();
}




function saveEditVocab() {
    let imgSrc = document.getElementById("modalImg").src;
    let vocab = document.getElementById("editVocab").value;
    let pro = document.getElementById("editPro").value;
    let part = document.getElementById("editPart").value;
    let def = document.getElementById("editDef").value;
}


function editHandle(buttonId) {
    const imgModal = document.getElementById("modalImg");
    let vocab = document.getElementById("editVocab").value;
    let pro = document.getElementById("editPro").value;
    let part = document.getElementById("editPart").value;
    let def = document.getElementById("editDef").value;
}

function CreateLessonRows(id) {
    DATA = [];
    LESSIONID = id;
    var lessonId = id;
    document.getElementById("word-table").innerHTML = "";
    var data = {
        lessonId: id,
    }
    $.ajax({
        url: '/Admin/Admin/GetWordByLessonid?lessonId=' + id,
        type: 'GET',
        success: function (_data) {
            for (let i = 0; i < _data.length; i++) {
                DATA.push(_data[i]);
            }
            

        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
    console.log(DATA);

    var container = document.getElementById("word-table");
   
    for (let i = 0; i < DATA.length; i++) {
        var row = renderRow(i, DATA[i].word1, DATA[i].pronunciation, DATA[i].partOfSpeech, dat[i].definition, DATA[i].imageOrSynomyn, DATA[i].wordId);
        container.appendChild(row);
    }

}

function renderRow(no, word, pro, pOS, def, image, id) {
    const row = document.createElement('tr')
    row.innerHTML = `
    
    <td>${no}</td>
    <td>${image} </td>
    <td>${word}</td>
    <td>${pro}</td>
    <td>${pOS}</td>
    <td>${def}</td>
    <input>${id}</input>
    <td>
        <div style="display: flex;">
            <button type="button" id="3" onclick="editHandleWord(${id})" class="btn btn-primary me-3 btn-sm" data-bs-toggle="modal" data-bs-target="#editVocab">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-primary btn-sm"><i class="fa-solid fa-trash"></i></button>
        </div>
    
    `
    return row;
}

function saveAddVocab() {
    console.log(LESSIONID);
    let imgSrc = document.getElementById("inpWordImage").value;
    let vocab = document.getElementById("createVocab").value;
    let pro = document.getElementById("createPro").value;
    let part = document.getElementById("createPart").value;
    let def = document.getElementById("createDef").value;
    data = {
        word1: vocab,
        pronunciation: pro,
        definition: def,
        partOfSpeech: part,
        imageOrSynomyn: imgSrc,
        lessionId: LESSIONID,
    }
    $.ajax({
        url: '/Admin/Admin/InsertWord',
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