$(function(){
	var $bodyEl = $('body')

	var allis = ["Kindle", "Google", "is", "are", 'example', 'applications', 'Python', 'download', 'summer']

	function addMarker(el) {
		var elText = el.text()
		var words = elText.split(' ')
		var result = ''
		var update = false
		$.each(words, function(i, word) {
			if ($.inArray(word, allis) != -1) {
				word = '<span data-toggle=\"tooltip\" data-placement=\"right\" class=\"marker\">' + word + '</span>'
				console.log("here")
				update = true
			}
			result += word + ' '
		})
		if (update) console.log(result)
		el.html(result)
	}

	function visit(el) {
		if (el.text() == el.html()) {
			addMarker(el)
		} else {
			$.each(el.children(), function() {
				visit($(this))
			})
		}
	}

	$.each($bodyEl.children(), function() {
		visit($(this))
	})

	var $marker = $('.marker')

	$marker.mouseover(function(event) {
		$(this).addClass('marker-active')
		var el = $(this)
		$.ajax({
			url: 'http://127.0.0.1:5000/getwiki',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify({keywords: $(this).text()}),
			contentType: 'application/json'
		})
		.done(function(response) {
			console.log(response);
			if (response.success) {
				el.attr({
					'data-original-title': response.result,
					'url': response.url
				});
				el.tooltip('show')
			}
		})
	});

	$marker.mouseout(function(event) {
		$(this).tooltip('hide')
		$(this).removeClass('marker-active')
	})

	$marker.click(function(event) {
		var url = $(this).attr('url')
		if (url != undefined) {
			window.open(url, "_blank");
		}
	});

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
		var $name = $('<strong/>')
		$name.addClass('comment-user')
		$name.text(name)
		var $content = $('<span/>')
		$content.addClass('comment')
		$content.text(comment)
		$name.appendTo($wrapper)
		$content.appendTo($wrapper)
		return $wrapper
	}

	function createCommentHeader() {
		var $wrapper = $('<div/>')
		$wrapper.addClass('comment-box alert alert-warning alert-dismissible fade in')
		$wrapper.attr({
			role: 'alert'
		});
		var $but = $('<button/>')
		$but.addClass('close')
		$but.attr({
			type: "button",
			'data-dismiss': 'alert',
			'aria-label': 'Close',
		});
		var $sp = $('<span/>')
		$sp.attr({
			'aria-hidden': 'true',
		});
		$sp.addClass('close-but')
		$sp.html('&times;')
		$sp.appendTo($but)
		$but.appendTo($wrapper)
		var $jumpButton = $('<button/>')
		$jumpButton.addClass('btn')
		$jumpButton.attr({
			type: 'button',
			id: 'viewAllComment'
		});
		$jumpButton.text('View all comments')
		$jumpButton.appendTo($wrapper)
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
		var $upperDiv = $('<div/>')
		var $belowDiv = $('<div/>')
		var $header = createCommentHeader()
		$header.appendTo($belowDiv)
		$upperDiv.appendTo($commentDiv)
		$belowDiv.appendTo($commentDiv)
		inflateComment($upperDiv, commentData, 0)
	})
})

