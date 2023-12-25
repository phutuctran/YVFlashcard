
var lessonId = document.getElementById("lessonId").value;
function getData() {
    data = {
        lessonId: lessonId
    }
    $.ajax({
        url: '/Home/GetWordsByLessonId',
        type: 'POST',
        data: data,
        success: function (result) {
            renderAll(result);
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}
getData();



 // Function to create a vocabulary card
 function createVocabCard(data) {
    const card = document.createElement("div");
    card.className = "col-6 px-5 mt-4";
    card.innerHTML = `
      <div class="card mb-3 list_vocab-card">
        <div class="row g-0">
          <div class="col-md-3 mt-4">
            <div class="row ps-4 mt-4">
              <img src="${data.imageOrSynomyn}" class="vocab_img" alt="...">
            </div>
            <div class="row mt-5 ps-3">
              <h6 class="vocab_type mt-0">${data.partOfSpeech}</h6>
            </div>
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <div class="row">
                <div class="col-md-10">
                  <h4 class="vocab_text">${data.word1}</h4>
                  <h5 class="card-text vocab_pron"><large class="text-muted">${data.pronunciation}</large></h5>
                </div>
                <div class="col-md-2">
                  <span class="volume_icon"><i class="fa-solid fa-volume-high fa-2x"></i></i></span>
                </div>
              </div>
              <div class="row">
              </div>
              <div class="row">
                <p class="card-text">${data.definition}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return card;
  }

 







//---------- Attach a click event for speaker button for view list vocab page-----

function readText(event) {
    var parent = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var textToRead = parent.querySelector('.vocab_text').textContent;
    var msg = new SpeechSynthesisUtterance();
    msg.text = textToRead;
    window.speechSynthesis.speak(msg);
  }



function renderAll(DATA) {
    // Render vocabulary cards
    const container = document.getElementById("vocab-cards-container");
    DATA.forEach(data => {
        const card = createVocabCard(data);
        container.appendChild(card);
    });

    
        const buttons = document.querySelectorAll('.volume_icon');
        buttons.forEach(button => {
            button.addEventListener('click', readText);
        });

}

