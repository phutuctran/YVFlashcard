function backtoLanding(){
    window.location.assign("http://127.0.0.1:5500/index.html");
}

var xValues = ["Learned (System)", "Learned(Yours)", "Dificult Words", "Word entered",];
var yValues = [55, 49, 44, 24, 15];
var barColors = ["#F2D8D8", "#5C8984","#C0DBEA","#FFDCA9"];

new Chart("myBarChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Statistics by Word count "
    }
  }
});

var xValues = ["Learned(System)", "Learned(Yours)", "Theme entered",];
var yValues = [55, 49, 44, ];
var barColors = [
  "#D8C4B6",
  "#96C291",
  "#FFDDCC",
 
];

new Chart("myPieChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Satictistic by Lesson count"
    }
  }
});