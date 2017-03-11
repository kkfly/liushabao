$(function(){
	var $bodyEl = $('body')

	var allis = ["Kindle", "Google", "is", "are"]

	function addMarker(el) {
		var elText = el.text()
		var words = elText.split(' ')
		var result = ''
		var update = false
		$.each(words, function(i, word) {
			if ($.inArray(word, allis) != -1) {
				word = '<span data-toggle=\"tooltip\" data-placement=\"right\" class=\"marker\" title=\"test\">' + word + '</span>'
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
		$.ajax({
			url: 'http://127.0.0.1:5000/getwiki',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify({keywords: $(this).text()}),
			contentType: 'application/json'
		})
		.done(function(response) {
			console.log(response);
		})

		$(this).tooltip('show')
	});

	$marker.mouseout(function(event) {
		$(this).tooltip('hide')
	})

	alert("load")
})

