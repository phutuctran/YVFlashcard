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

function loadWordImageForEdit() {
    var finder = new CKFinder();
    finder.selectActionFunction = function (fileUrl) {

        document.getElementById("modalImgWord").src = fileUrl;
        document.getElementById("inpWordImageEdit").value = fileUrl;
    }
    finder.popup();
}


function clearTableWord() {
    const container = document.getElementById("word-table");
    container.innerHTML = "";
}

function saveEditVocab() {
    clearTableWord();
    let imgSrc = document.getElementById("inpWordImageEdit").value;
    let vocab = document.getElementById("editVocabWord").value;
    let pro = document.getElementById("editProWord").value;
    let part = document.getElementById("editPartWord").value;
    let def = document.getElementById("editDefWord").value;
    let id = document.getElementById("wordIdEdit").value;
    let lessonId = document.getElementById("lessonIdEdit").value;
    tmpdata = {
        wordId: id,
        word1: vocab,
        pronunciation: pro,
        definition: def,
        partOfSpeech: part,
        imageOrSynomyn: imgSrc,
        lessionId: lessonId,
    }
    $.ajax({
        url: '/Admin/Admin/UpdateWord',
        type: 'POST', // Phương thức HTTP
        data: tmpdata,
        success: function (result) {
            console.log("OK" + result);
            CreateLessonRows(lessonId);
            var button = document.getElementById('closeEdit-btn');
            button.click();
        },
        error: function (error) {
            console.log(error);
            
        }
        
    });

  
}


function CreateLessonRows(id) {
    clearTableWord();
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
            renderAllRowWord(DATA);
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
    
    

}

function renderAllRowWord(data) {
    var container = document.getElementById("word-table");

    //console.log(data.length);

    for (let i = 0; i < data.length; i++) {
        //console.log(data[i]);
        //console.log(data[i].partOfSpeech);
        const row = renderRowWord(i, data[i].word1, data[i].pronunciation, data[i].partOfSpeech, data[i].definition, data[i].imageOrSynomyn, data[i].wordId);
        container.appendChild(row);
        
    }
}

function renderRowWord(no, word, pro, pOS, def, image, id) {

    
    const row = document.createElement('tr')
    row.innerHTML = `
    
    <td>${no + 1}</td>
    <td><img src="${image}"  width="70px" height="70px"/> </td>
    <td>${word}</td>
    <td>${pro}</td>
    <td>${pOS}</td>
    <td>${def}</td>
    <td>
        <div style="display: flex;">
            <button type="button" id="3" onclick="editHandleWord(${no})" class="btn btn-primary me-3 btn-sm" data-bs-toggle="modal" data-bs-target="#editVocab">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-primary btn-sm"><i class="fa-solid fa-trash"></i></button>
        </div>
    <td>
    
    `
    return row;
}

function editHandleWord(id) {
    //console.log(id);
    document.getElementById("modalImgWord").src = DATA[id].imageOrSynomyn;
    document.getElementById("inpWordImageEdit").value = DATA[id].imageOrSynomyn;
    document.getElementById("editVocabWord").value = DATA[id].word1;
    document.getElementById("editProWord").value = DATA[id].pronunciation;
    document.getElementById("editPartWord").value = DATA[id].partOfSpeech;
    document.getElementById("editDefWord").value = DATA[id].definition;
    document.getElementById("wordIdEdit").value = DATA[id].wordId;
    document.getElementById("lessonIdEdit").value = DATA[id].lessionId;
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
            document.getElementById("closeCreateWord-btn").click();
            clearTableWord();
            document.getElementById("inpWordImage").value = "";
            document.getElementById("WordImg").src = "";
            document.getElementById("createVocab").value = "";
            document.getElementById("createPro").value = "";
            document.getElementById("createPart").value = "";
            document.getElementById("createDef").value = "";
            CreateLessonRows(LESSIONID);
           
        },
        error: function (error) {
            console.log(error);
       
        }
    });

}

