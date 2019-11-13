$(document).ready(function () {

});


function getsrc(id) {
  var imgSource = $('li#' + id).find('img').attr('src');
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(imgSource).select();
  document.execCommand("copy");
  $temp.remove();
  $('button#closedialog').click();
  alert('متن کپی شد!');
}


