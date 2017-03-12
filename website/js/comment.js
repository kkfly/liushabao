$(function(){

	function getUrlParam(name) {  
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
        var r = window.location.search.substr(1).match(reg);  
        if (r!=null) return unescape(r[2]); return null;  
    }

	function inflateComment(data) {
		var $main = $('#comment-main')
		var commentTpl = Handlebars.compile($('#comment-template').html())

		$main.html(
			commentTpl(
				data
			)
		)
	}

	var commentData = {
		'comments': [
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
	]}
	
	inflateComment(commentData)
})