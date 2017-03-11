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
				word = '<span class=\"marker\">' + word + '</span>'
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

	alert("load")
})

