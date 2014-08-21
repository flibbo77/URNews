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
	windowNr = 0,
	myWindows=[],

	deleteDocBut = null,
	openInWindowBut = null,
	closeAllWindowsBut = null,

	
	init = function() {
		localStorageModel = LocalStorageModel.init();
		actualizeWindow();

		deleteDocBut = $(".deleteDocBut");
		openInWindowBut = $(".openInWindowBut");
		closeAllWindowsBut = $(".closeAllWindowsBut");

    	$(document).on('click', 'button.saveBut', function (e) {
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

    	$(document).on('click', 'button.openInWindowBut', function (e) {
        	openInWindowHandler(e);
   		 });

    	$(document).on('click', 'button.closeAllWindowsBut', function (e) {
        	closeAllWindowsHandler(e);
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
			title: $(e.target.parentElement).children(".title").text(),
			content: $(e.target.parentElement).children(".snippet").text(),
			comment: ""
		}
		doc.content = doc.content.substring(0,doc.content.length - 4 );

		localStorageModel.saveToLocalStorage(doc);
		actualizeWindow();
		console.log($("."+actDoc.index));
		$("."+actDoc.index).css({
		      "background-color": "#9c004b",
		      "color": "white"
		    });
	},

	loadDocHandler = function(e){
		if(actDoc.index >= 0 && !lastWasDeletet){
			actDoc.comment = $(".actual_doc_comment")[0].value;
			console.log (actDoc.comment);
			localStorageModel.saveChangesToLocalStorage(actDoc.index, actDoc.title, actDoc.comment);
		}
		console.log(e);

		actDoc.index = e.target.classList[1];
		actDoc.title = e.target.textContent;

		var temp = localStorageModel.getDocuments();
		actDoc.content = temp[actDoc.index].content;
		actDoc.comment = temp[actDoc.index].comment;
		$(".actual_doc_content")[0].value = actDoc.content;
		$(".actual_doc_comment")[0].value = actDoc.comment;
		lastWasDeletet = false;
		console.log(actDoc.comment);
	},

	openInWindowHandler = function(e){

		myWindows.push(window.open("", windowNr, "width=400, height=300"));
		myWindows[myWindows.length-1].document.write("<h1>"+actDoc.title +"</h1><p>"+actDoc.content+"</p><p>"+actDoc.comment+"</p>");
		myWindows[myWindows.length-1].document.title = actDoc.title;
		windowNr++;
	},

	closeAllWindowsHandler = function(e){
		for(var i = 0; i < myWindows.length; i++){
			myWindows[i].close();
			myWindows = [];
			windowNr = 0;
		}
	},

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