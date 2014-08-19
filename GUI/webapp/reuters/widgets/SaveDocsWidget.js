var SaveDocsWidget = (function() {
	var that = {},
	localStorageModel = null,
	actDoc = {
	index: -1,
	title: "",
	content: "",
	comment: ""
	},
	lastWasDeletet = false,
	
	init = function() {
		localStorageModel = LocalStorageModel.init();
		window.onload=function(){
			actualizeWindow();
		}
		$(document).off('click');	
    	$(document).on('click', 'button.saveBut', function (e) {
        	console.log($(e.srcElement.parentElement).children(".title").text());
        	//$(that).trigger("saveDoc", e.srcElement.parentElement);
        	saveDocHandler(e);
   		 });

    	$(document).on('click', 'li.savedDocTitle', function (e) {
    		$(this).siblings().css({
    			"background-color": "white",
    			"color" : "black"
    		})
    		$(this).css({
		      "background-color": "#9c004b",
		      "color": "white"
		    });

    		console.log(e);
    		loadDocHandler(e);
    	});

    
    	$(document).on('click', 'button.deleteDocBut', function (e) {
    		console.log(e);
    		deleteDocHandler(e);
    	});

		
     	return that;
	},

	deleteDocHandler =function(e){
		if(actDoc.index >= 0){
			localStorageModel.deleteDocument(actDoc.index, actDoc.title, actualizeWindow );
			lastWasDeletet = true;
			$(".actual_doc_content")[0].value = "";
			$(".actual_doc_comment")[0].value = "";
		}
	}

	saveDocHandler = function(e){
		var doc = {
			title: $(e.srcElement.parentElement).children(".title").text(),
			content: $(e.srcElement.parentElement).children(".snippet").text(),
			comment: ""
		}
		console.log(doc);

		localStorageModel.saveToLocalStorage(doc);
		actualizeWindow();
	},

	loadDocHandler = function(e){
		if(actDoc.index >= 0 && !lastWasDeletet){
			actDoc.comment = $(".actual_doc_comment")[0].value;
			console.log (actDoc.comment);
			localStorageModel.saveChangesToLocalStorage(actDoc.index, actDoc.title, actDoc.comment);
		}

		actDoc.index = e.srcElement.classList[1];
		actDoc.title = e.srcElement.textContent;

		var temp = localStorageModel.getDocuments();
		actDoc.content = temp[actDoc.index].content;
		actDoc.comment = temp[actDoc.index].comment;
		$(".actual_doc_content")[0].value = actDoc.content;
		$(".actual_doc_comment")[0].value = actDoc.comment;
		lastWasDeletet = false;
		console.log(actDoc.comment);
	}

	actualizeWindow = function(){
		var savedDocs = [];
		savedDocs = localStorageModel.getDocuments();
		$(".saved_docs_headings").empty();
		for(var i = 0; i < savedDocs.length; i++)
			$(".saved_docs_headings").append("<li class='savedDocTitle "+ i +"' style='list-style-type: none'>"+ savedDocs[i].title+ "</li");
	};

	that.init = init;

	return that;

}());