(function ($) {

AjaxSolr.CalendarWidget = AjaxSolr.AbstractFacetWidget.extend({
  /*afterRequest: function () {
    var self = this;
    $(this.target).datepicker('destroy').datepicker({
      dateFormat: 'yy-mm-dd',
      defaultDate: new Date(1987, 2, 1),
      maxDate: $.datepicker.parseDate('yy-mm-dd', this.manager.store.get('facet.date.end').val().substr(0, 10)),
      minDate: $.datepicker.parseDate('yy-mm-dd', this.manager.store.get('facet.date.start').val().substr(0, 10)),
      nextText: '&gt;',
      prevText: '&lt;',
      beforeShowDay: function (date) {
        var value = $.datepicker.formatDate('yy-mm-dd', date) + 'T00:00:00Z';
        var count = self.manager.response.facet_counts.facet_dates[self.field][value];
        return [ parseInt(count) > 0, '', count + ' documents found!' ];
      },
      onSelect: function (dateText, inst) {
        if (self.add('[' + dateText + 'T00:00:00Z TO ' + dateText + 'T23:59:59Z]')) {
          self.doRequest();
        }
      }
    });
  }*/


  afterRequest: function (){
    var self = this;
    google.setOnLoadCallback(drawChart);
    drawChart();

   function drawChart() {
       var dataTable = new google.visualization.DataTable();
       dataTable.addColumn({ type: 'date', id: 'Date' });
       dataTable.addColumn({ type: 'number', id: 'Articles' });
       var myDates = [];
       console.log(self.manager.response.facet_counts.facet_dates);
       for (var thisDate in self.manager.response.facet_counts.facet_dates[self.field]) {
        var temp = thisDate.split("-");
        if(temp.length == 3){
          myDates.push([temp, self.manager.response.facet_counts.facet_dates[self.field][thisDate]]);
          dataTable.addRow([new Date(temp[0],temp[1]-1, temp[2].split("T")[0]), self.manager.response.facet_counts.facet_dates[self.field][thisDate]]);
        }
    }

    function selectHandler(){
      console.log(chart.getSelection()[0].row);
      if(chart.getSelection()[0].row){
        var dateObj = dataTable.Of[chart.getSelection()[0].row].c[0].v;
        console.log(dateObj);
        var corrDay =dateObj.getDate() + 1; //for some reason must be incremented by one
        dateObj.setDate(corrDay);
        console.log(dateObj.toISOString());
        var dateString = dateObj.toISOString().split("T")[0];
        console.log('[' + dateString + 'T00:00:00Z TO ' + dateString + 'T23:59:59Z]');

         if (self.add('[' + dateString + 'T00:00:00Z TO ' + dateString + 'T23:59:59Z]')) {
            self.doRequest();
          }
      }
    }

       var chart = new google.visualization.Calendar(document.getElementById(self.target.substr(1)));

       var options = {
        
         height: 150, 
         noDataPattern: {
           backgroundColor: '#ddd',
           color: '#ddd'
         },
        
         
          calendar: { 
            cellSize: 7,
            yearLabel: {
              fontSize: 14,
              
              bold: true,
              italic: false
            },
             monthLabel: {
          fontSize: 11
         }

           }

         };

       chart.draw(dataTable, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);
     }
  }
});

})(jQuery);
