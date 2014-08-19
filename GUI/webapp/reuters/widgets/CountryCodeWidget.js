(function ($) {
 var codeConv = codeConverter.init();
 var layoutSelectWidget = LayoutSelectWidget;
 var chart;
 var data;
 var options;

AjaxSolr.CountryCodeWidget = AjaxSolr.AbstractFacetWidget.extend({


  afterRequest: function () {
    var self = this;
    $(this.target).empty();
    var maxCount = 0;
   
    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
        var count = this.manager.response.facet_counts.facet_fields[this.field][facet];
        if (count > maxCount) {
          maxCount = count;
        }
    }
 
    var myData =  [];
    myData[0] = ['country', 'number of articles'];

    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
      myData.push([facet.toUpperCase(), (this.manager.response.facet_counts.facet_fields[this.field][facet] )]);
    }
    
    data = google.visualization.arrayToDataTable(myData);
    options = {
      colorAxis: {colors: ['lightblue','blue','yellow', 'orange','#9c004b']}
    };
    chart = new google.visualization.GeoChart(document.getElementById(self.target.substr(1)));
    chart.draw(data,options);
    google.visualization.events.addListener(chart, "ready", function(){
      google.visualization.events.removeListener();
      google.visualization.events.addListener(chart, 'regionClick', selectHandler);
      console.log("map ready");
    })

    function selectHandler(obj) {
      console.log(obj);
      var nameOfSelected = codeConv.getName(obj.region).toLowerCase();
      console.log(nameOfSelected); 

      if (nameOfSelected && self.add(nameOfSelected)) {
        self.doRequest();
      }
    }

    $(layoutSelectWidget).on("redrawMap", redrawMap);

    function redrawMap(){
      //self.doRequest();
      if(chart)
        chart.draw(data,options);
    }

    google.setOnLoadCallback(function(){
      console.log("before draw");
      chart.draw(data, options);
      console.log("after draw");
    });     
  },

 

});

})(jQuery);
