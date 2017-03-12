$(function(){
	var $bodyEl = $('body')

	function addMarker(el) {
		var elText = el.text()
		var words = elText.split(' ')
		var result = ''
		var update = false
		// for(var i = 0; i < words.length; i++) {
		// 	var lw = words[i].toLowerCase()
		// 	var w = wikiData[lw]
		// 	if (w != undefined) {
		// 		// var att = ' url=\"' + w.url + '\" title=\"' + w.summary + '\"'
		// 		words[i] = '<span data-toggle=\"tooltip\" data-placement=\"right\" class=\"marker\" data=\"' + lw + '\">' + words[i] + '</span>'
		// 		update = true
		// 		console.log(w)
		// 	} else {
		// 		if (i + 1 < words.length) {
		// 			lw = lw + ' ' + words[i + 1].toLowerCase()
		// 			w = wikiData[lw]
		// 			if (w != undefined) {
		// 				words[i] = '<span data-toggle=\"tooltip\" data-placement=\"right\" class=\"marker\" data=\"' + lw + '\">' + words[i] + ' ' +  words[i + 1] + '</span>'
		// 				update = true
		// 				i++
		// 			} 
		// 		}
		// 	}
		// 	result += words[i] + ' '
		// }
		$.each(words, function(i, word) {
			var lw = word.toLowerCase()
			var w = wikiData[lw]
			if (w != undefined) {
				// var att = ' url=\"' + w.url + '\" title=\"' + w.summary + '\"'
				word = '<span data-toggle=\"tooltip\" data-placement=\"right\" class=\"marker\" data=\"' + lw + '\">' + word + '</span>'
				update = true
			}
			result += word + ' '
		})
		if (update) console.log(result)
		el.html(result)
		$.each(el.children('span'), function(){
			var w = wikiData[$(this).attr('data')]
			$(this).attr({
				'url': w.url,
				'data-original-title': w.summary,
			});
		})
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

	$('[data-toggle="tooltip"]').tooltip()

	var $marker = $('.marker')

	// $marker.mouseover(function(event) {
	// 	$(this).addClass('marker-active')
	// 	var el = $(this)
	// 	$.ajax({
	// 		url: 'http://127.0.0.1:5000/getwiki',
	// 		type: 'POST',
	// 		dataType: 'json',
	// 		data: JSON.stringify({keywords: $(this).text()}),
	// 		contentType: 'application/json'
	// 	})
	// 	.done(function(response) {
	// 		console.log(response);
	// 		if (response.success) {
	// 			el.attr({
	// 				'data-original-title': response.result,
	// 				'url': response.url
	// 			});
	// 			el.tooltip('show')
	// 		}
	// 	})
	// });

	// $marker.mouseout(function(event) {
	// 	$(this).tooltip('hide')
	// 	$(this).removeClass('marker-active')
	// })

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
				var c = createCommentTpl(data[i].by, data[i].text)
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

    function renderComment(commentData) {
		var $commentDiv = $('<div/>')
		$commentDiv.addClass('comment-wrapper')
		$commentDiv.appendTo($('body'))
		var $upperDiv = $('<div/>')
		var $belowDiv = $('<div/>')
		var $header = createCommentHeader()
		$header.appendTo($belowDiv)
		$upperDiv.appendTo($commentDiv)
		$belowDiv.appendTo($commentDiv)
		$('#viewAllComment').click(function(event) {
			window.open('/comment.html')
		});
		inflateComment($upperDiv, commentData, 0)
    }


	renderComment(commentData.comments)
		// if (url.contains('/news.html?id=')) {
		// 	var news_id = getUrlParam('id')
		// 	$.ajax({
		// 		url: '/getcommentsbyid',
		// 		type: 'POST',
		// 		dataType: 'json',
		// 		data: JSON.stringify({id: news_id}),
		// 		contentType: 'application/json'
		// 	})
		// 	.done(function(response) {
		// 		if (response.success) renderComment(news_id, response.comments)
		// 	})
		// } else {
		// 	$.ajax({
		// 		url: '/getcommentsbyurl',
		// 		type: 'POST',
		// 		dataType: 'json',
		// 		data: JSON.stringify({'url': url}),
		// 		contentType: 'application/json'
		// 	})
		// 	.done(function(response) {
		// 		if (response.success) renderComment(response.id, response.comments)
		// 	})
		// }
})

