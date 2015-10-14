var allMovies = ["Star Wars: Episode IV - A New Hope", "Gone With the Wind", "Citizen Kane",'Titanic', 'Avatar', "E.T. the Extra-Terrestrial", "The Lion King", "Jurassic Park", "Raiders of the Lost Ark", "Forrest Gump", "The Avengers", "Close Encounters of the Third Kind", "Grease", "Shrek", "Spider-Man", "Independence Day", 'Ghostbusters', "Beverly Hills Cop", "Home Alone", "Pirates of the Caribbean: The Curse of the Black Pearl", "Batman", "The Lord of the Rings: The Return of the King", "Finding Nemo", "The Sixth Sense", "Back to the Future", "Harry Potter and the Sorcerer's Stone", "Twister", "Superman", "Men in Black", "Transformers", "Mrs. Doubtfire", "Toy Story", "The Hunger Games", "Aladdin", "Iron Man", "Monsters Inc", "Frozen", "Ghost", "How the Grinch Stole Christmas", "The Terminator", "Top Gun", "The Matrix", "Saving Private Ryan", "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", "Despicable Me", "Crocodile Dundee", "Gremlins", "Beauty and the Beast", "Armageddon", "An Officer and a Gentleman", "Alice in Wonderland", "Kramer vs. Kramer", "Inside Out", "Cast Away", "The Incredibles", "Furious 7", "American Sniper", "Rain Man", "The Fugitive", "Dances with Wolves", "3 Men and a Baby", "The Godfather", "Casablanca", "The Big Lebowski", "The NeverEnding Story", "Caddyshack", "Homeward Bound: The Incredible Journey", "Labyrinth", "Pulp Fiction", "Love Actually", "Notting Hill", "Goodfellas", "My Neighbor Totoro", "Spirited Away", "Anchorman: The Legend of Ron Burgundy", "The Shawshank Redemption", "Pleasantville", "Major League", "Kill Bill: Vol. 1", "Good Will Hunting", "The Sandlot", "Super Mario Bros.", "The Land Before Time", "Free Willy", "Lost in Translation", "Princess Mononoke", "Ponyo", "Edward Scissorhands", "The Jerk", "The Goonies", "The Lost Boys", "Fight Club", "The Life Aquatic with Steve Zissou", "Raging Bull", "I Heart Huckabees", "Lawrence of Arabia", "This Is Spinal Tap", "Cool Runnings", "Alien", "Die Another Day", "There Will Be Blood", "The Royal Tenenbaums", "Jackie Brown", "Matilda", "Scream", "A Nightmare on Elm Street", "Mad Max", "Groundhog Day", "Django Unchained", "Stripes", "Guardians of the Galaxy", "The Silence of the Lambs", "Legally Blonde" ];
console.log(allMovies.length);
var currentRound = 1;
var possibleMovies = allMovies.slice(0,allMovies.length);
var thisMoviePlot = '';
var wrongAnswers = [];
var thisMovie = '';
var thisMoviePoster = '';
var player1score = 0;
var player2score = 0;
var currentGuesser = '';
var wrongGuesses = 0;
var winner = false;
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
			//hiding answers and showing poster after round!
			$('.answers').off('click').hide();
			$('#plot').html('Correct!');
			$('#poster').show();
			$('#nextRound').show();
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
						title:'Incorrect!',
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
				//hiding answers and showing poster after round!
				$('.answers').off('click').hide();
				$('#plot').html('Wrong!');
				$('#poster').show();
				$('#nextRound').show();
			}
		}
	});
}
//silly animations to flash winner
function firstColor () {
	$('#winningPlayer').animate({
		color: 'red'
	}, 200, secondColor);
};

function secondColor () {
	$('#winningPlayer').animate({
		color: '#EDDE5D'
	}, 200, firstColor);
};
//checking for winner, revealing winner and hiding everything else
function checkingWinner() {
	if (player1score === 5 || player2score === 5){
		//verifying winner to hide plot in last round
		winner = true;
		if (player1score === 5){
			$('#winningPlayer').html('Player 1 wins!');
		}
		else {
			$('#winningPlayer').html('Player 2 wins!');
		}
		//adding some flashing to winner
		firstColor();
		$('#nextRound').hide();
		$('#winner').show();
		$('.gameboard').hide();
		$('#plot').html('<img src = http://www.cliparthut.com/clip-arts/567/oscar-awards-clip-art-567814.png>');
		$('#oscar').show();
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
	wrongAnswers.forEach(addingWrongTitles);
};
//setting up each individual round
function generatingRound() {
	//resetting current guesser
	currentGuesser = '';
	console.log(currentRound);
	$('#round').html(currentRound);
	generatingCurrentRoundTitles();
	populatingCurrentTitlesToBoard();
	//retrieving movie plot from OMDB API
	$.ajax('http://www.omdbapi.com/?t=' + thisMovie , {
		method:'GET',
		success:function(data) {
			thisMoviePlot = data.Plot;
			//loading in poster to display after question is answered
			thisMoviePoster = data.Poster;
			console.log(thisMoviePlot);
			console.log(thisMoviePoster);
			$('#posterpic').attr('src', thisMoviePoster );
			//displaying current plot and answers on screen after AJAX request
			$('#plot').html(thisMoviePlot).show();
			$('.answers').show();
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
	$('#poster').hide();
	$('#oscar').hide();
	//checking for errors in poster image
	$('#posterpic').error(function(){
		console.log('error occured! womp womp');
		$('#posterpic').attr('src', 'images/broken_poster.png');
	});
	//showing gameboard when start button is clicked
	$('#start-btn').click(function(){
		$('.gameboard').show();
		$('.scores').show();
		$('.splash').hide();
		generatingRound(currentRound);
	})
	//resetting board for next question
	$('#nextRound').click(function(){
		checkingWinner();
		wrongGuesses = 0;
		$('.answers').removeClass('btn-danger').removeClass('btn-success').html('').removeAttr('id');
		//skipping AJAX request if game is over
		if (winner == false) {
			generatingRound(currentRound);
		}
		$('#poster').hide();
		$('#nextRound').hide();
		$('#plot').hide();
	})
	//resetting game when reset button is clicked
	$('#newGame').click(function(){
		$('#poster').hide();
		$('#nextRound').hide();
		$('#winner').hide();
		$('.gameboard').hide();
		$('.scores').hide();
		$('.splash').show();
		$('#oscar').hide();
		winner = false;
		currentRound = 1;
		player1score = 0;
		player2score = 0;
		wrongGuesses = 0;
		possibleMovies = allMovies.slice(0,allMovies.length);
		$('#p2Score').html(player2score);
		$('#p1Score').html(player1score);
		$('.answers').removeClass('btn-danger').removeClass('btn-success').html('').removeAttr('id').show();
	});
});