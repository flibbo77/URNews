LayoutSelectWidget = (function() {
	var that = {},
	calendar = null,
	map = null,
	butAll = null,
	butMap = null,
	butCalendar = null,
	butNothing = null,
	all = 1,
	map = 2,
	calendar = 3,
	nothing = 4,
	actualLayout = all,
	$calendar = null,
	$map = null,
	closeCalendarBut = null,
	closeMapBut = null,
	
	
	init = function() {
		console.log("LayoutSelectWidget.init");
		butAll = $(".selectAll");
		butMap = $(".selectMap");
		butCalendar = $(".selectCalendar");
		butNothing = $(".selectNothing");
		closeMapBut = $(".closeMapBut");
		closeCalendarBut = $(".closeCalendarBut");

		butAll.prop("disabled", true);


		$(".layoutSelectBut").off();
		$(".layoutSelectBut").on("click", layoutSelectHandler);

		closeCalendarBut.off();
		closeMapBut.off();
		closeCalendarBut.on("click", closeCalendarHandler);
		closeMapBut.on("click", closeMapHandler);

		$calendar = $("#calendar");
		$map = $("#countries");
		return that;  
	},

	layoutSelectHandler = function(e){
		console.log($(e.currentTarget));
		var clickedBut = $(e.currentTarget);
		if(clickedBut.hasClass("selectAll")){
			console.log("selectAll");
			setTimeout(function () {
				switchToLayoutAll();
    		}, 5);
			switchToLayoutNothing();
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

	closeMapHandler = function(){
		if(actualLayout == all){
			switchToLayoutCalendar();
		}else if(actualLayout == map){
			switchToLayoutNothing();
		}
	},

	closeCalendarHandler = function(){
		if(actualLayout == all){
			switchToLayoutMap();
		}else if (actualLayout == calendar){
			switchToLayoutNothing();
		}
	},

	switchToLayoutAll = function(){
		actualLayout = all;
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
		closeCalendarBut.css({
			"display" : "inline"
		});
		closeMapBut.css({
			"display" : "inline"
		});
		$(that).trigger("redrawMap");
		$(that).trigger("redrawCalendar", 7);
	},

	switchToLayoutMap = function(){
		actualLayout = map;
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
		closeCalendarBut.css({
			"display" : "none"
		});
		closeMapBut.css({
			"display" : "inline"
		});
		$(that).trigger("redrawMap");
	},

	switchToLayoutCalendar = function(){
		actualLayout = calendar;
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
		closeCalendarBut.css({
			"display" : "inline"
		});
		closeMapBut.css({
			"display" : "none"
		});
		$(that).trigger("redrawCalendar", 12);
	},

	switchToLayoutNothing = function(){
		actualLayout = nothing;
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
		closeCalendarBut.css({
			"display" : "none"
		});
		closeMapBut.css({
			"display" : "none"
		});
	};

	that.init = init;
	

	return that;

}());
