
// Define global variable to keep track of entries;
// this will be defined in 'load_entries' function.
var entries = [];

// This function populates the 'entries' global array
// depending on whether there is stored data in localStorage.
function load_entries () {
  if (localStorage.getItem('entries') !== null) {
    // Pull the entry array saved in localStorage
    // if it exists.
    entries = JSON.parse(localStorage.getItem('entries'));
  } else {
    // If no localStorage values are found, create an empty
    // array of entry objects.
    for (let i=0;i<10;i++) {
      entries.push({
        entry_time: moment('8:00 AM','h:mm A').add(3600000*i).format('h A'),
        entry_text: ''
      });
    }
  }
}

// This function simply updates the header element
// to contain the current weekday and date.
function display_day() {
  var today = moment().format('dddd, MMMM Do, YYYY');
  $('#currentDay').text(today);
}

// This function generates the planner table, using
// Bootstrap classes and provided CSS classes to style
// the content and highlight the table based on the
// current time of day. Previously-saved entries are also
// loaded in.
function build_planner() {
  // Build a table structure and populate the first column with
  // hours of the day.
  let s = '';
  for (let i=0;i<10;i++) {
    s += '<div class="row align-items-center border-dark">';
      s += '<div class="col-1 p-4 h-100 d-flex align-items-start justify-content-end hour">';
        s += moment('8:00 AM','h:mm A').add(3600000*i).format('h A');
      s += '</div>';
      s += '<textarea class="col-10 p-0 h-100 p-2 text-white"></textarea>';
      s += '<button class="col-1 h-100 d-flex align-items-center justify-content-center saveBtn fas fa-check fa-lg"></button>';
    s += '</div>';
  }
  $('#planner-table').append(s);

  // Fill the table with the contents of the global 'entries'
  // variable, set up previously on page load.
  $('.hour').each( function() {
    let entry_text_i = entries.filter(e => e.entry_time === $(this).text())[0].entry_text;
    $(this).siblings('textarea').text(entry_text_i);
  });

  // Add styling to the textarea elements based on the current time.
  $('#planner-table .row').each( function () {
    let time_string = $(this).find('.hour').text();
    let time_i = moment(time_string, 'h A').unix();
    let now = moment().unix();
    let textarea_i = $(this).find('textarea');
    if (now > time_i && now > time_i+3600) textarea_i.addClass('past');
    else if (now >= time_i && now < time_i+3600) textarea_i.addClass('present');
    else textarea_i.addClass('future');
  });

  // Add event listeners for save buttons and textareas
  $('textarea').on('change keyup paste', activate_save_button);
  $('.saveBtn').on('click', save_entry);

}

// This function changes the styling on save buttons
// adjacent to a textarea that has been edited,
// letting the user know that unsaved changes may exist.
function activate_save_button () {
  $(this).siblings('button').removeClass("fas fa-check fa-lg");
  $(this).siblings('button').addClass("fas fa-save fa-lg edited");
}

// This function gathers entry data from the appropriate row
// of the planner table after a save button is clicked, updates
// the global 'entries' array and then saves the array to
// localStorage.
function save_entry () {
  let entry_data = {
    entry_time : $(this).siblings('.hour').text(),
    entry_text : $(this).siblings('textarea').val()
  };
  let entry_to_replace = entries.filter(e => e.entry_time == entry_data.entry_time)[0];
  let entry_index = entries.indexOf(entry_to_replace);
  entries[entry_index] = entry_data;
  localStorage.setItem('entries',JSON.stringify(entries));

  $(this).removeClass("fas fa-save fa-lg edited");
  $(this).addClass("fas fa-check fa-lg");
}

// Startup function that will run after page load.
$( function() {
  load_entries();
  display_day();
  build_planner();
});