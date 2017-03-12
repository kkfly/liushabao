$(function(){
	var $home = $('#home')
	var $rec = $('#rec')
	var $analysis = $('#analysis')
	var $username = $('#username')

	$home.click(function(event) {
		window.location.href = 'index.html'
	})

	$rec.click(function(event) {
		window.location.href = 'rec.html'
	})

	$analysis.click(function(event) {
		window.location.href = 'analysis.html'
	})

	$username.click(function(event) {
		window.location.href = 'user.html'
	})

	$('.nav li').mouseover(function(){
		$(this).addClass('over')
	})

	$('.nav li').mouseout(function(){
		$(this).removeClass('over')
	})
})