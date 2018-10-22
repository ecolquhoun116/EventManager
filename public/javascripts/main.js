
  
$(document).ready(function() {

  /* Create event*/
    $('#start_date').datetimepicker();
    $('#end_date').datetimepicker();
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
  let start_date = $('#start_date').datetimepicker('viewDate').format("YYYY-MM-DD hh:mm:ss");
  let end_date = $('#end_date').datetimepicker('viewDate').format("YYYY-MM-DD hh:mm:ss");

  var event = {
    'title' : $('#title').val(),
    'description' : $('#description').val(),
    'date_start' : start_date,
    'date_end' : end_date,
    'location' : $('#location').val(),
    'public' : $('#private').val() == 'on' ? 1 : 0,
    'type' : $('#type').val(),
    'note' : $('#note').val(),
    'emails' : $("#email_added").tagsinput('items')
  }
  
  if ( event.title === "" && event.date_start ) {
    alert("You need to add title and date to start !");
  } else {
    $.post('submit-event', event, function(data) {
      // alert("The paragraph was clicked.");  
    });
  }
})
  /* END create event*/

