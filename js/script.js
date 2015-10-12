var allMovies = ["Star Wars: Episode IV - A New Hope", "Gone With the Wind", "Citizen Kane",'Titanic', 'Avatar', "E.T. the Extra-Terrestrial", "The Lion King", "Jurassic Park", "Raiders of the Lost Ark", "Forrest Gump", "The Avengers", "Close Encounters of the Third Kind", "Grease", "Shrek", "Spider-Man", "Independence Day", 'Ghostbusters', "Beverly Hills Cop", "Home Alone", "Pirates of the Caribbean: The Curse of the Black Pearl", "Batman", "The Lord of the Rings: The Return of the King", "Finding Nemo", "The Sixth Sense", "Back to the Future", "Harry Potter and the Sorcerer's Stone", "Twister", "Superman", "Men in Black", "Transformers", "Mrs. Doubtfire", "Toy Story", "The Hunger Games", "Aladdin", "Iron Man", "Monsters Inc", "Frozen", "Ghost", "How the Grinch Stole Christmas", "The Terminator", "Top Gun", "The Matrix", "Saving Private Ryan", "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", "Despicable Me" ];
var currentRound = 1;
var possibleMovies = allMovies;
var thisMoviePlot = '';
var wrongAnswers = [];
var thisMovie = '';
var player1score = 0;
var player2score = 0;
var currentGuesser = '';
var wrongGuesses = 0;
// //populating the rest of the buttons with the wrong answers
function addingWrongTitles(title) {
	var thisButton = $($(".answers")[Math.floor(Math.random()*4)]);
	if (thisButton.html() === '') {
		thisButton.html(title);
	}
	else {
		addingWrongTitles(title);
	}
};
//turning title clicks into a function i can call inside of buzzingIn
function allowingClicksOnTitles () {
	$('.answers').click(function(){
		if($(this).attr('id') === 'right') {
			$(this).addClass('btn-success');
			//changing button styling so they appear unselectable
			$('.answers').css('opacity','0.5');
			//checking who is guessing, updating correct score
			if (currentGuesser === 'Player 1'){
				player1score ++;
				console.log(player1score);
				$('#p1Score').html(player1score);
			}
			else if (currentGuesser === 'Player 2'){
				player2score ++;
				console.log(player2score);
				$('#p2Score').html(player2score);
			}
			$('.answers').off('click');
			$('#nextRound').show();
			wrongGuesses = 0;
		}
		else {
			$(this).addClass('btn-danger');
			//removing click event from this title, so it cannot be clicked twice
			$(this).off('click');
			//allowing other player to guess if first guess is wrong
			wrongGuesses++;
			if (wrongGuesses <= 1) {
				if ( currentGuesser === 'Player 1') {
					swal({
						title:'Icorrect!',
						text:' Player 2, your turn!!',
						type:'error',
					});
					currentGuesser = 'Player 2';
				}
				else if (currentGuesser === 'Player 2') {
					swal({
						title:'Incorrect!',
						text:'Player 1, your turn!',
						type:'error',
					});
					currentGuesser = 'Player 1'
				} 
			}
			else {
				wrongGuesses = 0;
				//changing button styling so they appear unselectable
				$('.answers').css('opacity','0.5');
				$('.answers').off('click');
				$('#nextRound').show();
			}
		}
		//checking for winner, revealing winner and hiding everything else
		if (player1score === 5 || player2score === 5){
			if (player1score === 5){
				$('#winningPlayer').html('Player 1 wins!')
			}
			else {
				$('#winningPlayer').html('Player 2 wins!');
			}
			$('#nextRound').hide();
			$('#winner').show();
			$('.gameboard').hide();
			$('#plot').hide();
		} 
	});
}
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
	//resetting button opacity
	$('.answers').css('opacity','1');
	//adding correct title to random spot on the screen
	$($(".answers")[Math.floor(Math.random()*4)]).html(thisMovie).attr('id','right');
		//making the term searchable in the API
	thisMovie = thisMovie.split(' ').join('+');
	console.log(thisMovie);
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
		//setting other click listeners to only happen after buzzing
		allowingClicksOnTitles();
	});
}

$(document).ready(function () {
	//initializing view
	$('#nextRound').hide();
	$('#winner').hide();
	$('.gameboard').hide();
	$('.scores').hide();
	generatingRound(currentRound);
	//showing gameboard when start button is clicked
	$('#start-btn').click(function(){
		$('.gameboard').show();
		$('.scores').show();
		$('.splash').hide();
		$('#plot').show();
	})
	//resetting board for next question
	$('#nextRound').click(function(){
		$('.answers').removeClass('btn-danger').removeClass('btn-success').html('').removeAttr('id');
		generatingRound(currentRound);
		$('#nextRound').hide();
	})
	//resetting game when reset button is clicked
	$('#newGame').click(function(){
		$('#nextRound').hide();
		$('#winner').hide();
		$('.gameboard').hide();
		$('.scores').hide();
		$('.splash').show();
		currentRound = 1;
		player1score = 0;
		player2score = 0;
		possibleMovies = allMovies;
		$('#p2Score').html(player2score);
		$('#p1Score').html(player1score);
		$('.answers').removeClass('btn-danger').removeClass('btn-success').html('').removeAttr('id');
		generatingRound(currentRound);
	});
});