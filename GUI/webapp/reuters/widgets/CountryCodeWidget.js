(function ($) {
 var codeConv = codeConverter.init();

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
    
    var data = google.visualization.arrayToDataTable(myData);
    var options = {
      colorAxis: {colors: ['lightblue','blue','yellow', 'orange','#9c004b']}
    };
    var chart = new google.visualization.GeoChart(document.getElementById(self.target.substr(1)));
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

    google.setOnLoadCallback(function(){
      console.log("before draw");
      chart.draw(data, options);
      console.log("after draw");
    });     
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
