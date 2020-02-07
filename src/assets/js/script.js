$(document).ready(function() {
});


function get_src(id) {
  var imageName = id;
  $('input#image').val('http://localhost:8000/upload/image/'+imageName);
  $('#closedialog').click();
}

function remove_src() {
  $('input#image').val('');
}


