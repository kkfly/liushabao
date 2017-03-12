$(function() {

	$('[data-toggle="tooltip"]').tooltip()

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

	function createCommentTpl(name, comment) {
		var $wrapper = $('<div/>')
		$wrapper.addClass('comment-box alert alert-success alert-dismissible fade in')
		$wrapper.attr({
			role: 'alert'
		});
		// var $but = $('<button/>')
		// $but.addClass('close')
		// $but.attr({
		// 	type: "button",
		// 	'data-dismiss': 'alert',
		// 	'aria-label': 'Close',
		// });
		// var $sp = $('<span/>')
		// $sp.attr({
		// 	'aria-hidden': 'true',
		// });
		// $sp.html('&times;')
		// $sp.appendTo($but)
		// $but.appendTo($wrapper)
		var $name = $('<span/>')
		$name.addClass('comment-user')
		$name.text(name)
		var $content = $('<span/>')
		$content.addClass('comment')
		$content.text(comment)
		$name.appendTo($wrapper)
		$content.appendTo($wrapper)
		return $wrapper
	}

	function inflateComment(el, data, i, p, pp, ppp) {
		setTimeout(function(){
			console.log(i)
			console.log(ppp)
			if (i > 2) {
				console.log(ppp)
				ppp.alert('close')
			}
			if (i < data.length) {
				var c = createCommentTpl(data[i].username, data[i].comment)
				c.appendTo(el)
				if (pp != undefined) {
					pp.removeClass('half-opt')
					pp.addClass('near-opt')
				}
				if (p != undefined) {
					p.addClass('half-opt')
				}
				i = i + 1
				inflateComment(el, data, i, c, p, pp)
			} else if (i == data.length) {
				inflateComment(el, data, i + 1, undefined, p, pp)
			} else if (i == data.length + 1) {
				inflateComment(el, data, i + 1, undefined, undefined, pp)
			}
		}, 2000)
		// $.each(data, function(i, item){
			
		// 	// $.delay(10, 'comment')
		// 	setTimeout(function(){
		// 		c.appendTo(el)
		// 	}, 1000)
		// })
	}

	var commentData = [
		{
			'username': 'Ran Wang',
			'comment': 'I\'m very tired. I\'m very tired. I\'m very tired. I\'m very tired. I\'m very tired. I\'m very tired.'
		},
		{
			'username': 'Ran Wang',
			'comment': 'lalalalalalalalalalal alalalalalalalala lalalalalalalal alalalalalalalalalal alalalalalalal alalalalal lalalalalalalalala lalalalalalalalalalal alalalalalalalalalalalalal alalalalalalalalalalala lalalalalalalalalalal alalalalalalalala'
		},
		{
			'username': 'Ran Wang',
			'comment': 'outerWidth()'
		},
		{
			'username': 'Ran Wang',
			'comment': 'I\'m very tired!!!'
		},
		{
			'username': 'Ran Wang',
			'comment': 'I\'m very tired!!!'
		}
	]

	$(function(){
		var $commentDiv = $('<div/>')
		$commentDiv.addClass('comment-wrapper')
		$commentDiv.appendTo($('body'))
		inflateComment($commentDiv, commentData, 0)
	})
});