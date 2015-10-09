var thisMovie;

$(document).ready(function () {
	console.log('linked!');

	//fetching plot info for current question
	$.ajax('http://www.omdbapi.com/?t=gone+with+the+wind', {
		method:'GET',
		success:function(data) {
			thisMovie = data.Plot;
			console.log(thisMovie);
		},
	});
	console.log(thisMovie);
});