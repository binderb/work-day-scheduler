function display_day() {
  var today = moment().format('dddd[,] MMMM Do, YYYY');
  $('#currentDay').text(today);
}

function build_planner() {
  
}

$( function() {
  display_day();
  build_planner();
});