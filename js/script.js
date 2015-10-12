var allMovies = ["Star Wars: Episode IV - A New Hope", "Gone With the Wind", "Citizen Kane",'Titanic', 'Avatar', "E.T. the Extra-Terrestrial", "The Lion King", "Jurassic Park", "Raiders of the Lost Ark", "Forrest Gump", "The Avengers", "Close Encounters of the Third Kind", "Grease", "Shrek", "Spider-Man", "Independence Day", 'Ghostbusters', "Beverly Hills Cop", "Home Alone", "Pirates of the Caribbean: The Curse of the Black Pearl", "Batman", "The Lord of the Rings: The Return of the King", "Finding Nemo", "The Sixth Sense", "Back to the Future", "Harry Potter and the Sorcerer's Stone", "Twister", "Superman", "Men in Black", "Transformers", "Mrs. Doubtfire", "Toy Story", "The Hunger Games", "Aladdin", "Iron Man", "Monsters Inc", "Frozen", "Ghost", "How the Grinch Stole Christmas", "The Terminator", "Top Gun", "The Matrix", "Saving Private Ryan", "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", "Despicable Me" ];
var currentRound = 1;
var possibleMovies = allMovies;
var thisMoviePlot = '';
var wrongAnswers = [];
var thisMovie = '';
var player1score = 0;
var player2score = 0;
var currentGuesser = '';
// //populating the rest of the buttons with the wrong answers
function addingWrongTitles(title) {
	var thisButton = $($(".answers")[Math.floor(Math.random()*4)]);
	if (thisButton.html() === '') {
		thisButton.html(title);
		thisButton.click(function() {
			thisButton.addClass('btn-danger');
			$('.answers').off('click');
			$('#nextRound').show();
		});
	}
	else {
		addingWrongTitles(title);
	}
};
//turning movie selection into a function
function generatingCurrentRoundTitles() {
	wrongAnswers = [];
	//trying to randomly select a movie to search
	thisMovie = possibleMovies[Math.floor(Math.random() * possibleMovies.length)];
	//removing selected film from possible answers
	possibleMovies.splice(possibleMovies.indexOf(thisMovie), 1);
	//generating other possible titles
	for (var i = 0; i<3; i++) {
		var thisWrongMovie = possibleMovies[Math.floor(Math.random() * possibleMovies.length)];
		possibleMovies.splice(possibleMovies.indexOf(thisWrongMovie), 1);
		wrongAnswers.push(thisWrongMovie);
	}
};
//placing titles in random spots on the board
function populatingCurrentTitlesToBoard () {
	//adding correct title to random spot on the screen
	$($(".answers")[Math.floor(Math.random()*4)]).html(thisMovie).attr('id','right');
		//making the term searchable in the API
	thisMovie = thisMovie.split(' ').join('+');
	console.log(thisMovie);
	//changing clolor of button on click
	$('#right').click(function() {
		$(this).addClass('btn-success');
		$('.answers').off('click');
		$('#nextRound').show();
		//checking who is guessing, updating correct score
		if (currentGuesser == 'Player 1'){
			player1score ++;
			console.log(player1score);
			$('#p1Score').html(player1score);
		}
		else if (currentGuesser == 'Player 2'){
			player2score ++;
			console.log(player2score);
			$('#p2Score').html(player2score);
		}
		//checking if game if over, revealing winner and hiding everything else
		if (currentRound === 11) {
			console.log('game over!');
			$('#nextRound').hide();
			$('#winner').show();
			$('.gameboard').hide();
			$('#plot').hide();
		} 
	});
	wrongAnswers.forEach(addingWrongTitles);
};
//setting up each individual round
function generatingRound() {
	console.log(currentRound);
	$('#round').html(currentRound);
	generatingCurrentRoundTitles();
	populatingCurrentTitlesToBoard();
	//retrieving movie plot from OMDB API
	$.ajax('http://www.omdbapi.com/?t=' + thisMovie , {
		method:'GET',
		success:function(data) {
			thisMoviePlot = data.Plot;
			console.log(thisMoviePlot);
			//displaying current plot on screen
			$('#plot').html(thisMoviePlot);
		},
	});
	//iterating round number
	currentRound++;
	buzzingIn();
};
//testing keypress for each player!
function buzzingIn() {
	$(document).keydown(function( event ) {
		if ( event.which == 81 ) {
			//disabling keydown after buzz in
			$(this).off('keydown');
			swal({
				title:'player 1',
				text:'make your guess!',
				type:'warning',
			});
			//defining who buzzed in
			currentGuesser = 'Player 1';
		}
		else if(event.which == 77) {
			$(this).off('keydown');
			swal({
				title:'player 2',
				text:'make your guess!',
				type:'warning',
			});
			//defining who buzzed in
			currentGuesser = 'Player 2';
		}
	});
}

$(document).ready(function () {
	//initializing view
	$('#nextRound').hide();
	$('#winner').hide();
	generatingRound(currentRound);
	//resetting board for next question
	$('#nextRound').click(function(){
		$('.answers').removeClass('btn-danger').removeClass('btn-success').html('').removeAttr('id');
		generatingRound(currentRound);
		$('#nextRound').hide();
	})
});