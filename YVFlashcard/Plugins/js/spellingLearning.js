
//var backBtn= document.getElementById('back-btn');

//backBtn.addEventListener('click', function() {
//window.history.back()
//});
  
  
// -----------------------------Spelling game tab ------------------
var words = [];
var lessonId = document.getElementById("lessonId").value;
var own = document.getElementById("lessDes").value;
function getDataforSpelling() {
    data = {
        lessonId: lessonId
    }
    var url = "/Home/GetWordsByLessonId";
    if (own == "own" ) {
        url = "/Home/GetWordsUserByLessonId"
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function (result) {
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                words.push({
                    word: result[i].word1,
                    hint: result[i].definition
                })
            }
            console.log(words);
            initGame();
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
}
getDataforSpelling();

const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector(".spelling-input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word"),
showAnswer = document.querySelector(".show-answer");



    Bs5Utils.defaults.toasts.position = 'middle-right';
    Bs5Utils.defaults.toasts.container = 'toast-container';
    Bs5Utils.defaults.toasts.stacking = true;
    const bs = new Bs5Utils();
let correctWord, timer;

// const initTimer = maxTime => {
//     clearInterval(timer);
//     timer = setInterval(() => {
//         if(maxTime > 0) {
//             maxTime--;
//             return timeText.innerText = maxTime;
//         }
//         bs.Modal.show({
//             type: 'warning',
//             title: 'Hello World!',
//             content: 'Hello World!',
//             buttons: [],
//             centered: true,
//             dismissible: true,
//             backdrop: 'static',
//             keyboard: true,
//             focus: false,
//         });
 
//         initGame();
//     }, 1000);
// }

const showAnswerhandle = () => {
    bs.Modal.show({
              type: 'secondary',
                title: correctWord,
                content: '',
                 buttons: [],
                 centered: true,
                 dismissible: true,
                  backdrop: 'static',
                  keyboard: true,
                  focus: false,
               });
         
}

showAnswer.addEventListener("click", showAnswerhandle)  

const initGame = () => {
    // initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}


const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) {
        bs.Toast.show({
            type: 'warning',
            icon: '<i class="fa-solid fa-circle-check"></i>',
            title: 'Notification!',
            subtitle: 'Correct word',
            content: 'Please enter a word!',
            buttons: [],
            delay: 1500
        });
        return;
    }
    // return alert("Please enter the word to check!");
    if(userWord !== correctWord)  
    // return alert(`Oops! ${userWord} is not a correct word`);
    {   
       
        
        bs.Toast.show({
            type: 'danger',
            icon: '<i class="fa-solid fa-circle-xmark"></i>',
            title: 'Notification!',
            subtitle: 'Incorrect word',
            content: 'Oops this is not a correct word!',
            buttons: [],
            delay: 1500
        });
        return;
    }
    
    bs.Toast.show({
        type: 'success',
        icon: '<i class="fa-solid fa-circle-check"></i>',
        title: 'Notification!',
        subtitle: 'Correct word',
        content: 'This is a correct word!',
        buttons: [],
        delay: 1500
    });
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);


