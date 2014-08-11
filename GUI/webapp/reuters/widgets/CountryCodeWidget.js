(function ($) {
 var codeConv = codeConverter.init();

AjaxSolr.CountryCodeWidget = AjaxSolr.AbstractFacetWidget.extend({


  afterRequest: function () {
    $("#regions_div").empty();
    var self = this;

    $(this.target).empty();

    var maxCount = 0;
   
    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
          
      if (facet.length <20) { // NOT only display country codes -- changed!
        var count = this.manager.response.facet_counts.facet_fields[this.field][facet];
        if (count > maxCount) {
          maxCount = count;
        }
       
      }
    }
 
    var myData =  [];
    myData[0] = ['country', 'number of articles'];

    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
      myData.push([facet.toUpperCase(), (this.manager.response.facet_counts.facet_fields[this.field][facet] )]);
    
    }
   
    
    var data = google.visualization.arrayToDataTable(myData);
    var options = {
      colorAxis: {colors: ['lightblue','blue','yellow', 'orange','red']}
    };
    console.log(self.target);
    var chart = new google.visualization.GeoChart(document.getElementById(self.target.substr(1)));
    chart.draw(data,options);
    google.visualization.events.addListener(chart, "ready", function(){
      google.visualization.events.addListener(chart, 'regionClick', selectHandler);
    })

    function selectHandler(obj) {
      console.log(obj);
      var nameOfSelected = codeConv.getName(obj.region).toLowerCase();
      console.log(nameOfSelected); 

      if (nameOfSelected && self.add(nameOfSelected)) {
        self.doRequest();
      }
    }

    google.setOnLoadCallback(function(){
      chart.draw(data, options);}
    );     
  },

  template: function (name, container) {
    var options = [];
    for (var value in container) {
      options.push('<option value="' + value +'">' + container[value] + '</option>');
    }
    return '<select id="' + name + '" name="' + name + '">' + options.join('\n') + '</select>';
  },

 

});

})(jQuery);
