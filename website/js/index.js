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
			console.log(pos)
			item['image_url'] = imageurls[pos]
			console.log(item)
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

	// $.ajax({
	// 	url: 'http://100.112.36.99:5000/',
	// 	contentType: 'application/json',
	// })
	// .done(function(response) {
		// var data = {
		// "news": [
		// 	{
		// 		"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
		// 		"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance",
		// 		"type" : "url",
		// 		"url": "http://www.baidu.com"
		// 	},
		// 	{
		// 		"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
		// 		"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance",
		// 		"type" : "text",
		// 		"id" : "100000"
		// 	},
		// 	{
		// 		"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
		// 		"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance"
		// 	},
		// 	{
		// 		"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
		// 		"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance"
		// 	},
		// 	{
		// 		"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
		// 		"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance"
		// 	},
		// 	{
		// 		"imageURL": "http://images1.ocweekly.com/imager/u/745xauto/7950031/news.jpg",
		// 		"title": "FBI Used Best Buy's Geek Squad To Increase Secret Public Surveillance"
		// 	}
		// ]
	// }

		// console.log(response)
		inflateNews(homenews)

		$('.news-icon-wrapper').click(function(event) {
			if ($(this).attr('type') == 'url') {
				window.open($(this).attr('url'), "_blank")
			} else {
				window.open('news.html?id=' + $(this).attr('id'), "_blank")
			}
		})
	// })
});