
  
$(document).ready(function() {

  /* Create event*/
  $('#start_date').datepicker({});

  $('#end_date').datepicker({});
  $('#private').change(function() {
    if (this.checked) {
      $('#add_email').toggle(1000);
    } else {
      $('#add_email').toggle(1000);
    }
  });
  /* END create event*/

});


/* Create event*/
$('#submit_event').click(function() {
  var event = {
    'title' : $('#title').val(),
    'description' : $('#description').val(),
    'date_start' : $('#start_date').val(),
    'date_end' : $('#end_date').val(),
    'location' : $('#location').val(),
    'public' : $('#private').val(),
    'type' : $('#type').val(),
    'note' : $('#note').val(),
    'emails' : $("#email_added").tagsinput('items')
  }
  $.post('submit-event', event, function(data) {
    // alert("The paragraph was clicked.");

  });
})
  /* END create event*/

