var thisMovie;
var possibleMovies = ["Star Wars: Episode IV - A New Hope", "Gone With the Wind", "citizen kane"];

//trying to randomly select a movie to search
var thisMovie = possibleMovies[Math.floor(Math.random() * 3)];
console.log(thisMovie);

$(document).ready(function () {
	console.log('linked!');

	//fetching plot info for current question
	// $.ajax('http://www.omdbapi.com/?t=gone+with+the+wind', {
	// 	method:'GET',
	// 	success:function(data) {
	// 		thisMovie = data.Plot;
	// 		console.log(thisMovie);
	// 	},
	// });
	// console.log(thisMovie);
});