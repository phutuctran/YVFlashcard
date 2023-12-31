'use strict';


// ---------------------------storeData--------------
var wordData = [];
var imgData = [];
let arrBoxWord = []
let arrImgBox = []
var box = []; 
var cards1 = [];
var cards2 = [];
var cards = [];
var lessonId = document.getElementById("lessonId").value;
var own = document.getElementById("lessDes").value;
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
			for (let i = 0; i < result.length; i++) {
				wordData.push(result[i].word1);
				imgData.push(result[i].imageOrSynomyn);
			}
			renderALlBoxes();

			cards1 = toObject(arrBoxWord, arrImgBox);
			cards2 = toObject(arrImgBox, arrBoxWord);
			cards = { ...cards1, ...cards2 }
			box = Array.from(document.querySelectorAll('.box'));
			box.forEach(el => el.addEventListener('click', flipOnClick));
			container.innerHTML = '';
		},
		error: function (error) {
			console.log('Error:', error);
		}
	});
}
getData();

// --------------------------render box----------------

function createWordBox(boxIdx,word){
	const wordBox = document.createElement("div");
	wordBox.className =`box ${boxIdx}`
	wordBox.innerHTML =`
	<div class="box backside">
		<span><div class="text-container">
	  		<p>${word}</p>
		</div></span>
  	</div>
	`;
	return wordBox;
}

function createImgBox(boxIdx,src){
	let srcTmp = String(src);
	if (srcTmp[0] === '*') {
		srcTmp=srcTmp.substring(1,srcTmp.length)
		srcTmp += `<span class="synonym-note"> <br/> synonym</span>`
		return createWordBox(boxIdx, srcTmp);
	}
	const imgBox = document.createElement("div");
	imgBox.className = `box ${boxIdx}`
	imgBox.innerHTML = `
	<div class="box backside">
		<img src="${src}"/>
  	</div>
  `
	return imgBox;
}



const containerBox = document.getElementById("memory-box-container");

function renderALlBoxes(){
	let j = wordData.length;
	for(let i=0; i < wordData.length;i++){
		let temp="box"
		temp+= i.toString();
		arrBoxWord.push(temp);
		const newWordBox = createWordBox(temp,wordData[i]);
		containerBox.appendChild(newWordBox)
		temp ="box"
		temp +=j.toString();
		arrImgBox.push(temp);
		const newImgBox = createImgBox(temp,imgData[i])
		containerBox.appendChild(newImgBox)
		j++;
	} 
}

function toObject(keys, values) {
	const obj = Object.fromEntries(
	  keys.map((key, index) => [key, values[index]]),
	);
  
	return obj;
	}




const winAudio = new Audio('/assets/audio/GameWinning.mp3');

//CARBON == MAIN PANEL !
const carbon = document.querySelector('.carbon');
const time = document.querySelector('.time');
const counter = document.querySelector('.counter');
const circle1 = document.querySelector('.panel__one');
const circle2 = document.querySelector('.panel__two');
const circle3 = document.querySelector('.panel__three');
const container = document.querySelector('.container');

let correct_flips = 0;
let last_flipped = [];
let moves = 0;
let seconds = 0;
let minutes = 0;
let seconds_str = '';
let minutes_str = '';
let timer_observer;

container.innerHTML = '';

function flipOnClick(e) {
	moves++;
	counter.innerHTML = moves;
	const element = e.target;
	last_flipped.push(element);
	element.classList.add('flipped');
	// console.log(last_flipped.length);
	compareFlipped(last_flipped);
}

function compareFlipped(array) {
	if (array.length > 2) {
		array.forEach(el => el.classList.remove('flipped'));
		last_flipped = [];
	}
	if (array.length == 2) {
		const card1 = array[0].classList[1];
		const card2 = array[1].classList[1];
		if (cards[card1] == card2 || cards[card2] == card1) {
			// console.log('Yay its a match');
			const c1 = document
				.getElementsByClassName(card1)[0]
				.firstElementChild.classList.add('matchingcards');
			const c2 = document
				.getElementsByClassName(card2)[0]
				.firstElementChild.classList.add('matchingcards');
			correct_flips += 1;
			last_flipped = [];
		} else {
			setTimeout(() => {
				array.forEach(el => el.classList.remove('flipped'));
				last_flipped = [];
			}, 700);
		}
	}
}

function spreadCards(array) {
	let new_Arr = array.filter(el => array.indexOf(el) % 2 == 0);
	while (0 < new_Arr.length) {
		const num = Math.floor(Math.random() * new_Arr.length);
		const pick = new_Arr[num];
		container.appendChild(pick);
		// console.log(container);
		new_Arr.splice(num, 1);
	}
}

function startWatching(seconds, minutes) {
	timer_observer = setInterval(() => {
		seconds > 58 ? ((minutes += 1), (seconds = 0)) : (seconds += 1);
		seconds_str = seconds > 9 ? `${seconds}` : `0${seconds}`;
		minutes_str = minutes > 9 ? `${minutes}` : `0${minutes}`;
		time.innerHTML = `${minutes_str}:${seconds_str}`;
		if (correct_flips >= wordData.length) {
			// audio.play();
			clearInterval(timer_observer);
			gameWonParty(moves);
			return;
		}
		// console.log(minutes, seconds_str);
	}, 1000);
}

function startGame() {
	correct_flips = 0;
	last_flipped = [];
	moves = 0;
	seconds = 0;
	minutes = 0;
	seconds_str = '';
	minutes_str = '';
	time.innerHTML = 'XX:XX';
	counter.innerHTML = '0';
	container.innerHTML = '';
	box.forEach(el => el.classList.remove('flipped'));
	clearInterval(timer_observer);
	spreadCards(box);
	container.childNodes.forEach(node =>
		node.firstElementChild.classList.remove('matchingcards')
	);
	startWatching(seconds, minutes);
}

function gameWonParty(moves) {

	// alert("hihi");
	// winAudio.play();

	// alert(`You Won with just ${moves} moves !`);
	//NOTE: make a fancy celebration with canvas
}



circle1.addEventListener('click', (e) => {
	clearInterval(timer_observer);
	container.innerHTML = '';
	time.innerHTML = 'XX:XX';
	counter.innerHTML = '0';
});

circle2.addEventListener('click', (e) => {
	carbon.style.height = '85%';
	carbon.style.width = '65%';
});
//green circle
circle3.addEventListener('click', (e) => {
	carbon.style.height = '90%';
	carbon.style.width = '90%';
});


//var backBtn= document.getElementById('back-btn');

//  backBtn.addEventListener('click', function() {
//    window.history.back()
//  });