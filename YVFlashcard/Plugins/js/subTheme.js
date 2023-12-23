
// --------------------store Data------------------
const lessonsData = [
    { lessonNumber: 1, wordCount: 16, lessonTitle: "Hello and Goodbye"},
    { lessonNumber: 2, wordCount: 11,lessonTitle: "People"},
    { lessonNumber: 3, wordCount: 29, lessonTitle: "Numbers 0 - 100" },
    { lessonNumber: 4, wordCount: 21, lessonTitle: "Family" },
    { lessonNumber: 5, wordCount: 13, lessonTitle: "Colors" },
    { lessonNumber: 6, wordCount: 18, lessonTitle: "Months and Seasons" },
    { lessonNumber: 7, wordCount: 13, lessonTitle: "Time and Date" },
    { lessonNumber: 8, wordCount: 12, lessonTitle: "Personal Information" },
   
  ];

  // Function to create a language learning lesson card
  function createLessonCard(data) {
    const card = document.createElement("div");
    card.className = "col-6 px-5 mt-4";
    card.innerHTML = `
      <div class="card sub_theme-card">
        <h5 class="card-header sub_theme-header">Lesson ${data.lessonNumber} - ${data.wordCount} Words</h5>
        <div class="card-body">
          <h5 class="card-title mt-2">${data.lessonTitle}</h5>
          <div class="container">
            <div class="row">
              <div class="col pt-4 mt-4">
                <div class="row"><span class="viewlist-btn"><i class="fa-solid fa-list-ul fa-2x ms-3 "></i></span></div>
                <div class="row p-1">
                  <p>View list</p>
                </div>
              </div>
              <div class="col pt-5 mt-4">
                <button class="btn btn-outline-success ellipse-btn ms-5 learn-btn" type="button" data-bs-toggle="modal" data-bs-target="#myModalLearning"> LEARN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return card;
  }

  // Render language learning lesson cards
  const container = document.getElementById("all-subTheme-container");
  lessonsData.forEach(data => {
    const card = createLessonCard(data);
    container.appendChild(card);
  });


//---------- Attach a click event for each view list and learn button in sub theme page-----

var viewListIcons = document.querySelectorAll('.viewlist-btn');
viewListIcons.forEach(function(icon) {
  icon.addEventListener('click', function() {
    window.location.assign("http://127.0.0.1:5500/viewListVocab.html");
  });
});