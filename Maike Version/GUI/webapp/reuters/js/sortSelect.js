
var sortSelect = (function() {
	var that = {},
	selector = null,
	sortOrder = "date desc",
	startDefault = true,
	
	
	init = function() {
		selector = $(".sortBy");
		selector.change(onchange);
         
     	return that;
	},

	onchange = function(e){
		sortOrder = selector[0].options[selector[0].options.selectedIndex].value;
		$(that).trigger("sortOrderChanged");
	},

	setToDefault = function(){
		$('.sortBy option[value="score desc"]').attr("selected","selected");
		$('.sortBy option[value="date asc"]').attr("selected",null);
		$('.sortBy option[value="date desc"]').attr("selected",null);
	},

	setStartToDefault = function(isDefault){
		console.log("isDefault: " + isDefault);
		startDefault = isDefault;
	},

	getSortOrder = function(){
		if(!selector) 
			selector = $(".sortBy");

		var res = sortOrder;
		if(!startDefault)
			sortOrder = selector[0].options[selector[0].options.selectedIndex].value;
		return sortOrder;
	};

	

	that.init = init;
	that.getSortOrder = getSortOrder;
	that.setToDefault = setToDefault;
	that.setStartToDefault = setStartToDefault;

	


	return that;

}());