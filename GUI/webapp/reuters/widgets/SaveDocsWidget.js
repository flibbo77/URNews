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
	windowNr = 0;

	
	init = function() {
		localStorageModel = LocalStorageModel.init();
		actualizeWindow();
		console.log("SaveDocsInit");
		//$(document).off();

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
		doc.content = doc.content.substring(1,doc.content.length - 4 );

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

		var template = '<div id="cont1" class="container_'+windowNr+'" style="position:relative; top: 100px; left: 300px; width: 400px;z-index: 1;height:300px"';
		template += ' data-icon="css/icons/news.png"  data-alwaisontop=false data-resizegrid="20,20" data-centeronwindow = true data-skin= "black" data-drag= true data-resize=true  data-dock="dock" data-collapse=false data-close=false data-containment="document" data-modal=false data-buttons="fullscreen,dock,close">';
		template += '<h2 class="windowHeader">'+actDoc.title+'</h2><p class="windowContent">'+actDoc.content+'</p>;'
        template += '<p class="windowContentComment">'+actDoc.comment+'</p></div>';
    	$(".windowsContainer").append(template);
		$(".container_"+windowNr).containerize();
		setTimeout(function(){
			$(".container_"+windowNr).css({
			"z-index":"1"
			});
			console.log("setTimeout");
		}, 5000);
		windowNr++;
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