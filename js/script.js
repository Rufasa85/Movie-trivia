var allMovies = ["Star Wars: Episode IV - A New Hope", "Gone With the Wind", "Citizen Kane",'Titanic', 'Avatar', "E.T. the Extra-Terrestrial"];
var possibleMovies = allMovies;
var thisMoviePlot = '';
//trying to randomly select a movie to search
var thisMovie = possibleMovies[Math.floor(Math.random() * 6)];
//removing selected film from possible answers
possibleMovies.splice(possibleMovies.indexOf(thisMovie), 1);
console.log(possibleMovies);

console.log(thisMovie);

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