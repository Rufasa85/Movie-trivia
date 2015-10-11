//turning movie selection into a function
function generatingCurrentRoundTitles() {
	//trying to randomly select a movie to search
	var thisMovie = possibleMovies[Math.floor(Math.random() * possibleMovies.length)];
	//removing selected film from possible answers
	possibleMovies.splice(possibleMovies.indexOf(thisMovie), 1);
	//generating other possible titles
	for (var i = 0; i<3; i++) {
		var thisWrongMovie = possibleMovies[Math.floor(Math.random() * possibleMovies.length)];
		possibleMovies.splice(possibleMovies.indexOf(thisWrongMovie), 1);
		wrongAnswers.push(thisWrongMovie);
	}
};

function populatingCurrentTitlesToBoard () {
	//adding correct title to random spot on the screen
	$($(".answers")[Math.floor(Math.random()*4)]).html(thisMovie).attr('id','right');
	//changing clolor of button on click
	$('#right').click(function() {
		$(this).addClass('btn-success');
		$('.answers').off('click');
		$('#nextRound').show();
	});
	wrongAnswers.forEach(addingWrongTitles);
};

function generatingRound(round) {
	
}
