var allMovies = ["Star Wars: Episode IV - A New Hope", "Gone With the Wind", "Citizen Kane",'Titanic', 'Avatar', "E.T. the Extra-Terrestrial"];
var possibleMovies = allMovies;
var thisMoviePlot = '';
var wrongAnswers = [];
//trying to randomly select a movie to search
var thisMovie = possibleMovies[Math.floor(Math.random() * possibleMovies.length)];
//removing selected film from possible answers
possibleMovies.splice(possibleMovies.indexOf(thisMovie), 1);
console.log(possibleMovies);
//generating other possible titles
for (var i = 0; i<3; i++) {
	var thisWrongMovie = possibleMovies[Math.floor(Math.random() * possibleMovies.length)];
	possibleMovies.splice(possibleMovies.indexOf(thisWrongMovie), 1);
	wrongAnswers.push(thisWrongMovie);
	console.log(thisWrongMovie);
	console.log(possibleMovies);
}
//adding titles to random spot on the screen
$($(".answers")[Math.floor(Math.random()*4)]).html(thisMovie);
//populating the rest of the buttons with the wrong answers


$(document).ready(function () {
	console.log('linked!');
	//making the term searchable in the API
	thisMovie = thisMovie.split(' ').join('+');
	console.log(thisMovie);
//fetching plot info for current answer
	$.ajax('http://www.omdbapi.com/?t=' + thisMovie , {
		method:'GET',
		success:function(data) {
			thisMoviePlot = data.Plot;
			console.log(thisMoviePlot);
		},
	});
	console.log(thisMovie);
});