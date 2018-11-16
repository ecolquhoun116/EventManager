
  
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
    $.alert({
        title: 'Wait !',
        content: 'You need to add title and date to start.',
    });
  } else {
    $.post('submit-event', event, function(data) {
      $.alert({
          title: 'Done !',
          content: 'Your event has been added.',
      });
    });
  }
});

/* Join event*/
$('.join-event').click(function() {
  
  var event = {
    'id' : $(this).attr('id_event'),
    'email' : $("#feeds").attr('email')
  }
  console.log(event);
  $.post('join-event', event, function(data) {
    
    
  }).then(()=> {
    if ($(this).attr('join') == 'n' ) {
      $(this).attr('class', 'join-event btn btn-info');
      $(this).text('Un-Join');
      $(this).attr('join', 'y');
      $.alert({
        title: 'Have fun !',
        content: 'You joined the event :)',
      });
    } else {
      $(this).attr('class', 'join-event btn btn-primary');
      $(this).text('Join Event');
      $(this).attr('join', 'n');
    }

  });
});

/*Login Authentication */
$('#login').click(function(){
	  const email = $("#inputEmail1").val();
      const password = $("#inputPassword").val();
      $.post("/login", ({email: email, password: password }), function(data, status) {
        if (data){
			window.open("/feed","_self");
			document.getElementById("errs").style["display"] ="none"; 
			document.getElementById("em_l").style["color"]="green";
		document.getElementById("pd_l").style["color"]="green";}
        else{
			document.getElementById("errs").style["display"] ="block"; 
			document.getElementById("em_l").style["color"]="red";
			document.getElementById("pd_l").style["color"]="red";}

      });  		  
});

$('#register').click(function(){
	  const firstname = $("#inputFirstName").val();
	  const lastname=	$("#inputLastName").val();
	  const email = $("#inputEmail").val();
      const password = $("#inputPassword").val();
	  const c_password= $("#inputPassword_Comfirm").val();
	  if(checkIfEmailInString(email)){
	  if( ((password!="" && c_password!="")&& password==(c_password)) && (email!="" && (firstname!="" && lastname!="") ))
	  {
      $.post("/register", ({ firstname: firstname, lastname: lastname, email: email, password: c_password }), function(data, status) {
		if (data){
          window.open("/login","_self");
		  document.getElementById("err").style["display"] ="none"; 
		  document.getElementById("em").style["color"]="green";
        }else{
		  document.getElementById("err").style["display"] ="block"; 
		  document.getElementById("em").style["color"]="red";}
		});
	  }
	  }else
	  {
		  document.getElementById("em").style["color"]="red";
	  }
});

function checkIfEmailInString(text) { 
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
	return re.test(text);
}
  /* END create event*/

