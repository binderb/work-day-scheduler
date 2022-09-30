function display_day() {
  var today = moment().format('dddd, MMMM Do, YYYY');
  $('#currentDay').text(today);
}

function build_planner() {
  // Build a table structure and populate the first column with
  // hours of the day.
  let s = '';
  for (let i=0;i<10;i++) {
    s += '<div class="row align-items-center border-0">';
      s += '<div class="col-1 p-4 h-100 d-flex align-items-start justify-content-end hour">';
        s += moment('8:00 AM','h:mm A').add(3600000*i).format('h A');
      s += '</div>';
      s += '<textarea class="col-10 p-0 h-100 text-white border-white"></textarea>';
      s += '<button class="col-1 h-100 d-flex align-items-center justify-content-center saveBtn fas fa-check fa-lg"></button>';
    s += '</div>';
  }
  $('#planner-table').append(s);
  // Add styling to the textarea elements based on the current time.
  $('#planner-table .row').each( function () {
    let time_string = $(this).find('.hour').text();
    let time_i_hrs = moment(time_string, 'h A').hours();
    let now_hrs = moment().hours();
    let textarea_i = $(this).find('textarea');
    if (now_hrs > time_i_hrs && now_hrs > time_i_hrs+1) textarea_i.addClass('past');
    else if (now_hrs >= time_i_hrs && now_hrs < time_i_hrs+1) textarea_i.addClass('present');
    else textarea_i.addClass('future');
  });

}

$( function() {
  display_day();
  build_planner();
});