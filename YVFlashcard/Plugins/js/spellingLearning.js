
var backBtn= document.getElementById('back-btn');

backBtn.addEventListener('click', function() {
window.history.back()
});
  
  
  // -----------------------------Spelling game tab ------------------
  let words = [
    {
        word: "addition",
        hint: "The process of adding numbers"
    },
    {
        word: "meeting",
        hint: "Event in which people come together"
    },
    {
        word: "number",
        hint: "Math symbol used for counting"
    },
    {
        word: "exchange",
        hint: "The act of trading"
    },
    {
        word: "canvas",
        hint: "Piece of fabric for oil painting"
    },
    {
        word: "garden",
        hint: "Space for planting flower and plant"
    },
    {
        word: "position",
        hint: "Location of someone or something"
    },
    {
        word: "feather",
        hint: "Hair like outer covering of bird"
    },
    {
        word: "comfort",
        hint: "A pleasant feeling of relaxation"
    },
    {
        word: "tongue",
        hint: "The muscular organ of mouth"
    },
    {
        word: "expansion",
        hint: "The process of increase or grow"
    },
    {
        word: "country",
        hint: "A politically identified region"
    },
    {
        word: "group",
        hint: "A number of objects or persons"
    },
    {
        word: "taste",
        hint: "Ability of tongue to detect flavour"
    },
    {
        word: "store",
        hint: "Large shop where goods are traded"
    },
    {
        word: "field",
        hint: "Area of land for farming activities"
    },
    {
        word: "friend",
        hint: "Person other than a family member"
    },
    {
        word: "pocket",
        hint: "A bag for carrying small items"
    },
    {
        word: "needle",
        hint: "A thin and sharp metal pin"
    },
    {
        word: "expert",
        hint: "Person with extensive knowledge"
    },
    {
        word: "statement",
        hint: "A declaration of something"
    },
    {
        word: "second",
        hint: "One-sixtieth of a minute"
    },
    {
        word: "library",
        hint: "Place containing collection of books"
    },
]



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
initGame();

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


