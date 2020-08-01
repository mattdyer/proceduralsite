(function(){
	"use strict";
	
	var searchTerm = 'hello';
	
	function setSearchTerm(){
		var params = new URLSearchParams(window.location.search);
		
		if(params.get('page')){
			searchTerm = params.get('page');
		}
		
	}
	
	
	function getImageURLs(){
		var getResult = $.ajax('https://api.pexels.com/v1/search?query=' + searchTerm, {
			'headers': {
				'Authorization': '563492ad6f91700001000001be3498bacbde4516a8a5e3ccda766ed0'
			}
		});
		
		
		getResult.then(function(result){
			console.log(result);
		});
		
	}
	
	
	function getText(){
		
		$.ajax({
			url:'http://en.wikipedia.org/w/api.php?action=query&format=json&callback=processWikiResponse&list=search&srsearch=%' + searchTerm + '%',
			dataType: 'jsonp',
			jsonpCallback: 'processWikiResponse'
		});
		
	}
	
	
	function processWikiResponse(response){
		var wordContainer = $('.words');
		
		for (var result of response.query.search){
			wordContainer.append('<div>' + result.snippet + '</div>');
		}
		
	}
	
	// puts callback into global scope so jsonp will work
	window.processWikiResponse = processWikiResponse;
	
	setSearchTerm();
	//getImageURLs();
	//getText();
	
})()