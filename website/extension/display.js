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
})

