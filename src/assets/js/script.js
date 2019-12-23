
jQuery(document).ready(function ($) {

	$('form#main_search').find('button').click(function (event) {
		$('form#main_search').find('input').focus();
		var searchText = $('form#main_search').find('input').val();
		var inputWidth = $('form#main_search').find('input').width();
		if (searchText == '' && innerWidth == 0) {
			event.preventDefault();
		} else {
			if (inputWidth == 0) {
				event.preventDefault();
				$('form#main_search').find('input').animate({ width: '250px' }, 300).css('background', '#eee');
				$(this).css('background', '#009688');
			}
		}
	});

	$('form#main_search').find('input').focusout(function (event) {
		setInterval(function () {
			var hasFocus = $('form#main_search').find('input').is(":focus");
			var inputWidth = $('form#main_search').find('input').width();
			if (inputWidth != 0 && !hasFocus) {
				$('form#main_search').find('input').animate({ width: '0' }, 300)
					.css('background', 'transparent').val('');
				$('form#main_search').find('button').css('background', 'transparent');
			}
		}, 8000);
	});



	$('table#tbl_categories').simpleCheckboxTable();
	$('table#tbl_articles').simpleCheckboxTable();

});

