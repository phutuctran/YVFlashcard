function backHandle(){
    window.history.back()
}
var lessonId = document.getElementById("lessonId").value;
var username = document.getElementById("username").value;
var wordData = [];
var listId = [];
function getData() {
    var data = {
        lessonId: lessonId
    }
    $.ajax({
        url: '/Home/GetWordsUserByLessonId',
        type: 'POST',
        data: data,
        success: function (result) {
            console.log(result);
            wordData = result;
            renderAll();
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}

getData();

function renderAll() {
    for (let i = 0; i < wordData.length; i++)
    {
        addVocabU(wordData[i], i);

    }
}

function renderVocabU(data, id) {
    const vocabCard = document.createElement("div");
    vocabCard.className = "col-6 mt-5"
    vocabCard.id = "box " + id;
    vocabCard.innerHTML = `
    <div  class="vocab-container" style="border: 1px solid black; width: 500px; height:330px; border-radius: 10px;">

    <form class="m-4" >
        <div class="d-flex">
            <div class="ms-3">

                <label>Vocabulary</label><br>
                <input type="text"  style="border: 1px solid grey" id="vob ${id}" value="${data.word1}" required>
                <label>Pronunciation</label><br>
                <input type="text"  style="border: 1px solid grey" id="pro ${id}" value="${data.pronunciation}">
                <label>Part of Speech</label><br>
                <input type="text"  style="border: 1px solid grey" id="pOS ${id}" value="${data.partOfSpeech}">
            </div>
            <div class="ms-5">
                <div class="d-flex">
                    <img id="LessonUserImg ${id}" src="${data.imageOrSynomyn}" width="100px" height="100px" /><br />
                                            
                    <span ><i class="fa-solid fa-trash ms-5" onclick="deleteVocabU(${id})"></i></span>
                 </div>
                <input id="inpLessonUserImage ${id}" type="hidden" name="Image" value="${data.imageOrSynomyn}" />
                 <button type="button" class="btn ms-3  mt-2 btn-success ellipse-btn btn-sm " onclick="loadWordImageLessonU(${id})">Upload</button><br />

            </div>
        </div>
        <div>
            <label style="margin-left: 4%;">Definition</label>
            <textarea name=""  id="def ${id}" cols="50" rows="4"  style="border: 1px solid grey; margin-left: 4%;" required>${data.definition}</textarea>
        </div>

    </form>
    
</div>
    `
    return vocabCard;
}

function renderVocabUNon(id) {
    const vocabCard = document.createElement("div");
    vocabCard.className = "col-6 mt-5"
    vocabCard.id = "box " + id;
    vocabCard.innerHTML = `
    <div class="vocab-container" style="border: 1px solid black; width: 500px; height:330px; border-radius: 10px;">
    <form class="m-4" >
        <div class="d-flex">
            <div class="ms-3">

                <label>Vocabulary</label><br>
                <input type="text"  style="border: 1px solid grey" id="vob ${id}" value="" required>
                <label>Pronunciation</label><br>
                <input type="text"  style="border: 1px solid grey" id="pro ${id}" value="">
                <label>Part of Speech</label><br>
                <input type="text"  style="border: 1px solid grey" id="pOS ${id}" value="">
            </div>
            <div class="ms-5">
                <div class="d-flex">
                    <img id="LessonUserImg ${id}" src="/Plugins/localImgs/Avt.png" width="100px" height="100px" /><br />
                                            
                    <span ><i class="fa-solid fa-trash ms-5" onclick="deleteVocabU(${id})"></i></span>
                 </div>
                <input id="inpLessonUserImage ${id}" type="hidden" name="Image" value="/Plugins/localImgs/Avt.png" />
                 <button type="button" class="btn ms-3  mt-2 btn-success ellipse-btn btn-sm " onclick="loadWordImageLessonU(${id})">Upload</button><br />

            </div>
        </div>
        <div>
            <label style="margin-left: 4%;">Definition</label>
            <textarea name=""  id="def ${id}" cols="50" rows="4"  style="border: 1px solid grey; margin-left: 4%;" required></textarea>
        </div>

    </form>

</div>
    `
    return vocabCard;
}

function deleteVocabU(id) {
    document.getElementById("box " + id).remove();
    listId = listId.filter(item => item != id);
    console.log(listId);
}

function addVocabU(data, id) {
    const container = document.getElementById("lessonU-container");
    container.appendChild(renderVocabU(data, id));
    listId.push(id);
    console.log(id);
    
}
function addVocabUNon() {
    const container = document.getElementById("lessonU-container");
    var id = listId[listId.length - 1] + 1;
    if (listId.length == 0) {
        id = 0;
    }
    container.appendChild(renderVocabUNon(id));
    listId.push(id);
    console.log(listId);


}

function loadWordImageLessonU(id) {
    var finder = new CKFinder();
    finder.selectActionFunction = function (fileUrl) {

        document.getElementById("LessonUserImg " + id).src = fileUrl;
        document.getElementById("inpLessonUserImage " + id).value = fileUrl;
    }
    finder.popup();
}

function SaveVob() {
    console.log(listId);
    for (let i = 0; i < listId.length; i++) {
        var id = listId[i];
        var word = document.getElementById("vob " + id).value;
        var pro = document.getElementById("pro " + id).value;
        var pOS = document.getElementById("pOS " + id).value;
        var def = document.getElementById("def " + id).value;
        var img = document.getElementById("inpLessonUserImage " + id).value;
        if (word == "" || def == "") {
            alert("Chưa nhập đủ");
            return;
        }

        //Check lại đống này trước nếu trường quan trọng nào chưa nhập thì out ko cho lưu
    }
    var data = {
        lessonId: lessonId
    }
    $.ajax({
        url: '/Home/DeleteAllWordsByLessonId',
        type: 'POST',
        data: data,
        success: function (result) {
            SaveAllVocabulary();
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}

function SaveAllVocabulary() {
    for (let i = 0; i < listId.length; i++) {
        var id = listId[i];
        var word = document.getElementById("vob " + id).value;
        var pro = document.getElementById("pro " + id).value;
        var pOS = document.getElementById("pOS " + id).value;
        var def = document.getElementById("def " + id).value;
        var img = document.getElementById("inpLessonUserImage " + id).value;

        var data = {
            word1: word,
            pronunciation: pro,
            definition: def,
            partOfSpeech: pOS,
            imageOrSynomyn: img,
            lessionId: lessonId
        }
        $.ajax({
            url: '/Home/InsertUserWord',
            type: 'POST',
            data: data,
            success: function (result) {
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });    
    }
    alert("Thêm thành công");
    //Delay 1-2s nha
    //window.location.href = window.location.href;
}