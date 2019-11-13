$(document).ready(function () {

});




function getsrc(id) {
  var imgSource = $('li#' + id).find('img').attr('src');
  //$('input#imgLink').focus().val('image');
  //$('input#imgLink').val('');
  $('input#imgLink').val(imgSource);
  $('button#closedialog').click();
}
