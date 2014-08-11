
var codeConverter = (function() {
	var that = {},
	json = [],
	
	

	
	init = function() {
		$.getJSON ('js/nameCodeMap.json', function(data){
          json = data;
          console.log(json);
          
          
        });
        console.log(json);
		
     	return that;
	},

	getCode = function(land){
		for(var i = 0; i < json.length; i++){
			console.log(json[i]);
			if (json[i].NAME == land){
				return json[i].CODE;
			}
			
		}
		return "null";
	},

	getName = function(code){
		for(var i = 0; i < json.length; i++){
			if(json[i].CODE == code){
				return json[i].NAME
			}
		}
	};

	



	that.init = init;
	that.getCode = getCode;
	that.getName = getName;
	


	return that;

}());