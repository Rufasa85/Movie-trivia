var allMovies = ["Star Wars: Episode IV - A New Hope", "Gone With the Wind", "Citizen Kane",'Titanic', 'Avatar', "E.T. the Extra-Terrestrial", "Star Wars: Episode VI - Return of the Jedi", "Star Wars: Episode I - The Phantom Menace", "The Lion King", "Jurassic Park", "Jurassic World", "Raiders of the Lost Ark", "Forrest Gump", "The Avengers", "Close Encounters of the Third Kind","The Dark Knight"];
var possibleMovies = allMovies;
var currentRound = 1;
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
//adding correct title to random spot on the screen
$($(".answers")[Math.floor(Math.random()*4)]).html(thisMovie).attr('id','right');
//changing clolor of button on click
$('#right').click(function() {
	$(this).addClass('btn-success');
	$('.answers').off('click');
});
//populating the rest of the buttons with the wrong answers
function addingWrongTitles(title) {
	var thisButton = $($(".answers")[Math.floor(Math.random()*4)]);
	if (thisButton.html() === '') {
		thisButton.html(title);
		thisButton.click(function() {
			thisButton.addClass('btn-danger');
		});
	}
	else {
		addingWrongTitles(title);
	}
};

wrongAnswers.forEach(addingWrongTitles);


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
			$('#plot').html(thisMoviePlot);
		},
	});
	console.log(thisMovie);
});