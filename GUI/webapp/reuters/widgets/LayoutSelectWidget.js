LayoutSelectWidget = (function() {
	var that = {},
	calendar = null,
	map = null,
	butAll = null,
	butMap = null,
	butCalendar = null,
	butNothing = null,
	
	
	init = function() {
		console.log("LayoutSelectWidget.init");
		butAll = $(".selectAll");
		butMap = $(".selectMap");
		butCalendar = $(".selectCalendar");
		butNothing = $(".selectNothing");

		butAll.prop("disabled", true);


		$(".layoutSelectBut").off();
		$(".layoutSelectBut").on("click", layoutSelectHandler);

		$calendar = $("#calendar");
		$map = $("#countries");
		return that;  
	},

	layoutSelectHandler = function(e){
		console.log($(e.currentTarget));
		var clickedBut = $(e.currentTarget);
		if(clickedBut.hasClass("selectAll")){
			console.log("selectAll");
			switchToLayoutAll();
		}else if(clickedBut.hasClass("selectMap")){
			console.log("slelctMap");
			switchToLayoutMap();
		}else if(clickedBut.hasClass("selectCalendar")){
			console.log("slelctCalendar");
			switchToLayoutCalendar();
		}else if(clickedBut.hasClass("selectNothing")){
			console.log("slelctNothing");
			switchToLayoutNothing();
		}
	},

	switchToLayoutAll = function(){
		butAll.prop("disabled", true);
		butMap.prop("disabled", false);
		butCalendar.prop("disabled", false);
		butNothing.prop("disabled", false);

		$calendar.css({
			"display": "block",
			"width": "400px",
			"height" : "auto",
			"float" : "right",
			"margin-top" : "50px"
		});
		$map.css({
			"display": "block",
			"width": "300px",
			"height" : "200px",
			"float" : "left"
		});
		$(that).trigger("redrawMap");
		$(that).trigger("redrawCalendar", 7);
	},

	switchToLayoutMap = function(){
		butAll.prop("disabled", false);
		butMap.prop("disabled", true);
		butCalendar.prop("disabled", false);
		butNothing.prop("disabled", false);

		$calendar.css({
			"display": "none"
		});
		$map.css({
			"display": "block",
			"float" : "none",
			"margin-left" : "auto",
			"margin-right" : "auto",
			"height" : "300px",
			"width" : "450px",
		});
		$(that).trigger("redrawMap");
	},

	switchToLayoutCalendar = function(){
		butAll.prop("disabled", false);
		butMap.prop("disabled", false);
		butCalendar.prop("disabled", true);
		butNothing.prop("disabled", false);

		$calendar.css({
			"display": "block",
			"float" : "none",
			"margin-left" : "auto",
			"margin-right" : "auto",
			"width" : "700px",
			"height" : "200px",
			"margin-top" : "0px"
		});
		$map.css({
			"display": "none"
		});
		$(that).trigger("redrawCalendar", 12);
	},

	switchToLayoutNothing = function(){
		butAll.prop("disabled", false);
		butMap.prop("disabled", false);
		butCalendar.prop("disabled", false);
		butNothing.prop("disabled", true	);
		$calendar.css({
			"display": "none"
		});
		$map.css({
			"display": "none"
		});
	};

	that.init = init;
	

	return that;

}());
