
//var backBtn= document.getElementById('back-btn');

//backBtn.addEventListener('click', function() {
//window.history.back()
//});
var cardData = [];
var lessonId = document.getElementById("lessonId").value;
var username = document.getElementById("username").value;
var own = document.getElementById("lessDes").value;
var listDiff = [];
function getData() {
    var data = {
        lessonId: lessonId
    }
    var url = "/Home/GetWordsByLessonId";
    if (own == "own") {
        url = "/Home/GetWordsUserByLessonId"
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function (result) {
            console.log(result);
            cardData = result;
            renderAll();
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}

getData();



// Function to create a flip card
function createFlipCard(data,id,name) {
    const cardWrapper = document.createElement('item');
    let tag;
    let src = String(data.imageOrSynomyn);
    if (src[0] === "*")
    {
        let synonym = src.substring(1,src.length);
        tag = `<div class="synonym-container">
                    <span class="synonym">${synonym}</span>
                </div>`;
        
    }
    else
    {
        tag = `<img src="${data.imageOrSynomyn}">`;
    }
    cardWrapper.innerHTML = `
      <div class="container learn_vocab-container">
        <div class="box" id="${id}">
          <div class="body">
            <!-- front side card -->
            <div class="frontContainer">
              <div class="frontContainerCard">
                <div style="width: 100%; height: 10%; background-color: #BCA37F; border-bottom-left-radius: 50%; border-bottom-right-radius: 50%;"></div>
                <div class="imgContainer">
                  ${tag}
                </div>
                <div class="vocab_def m-4">
                  <p style="text-align: justify;">${data.definition}</p>
                </div>
                <div class="ps-5 ms-5">
                  <button class="flip btn btn-outline-success ellipse-btn m-4" data-boxid="${id}">Flip</button>
                </div>
                <div class="ps-4 m-3">
                  <div class="form-check form-check-inline">
                    <input class="form-check-input yes-checked" type="radio" name="${name}" id="inlineRadio${name}" onclick="CalDiff(${name}, 1)" value="option1">
                    <label class="form-check-label" for="inlineRadio${name}" onclick="CalDiff(${name}, 1)">Know it</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input no-checked" type="radio" name="${name}" id="inlineRadio2${name}" onclick="CalDiff(${name}, 2)" value="option2">
                    <label class="form-check-label" for="inlineRadio2${name}" onclick="CalDiff(${name}, 2)">Don't know</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- back side card -->
            <div class="content backContainer d-flex flex-column align-items-center justify-content-center">
              <div style="height: 50%; width: 100%; border-radius: 20px;">
                <h2 class="text-white fs-2 mt-2" style="text-align: center;">${data.word1}</h2>
                <h5 class="card-text vocab_pron">
                  <large class="text-muted">${data.pronunciation}</large>
                </h5>
                <button class="flip mt-5 btn btn-outline-success ellipse-btn" data-boxid="${id}" style="margin-left:40%;">Flip</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return cardWrapper;
}

function CalDiff(id, type) {
    //type = 1: know
    //type = 2: dontknow
    if (type == 1) {
        listDiff = listDiff.filter(item => item != id);
        console.log("1 - " + listDiff);
    }
    if (type == 2) {
        if (listDiff.indexOf(id) == -1) {
            listDiff.push(id);
            console.log("2 - " + listDiff);
        }
    }
    if (listDiff.length == 0) {
        document.getElementById("addWordListbtn").hidden = true;
    }
    else {
        document.getElementById("addWordListbtn").hidden = false;
    }
    document.getElementById("dificultWords").innerText = listDiff.length;

}


function addLessonU() {
    var lessonImg = document.getElementById("inpLessonUserImage").value;
    var lessonName = document.getElementById("createLessonName").value;
    var data = {
        name: lessonName,
        username: username,
        image: lessonImg
    }
    $.ajax({
        url: '/Home/InsertUserLessonInfo',
        type: 'POST',
        data: data,
        success: function (result) {
            InsertWordToNewList(lessonName);
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });

}

function InsertWordToNewList(lessonName) {
    var data = {
        username: username,
        lessonname: lessonName
    }
    $.ajax({
        url: '/Home/GetNewUserLesson',
        type: 'POST',
        data: data,
        success: function (result) {
            console.log(result);
            for (let i = 0; i < listDiff.length; i++) {
                var dataword = cardData[listDiff[i]];
                dataword.lessionId = result.lessionInfoId;

                $.ajax({
                    url: '/Home/InsertUserWord',
                    type: 'POST',
                    data: dataword,
                    success: function (result) {
                        console.log("added!");
                    },
                    error: function (error) {
                        console.log('Error:', error);
                    }
                });
            }
            setTimeout(function () {
                alert("Đã thêm!");
                window.location.href = window.location.href;

            }, 1000);
            
            
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}

// ----------------create all cards---------
function renderAll() {
    const container = document.getElementById("flip-card-container");
    for (let i = 0; i < cardData.length; i++) {
        let dataId = "box";
        dataId += i.toString();
        const card = createFlipCard(cardData[i], dataId, i.toString());
        container.appendChild(card);

    }

        
        const buttons = document.querySelectorAll('.flip');
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const boxId = button.getAttribute('data-boxid');
                applyTransform(boxId);
            });
        });

}


// -------------------flip button for cards in learn vocab page--------


  function applyTransform(id) {
    var box = document.getElementById(id);
    box.classList.toggle('transform');
   
  }
