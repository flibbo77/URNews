
SpanishTour.WordsManagement = (function() {
	var that = {},
	wordCategories = [],
	sentences = [],
	numLevel = 3,
	allCategories = [],
	allWords = [],
	wordsGame = [],
	selectedCateg = [],
	selectedWords = [],
	actLevel = 1,
	numWordsPerLevel = [10,10,15],
	

	
	init = function() {
		allCategories.push(["food", "family", "greeting", "clothes"]);
		allCategories.push(["hobby", "city", "transport", "travel"]);
		allCategories.push(["profession", "body", "feeling", "adjectives"]);
		
		getWords();
		
     	return that;
	},

	getWords = function(){
		$.getJSON( "src/Data/spanishWords.json", function( data ) {
			allWords = data;

			for(var i = 0; i<numLevel; i++){
				selectedCateg[i] = _.sample(allCategories[i], 1)[0];
				var temp = _.where(allWords, {"level": i+1, "cat": selectedCateg[i]});
				selectedWords[i] = _.sample(temp, numWordsPerLevel[i]);
			}
		});
	},

	getWordsLevel = function(level){
		actLevel = level;
		wordsGame = selectedWords[level-1];
		return wordsGame;
	},

	getWordsGame = function(){
		switch(actLevel){
			case 1: 
				return _.sample(selectedWords[actLevel-1], 8);
			case 2:
				return _.sample(selectedWords[actLevel-1], 10);
			case 3: 
				return _.sample(selectedWords[actLevel-1], 15);
			default:
				return -1;
		}
	};



	that.init = init;
	that.getWordsLevel = getWordsLevel;
	that.getWordsGame = getWordsGame;


	return that;

}());