
function scrollToStartSection(){
    document.getElementById('start_section').scrollIntoView();
}

// ---------------------------data storage-----------------
var specialCardData = [];
var cefrCardData = [];
var idiomCardData = [];
const videoSrcs = [
    "/Plugins/localImgs/A.webm",
    "/Plugins/localImgs/B.webm",
    "/Plugins/localImgs/C.webm",
    "/Plugins/localImgs/D.webm",
    "/Plugins/localImgs/E.webm",
    "/Plugins/localImgs/F.webm",
    "/Plugins/localImgs/G.webm",
    "/Plugins/localImgs/H.webm",
    "/Plugins/localImgs/I.webm",
    "/Plugins/localImgs/K.webm",
    "/Plugins/localImgs/M.webm",
    "/Plugins/localImgs/N.webm",
    "/Plugins/localImgs/O.webm",
    "/Plugins/localImgs/P.webm",
    "/Plugins/localImgs/Q.webm",
    "/Plugins/localImgs/R.webm",
    "/Plugins/localImgs/S.webm",
    "/Plugins/localImgs/T.webm",
    "/Plugins/localImgs/U.webm",
    "/Plugins/localImgs/V.webm",
    "/Plugins/localImgs/W.webm",
    "/Plugins/localImgs/Y.webm",
    "/Plugins/localImgs/Z.webm",
]

const username = document.getElementById("currentUsername").value;
const needTestFirst = document.getElementById("needTestFirst").value;
function GetAllThemefromDB() {
    specialCardData = [];
    cefrCardData = [];
    idiomCardData = [];
    let countVideo = 0;

    $.ajax({
        url: '/Home/GetAllTheme',
        type: 'GET',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                data[i].videoSrc = videoSrcs[countVideo];
                if (i % 2 === 0) {
                    data[i].enable = true;
                }
                else {
                    data[i].enable = false;
                }
                countVideo++;
                if (countVideo >= videoSrcs.length) {
                    countVideo = 0;
                }
                if (data[i].categoryId == 1) {
                    cefrCardData.push(data[i]);
                }
                if (data[i].categoryId == 2) {
                    specialCardData.push(data[i]);
                }
                if (data[i].categoryId == 3) {
                    idiomCardData.push(data[i]);
                }
            }
            //alert("hehe");
            rederCard();
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}

GetAllThemefromDB();     

function NavToUserPage() {
    window.location.href("/Home/UserPage");
}

// ------------------------render 3 types cards-----------------------

  // Function to create a specialized card
function createCard(data) {
    
    const card = document.createElement("div");
    card.className = "col-3 specialised";
    card.innerHTML = `
      <div class="card card_themeEnable" data-category="specialised" id="CardId${data.themeId}">
        <div class="outer_card">
          <div class="pics">
            <img src="${data.image}" class="outer_img">
            <video src="${data.videoSrc}" autoplay="autoplay" muted loop class="inner_img"></video>
            <h class="inner_txt">${data.totalLession} lessons - ${data.totalWords} words</h>
          </div>
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.description}</p>
          </div>
        </div>
      </div>
    `;
    return card;
  }

  function createCefrCard(data) {
      const card = document.createElement("div");
      card.className = "col-3 CEFR";
          card.innerHTML = `
          <div class="card card_themeEnable" data-category="CEFR" id="CardId${data.themeId}">
            <div class="outer_card">
              <div class="pics">
                <img src="${data.image}" class="outer_img">
                <video src="${data.videoSrc}" autoplay="autoplay" muted loop class="inner_img"></video>
                <h class="inner_txt">${data.totalLession} lessons - ${data.totalWords} words</h>
              </div>
              <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.description}</p>
              </div>
            </div>
          </div>
            `;
      return card;
     
           
   
  }


  function createIdiomCard(data) {
    const card = document.createElement("div");
    card.className = "col-3 idioms";
    card.innerHTML = `
      <div class="card card_themeEnable" data-category="idioms" id="CardId${data.themeId}">
        <div class="outer_card">
          <div class="pics">
            <img src="${data.image}" class="outer_img">
            <video src="${data.videoSrc}" autoplay="autoplay" muted loop class="inner_img"></video>
            <h class="inner_txt">${data.totalLession} lessons - ${data.totalWords} words</h>
          </div>
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.description}</p>
          </div>
        </div>
      </div>
    `;
    return card;
  }

function rederCard() {

    const container = document.getElementById("all-cards-container");
    specialCardData.forEach(data => {
        const card = createCard(data, );
        container.appendChild(card);
      
    });

    // Render CEFR cards

    cefrCardData.forEach(data => {
        const card = createCefrCard(data);
        container.appendChild(card);
    });

    // Render idiom cards
    idiomCardData.forEach(data => {
        const card = createIdiomCard(data);
        container.appendChild(card);
    });
    
    HoverCard();
    if (username != "") {
        if (needTestFirst) {
            AddEventForCardWhenLoginWithTest()
        }  
    }
    else {
        AddEventForCardWhenNoLogin();
    }
    filterSelection("all");
    AddEventForCard();

    const videos = document.querySelectorAll("video");
    videos.forEach(function (video) {
        video.play();
    })

}


//----------------------- hover card color change------------
function HoverCard() {
    const colors = ['#3C865D', '#AD7409', '#5D7D9C', '#C65A3C',];
    const boxes = document.querySelectorAll('.card_themeEnable');
    boxes.forEach((box, index) => {
        box.addEventListener('mouseover', () => {
            box.style.backgroundColor = colors[index % colors.length];
        });

        box.addEventListener('mouseout', () => {
            box.style.backgroundColor = '';
        });
    });
}


//----------------------- filtering options------------


function filterSelection(c){
    var x, i;
    x = document.getElementsByClassName("col-3");
    if(c == "all") c="";
     // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for( i =0; i < x.length; i++){
        removeClass(x[i],"show");
        if(x[i].className.indexOf(c) > -1) addClass(x[i],"show")
    }

}
// SHow filtered elements
function addClass(element, name){
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for( i = 0; i < arr2.length; i++){
        if(arr1.indexOf(arr2[i]) == -1){
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }

  // Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[1].className = current[1].className.replace(" active", "");
    this.className += " active";
  });
}

//---------- Attach a click event for each card-----

function AddEventForCardWhenNoLogin() {
    var cards = document.querySelectorAll('.card_themeEnable');
    
    cards.forEach(function (card) {
        card.className = "card card_themeDisable";
        card.addEventListener('click', function () {
            document.getElementById("showSignInAnnouce").click();
        });
    });
}



function AddEventForCardWhenLoginWithTest() {

    cefrCardData.forEach(function (card) {
        let cefrCard = document.getElementById(`CardId${card.themeId}`);
        if (!card.enable) {
            cefrCard.className = "card card_themeDisable"
            cefrCard.addEventListener('click', function () {
                document.getElementById("showTestAnnouce").click();
            });
        }
    });

    specialCardData.forEach(function (card) {
        let specialCard = document.getElementById(`CardId${card.themeId}`);
        if (!card.enable) {
            specialCard.className = "card card_themeDisable"
        }

    });


    idiomCardData.forEach(function (card) {
        var idiomCard = document.getElementById(`CardId${card.themeId}`);
        console.log(idiomCard);
        if (!card.enable) {
            idiomCard.className = "card card_themeDisable";
        }
    });
 

}

function AddEventForCard() {
    var cards = document.querySelectorAll('.card_themeEnable');
    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            window.location.assign("http://127.0.0.1:5500/EnglishVocabularyFlashcard/subTheme.html");
        });
    });
}

function NavToTestPage() {

}

function NavToSignIn() { }


