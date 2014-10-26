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
		if(temp[index].title == title){
			deleteDocuments();
			temp.splice(index, 1);
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

		return documents;  		
  	},

  	saveChangesToLocalStorage = function (index, title, comment){
  		var temp = getDocuments();
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
	};

	that.init = init;
	that.saveToLocalStorage = saveToLocalStorage;
	that.getDocuments = getDocuments;
	that.deleteDocuments = deleteDocuments;
	that.deleteDocument = deleteDocument;
	that.saveChangesToLocalStorage = saveChangesToLocalStorage;

	return that;

}());
