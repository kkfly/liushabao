$(function(){
	function getUrlParam(name) {  
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
        var r = window.location.search.substr(1).match(reg);  
        if (r!=null) return unescape(r[2]); return null;  
    }

    var news_id = getUrlParam('id')
    $.ajax({
    	url: '/getnews',
    	type: 'POST',
    	dataType: 'json',
    	data: JSON.stringify({id: news_id}),
    	contentType: 'application/json'
    })
    .done(function(response) {
    	var $news = $('#news-template')
    	var newsTpl = Handlebars.compile($('#news-template').html())

    	$news.html(
    		newsTpl(response)
    	)
    })
    
})