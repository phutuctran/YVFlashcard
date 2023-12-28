var DATA = []
var themeId = document.getElementById("currentTheme").value;
function getData() {
    data = {
        themeId: themeId
    }
    $.ajax({
        url: '/Home/GetLessonbyThemeId',
        type: 'POST',
        data: data,
        success: function (result) {
            for (let i = 0; i < result.length; i++) {
                result[i].lessonNo = "Lesson " + (i + 1);
                DATA.push(result[i]);
            }
            console.log(result);
            renderAll();
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}
getData();

// --------------------store Data------------------


  // Function to create a language learning lesson card
  function createLessonCard(data) {
    const card = document.createElement("div");
    card.className = "col-6 px-5 mt-4";
    card.innerHTML = `
      <div class="card sub_theme-card"   >
        <h5 class="card-header sub_theme-header" id="${data.lessonNo}" >${data.lessonNo} - ${data.totalWord} Words</h5>
        <div class="card-body">
          <h5 class="card-title mt-2">${data.name}</h5>
          <div class="container">
            <span class="text-secondary" hidden id="spanNoti${data.lessionInfoId}">To unblock this lesson you need to finish the prebious one first!</span>
            <div class="row" id="btn${data.lessionInfoId}">
              <div class="col pt-4 mt-4" id="">
                <div class="row"><span class="viewlist-btn" id="view${data.lessionInfoId}"><i class="fa-solid fa-list-ul fa-2x ms-3 "></i></span></div>
                <div class="row p-1">
                  <p>View list</p>
                </div>
              </div>
              <div class="col pt-5 mt-4">
                <button onclick="AddHrefModal(${data.lessionInfoId})"  class="btn btn-outline-success ellipse-btn ms-5 learn-btn" type="button" data-bs-toggle="modal" data-bs-target="#myModalLearning"> LEARN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return card;
}

function AddHrefModal(lessonId) {
    document.getElementById("flashcard").href = "/Home/flashcardLearning?lessonId=" + lessonId; 
    document.getElementById("spelling").href = "/Home/spellingLearning?lessonId=" + lessonId;
    document.getElementById("memory").href = "/Home/memoryLearning?lessonId=" + lessonId;
    document.getElementById("quiz").href = "/Home/quizLearning?lessonId=" + lessonId;
}

function renderAll() {
    // Render language learning lesson cards
    const container = document.getElementById("all-subTheme-container");
    DATA.forEach(data => {
        const card = createLessonCard(data);
        container.appendChild(card);
        if (!data.enable) {
            document.getElementById(data.lessonNo).classList.add("blockLesson");
            document.getElementById(`btn${data.lessionInfoId}`).hidden = true;
            document.getElementById(`spanNoti${data.lessionInfoId}`).hidden = false;
       

           
        }
        //console.log(data.lessonNo);
       /* document.getElementById(data.lessonNo).innerHTML = data.enable;*/
        console.log(data.enable);
    });

    //---------- Attach a click event for each view list and learn button in sub theme page-----

    var viewListIcons = document.querySelectorAll('.viewlist-btn');
    viewListIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            let lessonId = icon.id.replace("view", "");
            window.location.assign("/Home/viewListVocab?lessonId=" + lessonId);
        });
    });
}

  