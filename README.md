# Movie Trivia!!
### Basic Info
A simultaneous two-player movie trivia game wherein the users are promted with the plot of a film and, after buzzing in using keypresses, guess from a randomly populated list of titles.  If the correct answer is selected, the poster for that movie is displayed, and the next round is available.  

###Technologies Used
* HTML5
* CSS3
* BootStrap 3
* JavaScript
* jQuery
* jQuery UI
* SweetAlert
* Plots and posters generated using the [OMDB API](http://www.omdbapi.com/)

###Known Issues
* If too many requests are made in too short a time, the API forbids accessing the poster images.  I have installed a placeholder image, but I would prefer to have the posters pop in

###Wishlist
* Difficulty selector, wherein each difficulty level presents a different piece of info about the film. Hard mode would give you director and year, for example
* Add in a countdown timer, limiting the amout of time a user has to answer after buzzing in.  
* Slowly reveal the plot instead of popping it in all at once, to increase difficulty.
* Create different styles of questions, such as populating a list of titles and having the user sort them by year, prompting a director and selecting the movie he did not direct, linking actor and character names, etc.  I couldnt figure out a way to do this without manually writing the code for each individual type of question, and wanted to spend my time figuring out AJAX and error handling.  

###References
Movie title info culled from [IMDB Top 250](http://www.imdb.com/chart/top), [Rotten Tomatoes](http://www.rottentomatoes.com/top/bestofrt/), and my own brain.

[Bootstrap documentation](http://getbootstrap.com/css/), [jQuery documentation](http://api.jquery.com/), and [MDN](https://developer.mozilla.org/en-US/) all provided invaluable help with this project.   