LocalStorageModel = (function() {
	var that = {},
	documents = [],
	
	
	init = function() {
		return that;  
	},

	deleteDocuments = function(){
		localStorage.clear();
	},

	deleteDocument = function(index, title, callback){
		var temp = getDocuments();
		console.log("delete doc nr: " + index + " title: " + title);
		console.log(temp[index].title);
		if(temp[index].title == title){
			console.log("delete");
			temp.splice(index, 1);
			deleteDocuments();
			for(var i = 0; i < temp.length; i++)
				saveToLocalStorage(temp[i]);
			callback();
		}
	},

	getDocuments = function(){
		documents = [];
  		for(var i = 0; i < localStorage.length; i++){
	  		documents.push(JSON.parse(localStorage[i]));
  		}
  		console.log(documents);
		//documents = _.sortBy(documents, "score").reverse();

		return documents;  		
  	},

  	saveChangesToLocalStorage = function (index, title, comment){
  		console.log(comment);
  		var temp = getDocuments();
  		console.log(temp[index].title + " vs " + title);
  		if(temp[index].title == title){
  			if(temp[index].comment != comment){
  				temp[index].comment = comment;
  				deleteDocuments();
  				for(var i = 0; i < temp.length; i++){
  					saveToLocalStorage(temp[i]);
  				}
  			}
  		}
  	},

	saveToLocalStorage = function(resultObj){
		localStorage[localStorage.length] = JSON.stringify(resultObj);
		console.log(localStorage.length);
	};

	that.init = init;
	that.saveToLocalStorage = saveToLocalStorage;
	that.getDocuments = getDocuments;
	that.deleteDocuments = deleteDocuments;
	that.deleteDocument = deleteDocument;
	that.saveChangesToLocalStorage = saveChangesToLocalStorage;

	return that;

}());
