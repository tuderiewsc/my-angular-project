$(document).ready(function() {
});


function get_src(id) {
  var imageName = id;
  $('input#image').val('http://demoapps.ir/demo/api_articles/article/public/upload/image/'+imageName);
  $('#closedialog').click();
}

function remove_src() {
  $('input#image').val('');
}


