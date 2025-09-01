(function(){
	"use strict";
	
	var searchTerm = 'hello';
	
	var storage = window.sessionStorage;
	
	function setSearchTerm(){
		var params = new URLSearchParams(window.location.search);
		
		if(params.get('page')){
			searchTerm = params.get('page');
		}
		
	}
	
	
	function getImageURLs(){
		if(storage.getItem('images_' + searchTerm)){
			processImageURLs(JSON.parse(storage.getItem('images_' + searchTerm)))
		}else{
			var getResult = $.ajax('https://api.pexels.com/v1/search?query=' + searchTerm, {
				'headers': {
					'Authorization': '563492ad6f91700001000001be3498bacbde4516a8a5e3ccda766ed0'
				}
			});
			
			
			getResult.then(processImageURLs);
		}
	}
	
	
	function processImageURLs(result){
		
		storage.setItem('images_' + searchTerm, JSON.stringify(result));
		
		var pictureContainer = $('.pictures');
		
		$.each(result.photos, function(i, photo){
			
			var indexVar = i + 1;
			
			pictureContainer.append('<div><img style="--index:' + indexVar + '" src="' + photo.src.medium + '"></div>');
		});
		
	}
	
	
	function getText(){
		
		if(storage.getItem('text_' + searchTerm)){
			processWikiResponse(JSON.parse(storage.getItem('text_' + searchTerm)));
		}else{
			$.ajax({
				url:'http://en.wikipedia.org/w/api.php?action=query&format=json&callback=processWikiResponse&list=search&srsearch=' + encodeURIComponent('%' + searchTerm + '%'),
				dataType: 'jsonp',
				jsonpCallback: 'processWikiResponse'
			});
		}
		
	}
	
	
	function processWikiResponse(response){
		
		storage.setItem('text_' + searchTerm, JSON.stringify(response));
		
		var wordContainer = $('.words');
		
		for (var result of response.query.search){
			wordContainer.append('<div>' + result.snippet + '</div>');
		}
		
	}
	
	// puts callback into global scope so jsonp will work
	window.processWikiResponse = processWikiResponse;
	
	$(function(){
		setSearchTerm();
		getImageURLs();
		getText();
	});
	
})()