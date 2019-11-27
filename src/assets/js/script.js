$(window).on('load', function () {
	$('div.menu_bar').click();
	$('nav').find('input.checkbox').attr('checked', 'true');
});



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




	// AdminPanel //
	$('div.menu_bar').click(function (event) {
		if ($(this).find('label.menu').attr('checked') != 'checked') {
			$(this).find('label.menu').attr('checked', 'true');
			$('nav.navigation').animate({ right: '0' }, 'fast');
			$('ul.menu').removeClass('hidden').animate({ width: '100%' }, 'fast');
			$('section.panel_content').css({
				'margin-right': '22%',
				'width': '76%'
			});
		} else {
			$(this).find('label.menu').removeAttr('checked');
			$('nav.navigation').animate({ right: '-20%' }, 'fast');
			$('ul.submenu').addClass('hidden').css('height', '0');
			$('section.panel_content').css({
				'margin-right': '0',
				'width': '100%'
			});
		}
	});

	$('.item-submenu#mt1 a').click(function (event) {
		$('ul.menu').addClass('hidden').css('width', '0');;
		$('ul.submenu#sm1').removeClass('hidden').animate({ height: '100%' }, 400);
		$('li.submenu-header').find('h5').text($(this).text());
	});
	$('.submenu-header a').click(function (event) {
		$('ul.menu').removeClass('hidden').animate({ width: '100%' }, 400);
		$('ul.submenu#sm1').addClass('hidden').css('height', '0');;
	});

	$('.item-submenu#mt2 a').click(function (event) {
		$('ul.menu').addClass('hidden').css('width', '0');;
		$('ul.submenu#sm2').removeClass('hidden').animate({ height: '100%' }, 400);
		$('li.submenu-header').find('h5').text($(this).text());
	});
	$('.submenu-header a').click(function (event) {
		$('ul.menu').removeClass('hidden').animate({ width: '100%' }, 400);
		$('ul.submenu#sm2').addClass('hidden').css('height', '0');;
	});


	var len = $('.articleDesc').text().length;
	if (len > 100) {
		var ptext = $('.articleDesc').text();
		var new_text = ptext.substring(0, 100);
		new_text = new_text + '...';
		$('.articleDesc').text(new_text);
	}

	$('table#tbl_categories').simpleCheckboxTable();
	$('table#tbl_articles').simpleCheckboxTable();


	// AdminPanel //


});

