
var backBtn= document.getElementById('back-btn');

backBtn.addEventListener('click', function() {
window.history.back()
});


// Sample data for each card
const cardData = [
  { imgSrc: '*/hello (1).png', definition: 'a word we say when we see someone and want to greet them, or when we begin to talk on the phone', 
  pronunciation: '/heˈloʊ/', word:'hello' },
  { imgSrc: './assets/imgs/hello (1).png', definition: 'a word we say when we see someone and want to greet them, or when we begin to talk on the phone', 
  pronunciation: '/heˈloʊ/', word:'hello' },
  { imgSrc: './assets/imgs/hello (1).png', definition: 'a word we say when we see someone and want to greet them, or when we begin to talk on the phone', 
  pronunciation: '/heˈloʊ/', word:'hello' },
  { imgSrc: './assets/imgs/hello (1).png', definition: 'a word we say when we see someone and want to greet them, or when we begin to talk on the phone', 
  pronunciation: '/heˈloʊ/', word:'hello' },
  { imgSrc: './assets/imgs/hello (1).png', definition: 'a word we say when we see someone and want to greet them, or when we begin to talk on the phone', 
  pronunciation: '/heˈloʊ/', word:'hello' },
  { imgSrc: './assets/imgs/hello (1).png', definition: 'a word we say when we see someone and want to greet them, or when we begin to talk on the phone', 
  pronunciation: '/heˈloʊ/', word:'hello' }
  
];

// Function to create a flip card
function createFlipCard(data,id,name) {
    const cardWrapper = document.createElement('item');
    let tag;
    let src = String(data.imgSrc);
    if (src[0] === "*")
    {
        let synonym = src.substring(1,src.length);
        tag = `<div class="synonym-container">
                    <span class="synonym">${synonym}</span>
                </div>`;
        
    }
    else
    {
        tag = `<img src="${data.imgSrc}">`;
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
                    <input class="form-check-input yes-checked" type="radio" name="${name}" id="inlineRadio1" value="option1">
                    <label class="form-check-label" for="inlineRadio1">Know it</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input no-checked" type="radio" name="${name}" id="inlineRadio2" value="option2">
                    <label class="form-check-label" for="inlineRadio2">Don't know</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- back side card -->
            <div class="content backContainer d-flex flex-column align-items-center justify-content-center">
              <div style="height: 50%; width: 100%; border-radius: 20px;">
                <h2 class="text-white fs-2 mt-2" style="text-align: center;">${data.word}</h2>
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

// ----------------create all cards---------
const container = document.getElementById("flip-card-container");
for(let i = 0;i < cardData.length;i++ ){
    let dataId ="box";
    dataId += i.toString();
    const card = createFlipCard(cardData[i],dataId,i.toString());
    container.appendChild(card);

}



// -------------------flip button for cards in learn vocab page--------
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.flip');
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const boxId = button.getAttribute('data-boxid');
        applyTransform(boxId);
      });
    });
  });

  function applyTransform(id) {
    var box = document.getElementById(id);
    box.classList.toggle('transform');
   
  }
