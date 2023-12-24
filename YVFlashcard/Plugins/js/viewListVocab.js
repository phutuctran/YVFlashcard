const vocabData = [
    {
      imgSrc: "./assets/imgs/hello (1).png",
      type: "interjection",
      word: "hello",
      pronunciation: "/heˈloʊ/",
      definition: "a word we say when we see someone and want to greet them, or when we begin to talk on the phone",
    },
    {
        imgSrc: "./assets/imgs/goodbye (2).png",
        type: "interjection",
        word: "goodbye",
        pronunciation: "/ˌɡʊdˈbaɪ/",
        definition: "a word we say when we are leaving or someone is leaving, or at the end of a phone call",
    },
    {
        imgSrc: "./assets/imgs/morning.png",
        type: "interjection",
        word: "good morning",
        pronunciation: "/ɡˈʊd mˈɔːɹnɪŋ/",
        definition: "something we say when we want to greet or say hello to someone in the morning",
    },
    {
        imgSrc: "./assets/imgs/afternoon.png",
        type: "interjection",
        word: "good afternoon",
        pronunciation: "/ɡˈʊd ˌæftɚnˈuːn/",
        definition: "something we say when we want to say hello or goodbye to a person in the afternoon",
    },
    {
        imgSrc: "./assets/imgs/evening.png",
        type: "interjection",
        word: "good evening",
        pronunciation: "/ɡˈʊd ˈiːvnɪŋ/",
        definition: "something we say when we want to say hello or goodbye to a person in the evening",
    },
    {
        imgSrc: "./assets/imgs/thankyou.png",
        type: "interjection",
        word: "thank you",
        pronunciation: "/θˈæŋk juː/",
        definition: "something we say to someone to show we are grateful to them for something that they have done for us or given us",
    }

  ];


 // Function to create a vocabulary card
 function createVocabCard(data) {
    const card = document.createElement("div");
    card.className = "col-6 px-5 mt-4";
    card.innerHTML = `
      <div class="card mb-3 list_vocab-card">
        <div class="row g-0">
          <div class="col-md-3 mt-4">
            <div class="row ps-4 mt-4">
              <img src="${data.imgSrc}" class="vocab_img" alt="...">
            </div>
            <div class="row mt-5 ps-3">
              <h6 class="vocab_type mt-0">${data.type}</h6>
            </div>
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <div class="row">
                <div class="col-md-10">
                  <h4 class="vocab_text">${data.word}</h4>
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

  // Render vocabulary cards
  const container = document.getElementById("vocab-cards-container");
  vocabData.forEach(data => {
    const card = createVocabCard(data);
    container.appendChild(card);
  });








//---------- Attach a click event for speaker button for view list vocab page-----

function readText(event) {
    var parent = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var textToRead = parent.querySelector('.vocab_text').textContent;
    var msg = new SpeechSynthesisUtterance();
    msg.text = textToRead;
    window.speechSynthesis.speak(msg);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.volume_icon');
    buttons.forEach(button => {
      button.addEventListener('click', readText);
    });
  });