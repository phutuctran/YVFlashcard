


// ----------------------timer-----------------
const startingMinutes=25;
let time = startingMinutes*60;

const countdownEl = document.getElementById('countdown');
 setInterval(updateCountdown,1000);

function updateCountdown(){
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    countdownEl.innerHTML = `${minutes}: ${seconds}`;
    if(time === 0) return;
    time--;
}


// -----------------------Load questions---------------
let questionData = [
    {
    num:"1",
    question: " see: They saw it.",
    answer: "thấy",
    options: [
      "cắt",
      "đợi",
      "thấy",
      "bắt đầu"
    ]
  },
  {
    num:"2",
    question: " time: They have a lot of time",
    answer: "thời gian",
    options: [
      "tiền",
      "thức ăn",
      "thời gian",
      "bạn bè"
    ]
  },
  {
    num:"3",
    question: " period: It was a difficult period.",
    answer: "giai đoạn",
    options: [
      "câu hỏi",
      "giai đoạn",
      "việc cần làm",
      "quyển sách"
    ]
  },
  {
    num:"4",
    question: " figure: Is this the right figure?",
    answer: "con số",
    options: [
      "câu trả lời",
      "địa điểm",
      "thời gian",
      "con số"
    ]
  },
  {
    num:"5",
    question: "poor: We are poor",
    answer: "nghèo",
    options: [
      "nghèo",
      "hạnh phúc",
      "quan tâm",
      "lười làm việc"
    ]
  },
  {
    num:"6",
    question: " drive: He drives fast.",
    answer: "lái xe",
    options: [
      "bơi",
      "học",
      "ném bóng",
      "lái xe"
    ]
  },
  {
    num:"7",
    question: " jump: She tried to jump.",
    answer: "nhảy lên",
    options: [
      "nổi trên mặt nước",
      "nhảy lên",
      "đỗ xe",
      "chạy"
    ]
  },
  {
    num:"8",
    question: " shoe: Where is your shoe?",
    answer: "giày",
    options: [
      "mẹ",
      "ví đựng tiền",
      "giấy bút",
      "giày"
    ]
  },
  {
    num:"9",
    question: " standard: Her standards are very high.",
    answer: "tiêu chuẩn",
    options: [
      "gót giày",
      "điểm số",
      "mức lương",
      "tiêu chuẩn"
    ]
  },
  {
    num:"10",
    question: " basis: I don't understand the basis.",
    answer: "điều căn bản",
    options: [
      "lý do",
      "từ vựng",
      "biển chỉ đường",
      "điều căn bản"
    ]
  },
  {
    num:"11",
    question: " maintain: Can they maintain it?",
    answer: "duy trì",
    options: [
      "duy trì",
      "phóng to",
      "cải thiện",
      "đạt được"
    ]
  },
  {
    num:"12",
    question: " stone: He sat on a stone.",
    answer: "hòn đá",
    options: [
      "hòn đá",
      "cái ghế",
      "tấm thảm",
      "cành cây"
    ]
  },
  {
    num:"13",
    question: " upset: I am upset.",
    answer: "buồn bã",
    options: [
      "mệt",
      "nổi tiếng",
      "giàu có",
      "buồn bã"
    ]
  },
  {
    num:"14",
    question: " drawer: The drawer was empty.",
    answer: "ngăn kéo tủ",
    options: [
      "ngăn kéo tủ",
      "nhà để xe",
      "tủ lạnh",
      "chuồng thú"
    ]
  },
  {
    num:"15",
    question: " patience: He has no patience",
    answer: "kiên nhẫn",
    options: [
      "rảnh rỗi",
      "kiên nhẫn",
      "đức tin",
      "công bằng"
    ]
  },
  {
    num:"16",
    question: " nil: His mark for that question was nil.",
    answer: "số không",
    options: [
      "rất tệ",
      "số không",
      "rất tốt",
      "trung bình"
    ]
  },
  {
    num:"17",
    question: "  pub: They went to the pub.",
    answer: "quán rượu",
    options: [
      "quán rượu",
      "ngân hàng",
      "trung tâm mua sắm",
      "hồ bơi"
    ]
  },
  {
    num:"18",
    question: "  circle: Make a circle.",
    answer: "vòng tròn",
    options: [
      "bản phác thảo",
      "khoảng trống",
      "vòng tròn",
      "cái lỗ lớn"
    ]
  },
  {
    num:"19",
    question: " microphone: Please use the microphone",
    answer: "điện thoại di động",
    options: [
      "lò vi sống",
      "máy phóng thanh",
      "kính hiển vi",
      "điện thoại di động"
    ]
  },
  {
    num:"20",
    question: "  pro: He's a pro",
    answer: "người chơi chuyên nghiệp",
    options: [
      "thám tử",
      "gã ngốc",
      "nhà báo",
      "người chơi chuyên nghiệp"
    ]
  },
  {
    num:"21",
    question: "  soldier: He is a soldier",
    answer: "binh sĩ",
    options: [
      "thương gia",
      "sinh viên",
      "thợ luyện kim",
      "binh sĩ"
    ]
  },
  {
    num:"22",
    question: "  restore: It has been restored.",
    answer: "phân phối lại",
    options: [
      "lặp lại",
      "phân phối lại",
      "giảm giá",
      "trùng tu"
    ]
  },
  {
    num:"23",
    question: "  jug: He was holding a jug.",
    answer: "cái bình",
    options: [
      "cái bình",
      "cuộc tán gẫu",
      "mũ nồi",
      "súng, đạn"
    ]
  },
  {
    num:"24",
    question: "  scrub: He is scrubbing it.",
    answer: "chà sạch",
    options: [
      "cào xước",
      "sửa sang",
      "chà sạch",
      "vẽ phát họa"
    ]
  },
  {
    num:"25",
    question: "  dinosaur: The children were pretending to be dinosaurs.",
    answer: "khủng long",
    options: [
      "cướp biển",
      "tiểu tiên nữ",
      "con rồng",
      "khủng long"
    ]
  },
  {
    num:"26",
    question: " strap: He broke the strap.",
    answer: "khủng long",
    options: [
      "lời hứa",
      "cái nắp",
      "cái đĩa",
      "quai xách"
    ]
  },
  {
    num:"27",
    question: " pave: It was paved.",
    answer: "được lát nền",
    options: [
      "bị chặn",
      "bị chia ra",
      "được viền vàng",
      "được lát nền"
    ]
  },
  {
    num:"28",
    question: " dash: They dashed over it",
    answer: "lao tới",
    options: [
      "lao tới",
      "la cà",
      "giành nhau",
      "liếc qua"
    ]
  },
  {
    num:"29",
    question: "  rove: He couldn't stop roving.",
    answer: "đi đây đi đó",
    options: [
      "say rượu",
      "đi đây đi đó",
      "ngâm nga",
      "làm việc chăm chỉ"
    ]
  },
  {
    num:"30",
    question: "  lonesome: He felt lonesome.",
    answer: "cô đơn",
    options: [
      "vô ơn",
      "mệt mỏi",
      "cô đơn",
      "hăng hái"
    ]
  },
  {
    num:"31",
    question: "  compound: They made a new compound.",
    answer: "hỗn hợp",
    options: [
      "thỏa thuận",
      "hỗn hợp",
      "công ty",
      "suy đoán"
    ]
  },
  {
    num:"32",
    question: "  latter: I agree with the latter.",
    answer: "người/vật nhắc đến sau",
    options: [
      "linh mục",
      "lý do",
      "người/vật nhắc đến sau",
      "câu trả lời"
    ]
  },
  {
    num:"33",
    question: "  candid: Please be candid.",
    answer: "người/vật nhắc đến sau",
    options: [
      "cẩn thận",
      "thông cảm",
      "công bằng",
      "thẳng thắn"
    ]
  },
  {
    num:"34",
    question: "  tummy: Look at my tummy",
    answer: " bụng",
    options: [
      "cái khăn",
      "bụng",
      "con sóc",
      "ngón tay cái"
    ]
  },
  {
    num:"35",
    question: "  quiz: We made a quiz",
    answer: " bài kiểm tra",
    options: [
      "mũi tên",
      "lỗi lớn",
      "bài kiểm tra",
      "chuồng chim"
    ]
  },
  {
    num:"36",
    question: "  input: We need more input.",
    answer: "đầu vào",
    options: [
      "đầu vào",
      "công nhân",
      "bột trám",
      "tiền"
    ]
  },
  {
    num:"37",
    question: "  crab: Do you like crabs?",
    answer: "con cua",
    options: [
      "con cua",
      "cong tôm",
      "con dế",
      "con mực"
    ]
  },
  {
    num:"38",
    question: " vocabulary: You will need more vocabulary.",
    answer: "đầu vào",
    options: [
      "từ vựng",
      "kỹ năng",
      "tiền",
      "súng"
    ]
  },
  {
    num:"39",
    question: "  remedy: We found a good remedy.",
    answer: "công thức nấu ăn",
    options: [
      "giải pháp",
      "nhà hàng",
      "công thức nấu ăn",
      "công thức toán"
    ]
  },
  {
    num:"40",
    question: "  allege: They alleged it.",
    answer: "phán bác",
    options: [
      "khẳng định",
      "ăn cấp ý tưởng",
      "chứng minh",
      "phán bác"
    ]
  },
  {
    num:"41",
    question: "  deficit: The company had a large deficit",
    answer: "bị thâm thủng",
    options: [
      "bị thâm thủng",
      "mất giá",
      "có kế hoạch chi tiêu lớn",
      "có nhiều tiền gửi ngân hàng"
    ]
  },
  {
    num:"42",
    question: "  weep: He wept",
    answer: "khóc",
    options: [
      "hoàn thành khóa học",
      "khóc", 
      "chết",
      "lo lắng"
    ]
  },
  {
    num:"43",
    question: "  nun: We saw a nun",
    answer: "nữ tu",
    options: [
      "con giun",
      "tai nạn", 
      "nữ tu",
      "ánh cực quang"
    ]
  },
  {
    num:"44",
    question: "  haunt: The house is haunted.",
    answer: "có ma",
    options: [
      "nhiều đồ trang trí",
      "cho thuê", 
      "trống",
      "có ma"
    ]
  },
  {
    num:"45",
    question: "  compost: We need some compost.",
    answer: "phân bón",
    options: [
      "sự ủng hộ nhiệt tình",
      "an ủi", 
      "bê tông",
      "phân bón"
    ]
  },
  {
    num:"46",
    question: "  cube: I need one more cube.",
    answer: "khối vuông",
    options: [
      "đinh ghim",
      "khối vuông", 
      "cốc vại",
      "tấm bìa gập đôi"
    ]
  },
  {
    num:"47",
    question: "  miniature: It is a miniature",
    answer: "vi trùng",
    options: [
      "mô hình",
      "kính hiển vi", 
      "vi trùng",
      "dấu gạch nối"
    ]
  },
  {
    num:"48",
    question: "  peel: Shall I peel it?",
    answer: "phân bón",
    options: [
      "ngâm nước",
      "gọt vỏ", 
      "tẩy trắng",
      "xắt lát"
    ]
  },
  {
    num:"49",
    question: "  compost: We need some compost.",
    answer: "phân bón",
    options: [
      "sự ủng hộ nhiệt tình",
      "an ủi", 
      "bê tông",
      "phân bón"
    ]
  },
  {
    num:"50",
    question: "  bacterium: They didn't find a single bacterium",
    answer: "vi khuẩn",
    options: [
      "vi khuẩn",
      "cây hoa cúc", 
      "lạc đà",
      "đồ gian"
    ]
  },
]

// ----------------------------render each question----------------
function renderQuiz(question,op1,op2,op3,op4,name,num){
    
    const ques = document.createElement("div");
    ques.className="question";
    ques.innerHTML=` 
            <p>
               ${num} . ${question}
            </p>

            <input type="radio" name="${name}" value="${op1}"> <label> ${op1}</label><br>
            <input type="radio" name="${name}" value="${op2}"> <label> ${op2}</label><br>
            <input type="radio" name="${name}" value="${op3}"><label> ${op3}</label><br>
            <input type="radio" name="${name}" value="${op4}"><label> ${op4}</label>
            <br><br>`
    return ques;
}

// ---------------------------render question in 2 column----------------

const container1 = document.getElementById("questions-container1");
const container2 = document.getElementById("questions-container2");
let index = 1;
questionData.forEach(data => {
    let radioName ="radio"
    radioName += index.toString();
    const ques = renderQuiz(data.question,data.options[0],data.options[1],data.options[2],data.options[3],radioName,data.num);
    if(index %2 === 0){
        container2.appendChild(ques);
    }
    else{
        container1.appendChild(ques);
    }
    index++;
  });
 

function getAnswers(){
  let answers=[];
  for( i  = 1; i <= 50; i++){
    let temp="radio";
    temp+=i.toString()
    let ele = document.getElementsByName(temp);
    for(j = 0; j < ele.length; j++){
       if(ele[j].checked) {
         answers[i]=ele[j].value;
      }
    }
     if(!answers[i])
     answers[i]=("x");
  }
  return answers;
}


function countRightAnswers(){
   let answer =getAnswers();
   let rightAnswers = 0;
   for(i = 0; i < questionData.length; i++){
        if(answer[i+1] === questionData[i].answer)
              rightAnswers++;
   }
   	return rightAnswers;
}


function sortLevel (rightAnswers){
   let level="";
   switch(true){
    case rightAnswers >= 0 && rightAnswers < 15:
      level = "A1";
      break;
    case rightAnswers >= 15 && rightAnswers < 25:
      level="A2";
      break;
    case rightAnswers >=25 && rightAnswers < 33:
      level="B1";
      break;
    case rightAnswers >=33 && rightAnswers < 38:
      level="B2";
      break;
    case rightAnswers >= 38 && rightAnswers < 45:
      level ="C1";
      break;
    case rightAnswers >=45 && rightAnswers <-50:
      level="C2";
      break;
   }
   return level;
}

function showRightAnswers(){
    
    let temp1 = countRightAnswers();
    let temp2 = sortLevel(temp1);
    const showResult = document.getElementById("yourLevel");
    showResult.innerText = `You should start from ${temp2} level with ${temp1} correct answers!`;
    let level = 0;
    switch (temp2) {
        case "A1":
            level = 1;
            break;
        case "A2":
            level = 2;
            break;
        case "B1":
            level = 3;
            break;
        case "B2":
            level = 4;
            break;
        case "C1":
            level = 5;
            break;
        case "C2":
            level = 6;
            break;
    }
    var username = document.getElementById("username").value;
    var data = {
        index: level,
        username: username,
        num: temp1,
    }

    $.ajax({
        url: '/Home/SetStartCERF',
        type: 'POST', // Phương thức HTTP
        data: data,
        success: function (result) {
        },
        error: function (error) {
        }
    });
}

function resetHandle(){ 
  countdownEl.innerText="hihi";
  for( i  = 1; i <= 50; i++){
    let temp="radio";
    temp+=i.toString()
    let ele = document.getElementsByName(temp);
    for(j = 0; j < ele.length; j++){
       ele[j].checked =false;
    }
    
  }
  
}

function startLearningHandle() {
    window.location.href = "/Home/Index";
}