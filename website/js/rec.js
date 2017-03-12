$(function() {
	function inflateNews(data) {
		var $newsDiv = $('#news')
		var newsTpl = Handlebars.compile($('#news-icon-template').html())

		$.each(data.news, function(i, item){
			if (i % 3 == 0) {
				item['position'] = 'first'
			} else if (i % 3 == 1) {
				item['position'] = 'second'
			} else {
				item['position'] = 'third'
			}
			if (item['url'] != undefined && item['url'].length > 0) {
				item['type'] = 'url'
			} else {
				item['type'] = 'text'
			}
			var pos = Math.floor(Math.random() * imageurls.length)
			item['image_url'] = imageurls[pos]
		})

		$newsDiv.html(
			newsTpl(
				data
			)
		)

		$('.news-icon').mouseover(function(item){
			$(this).removeClass('gray')
		})

		$('.news-icon').mouseout(function(){
			$(this).addClass('gray')
		})
	}

		console.log(recData)
		inflateNews(recData)

		$('.news-icon-wrapper').click(function(event) {
			if ($(this).attr('type') == 'url') {
				window.open($(this).attr('url'), "_blank")
			} else {
				window.open('news.html?id=' + $(this).attr('id'), "_blank")
			}
		})
	// })
});