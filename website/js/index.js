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
		})

		console.log(data)

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

	var data = {
		"news": [
			{
				"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
				"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance"
			},
			{
				"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
				"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance"
			},
			{
				"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
				"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance"
			},
			{
				"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
				"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance"
			},
			{
				"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
				"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance"
			},
			{
				"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
				"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance"
			}
		]
	}

	inflateNews(data)

	console.log($('body').text())
});