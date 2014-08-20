(function ($) {
  var chart = null;
  var option = null;
  var dataTable = null;

  var layoutSelectWidget = LayoutSelectWidget;

AjaxSolr.CalendarWidget = AjaxSolr.AbstractFacetWidget.extend({


  afterRequest: function (){
    var self = this;
    google.setOnLoadCallback(drawChart);
    drawChart();

   function drawChart() {
       dataTable = new google.visualization.DataTable();
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
      var selection =chart.getSelection()[0].row;
      if(selection){
        var dateObj = dataTable.getValue(selection,0);
        var corrDay = dateObj.getDate() + 1; //for some reason must be incremented by one
        dateObj.setDate(corrDay);
        var dateString = dateObj.toISOString().split("T")[0];

         if (self.add('[' + dateString + 'T00:00:00Z TO ' + dateString + 'T23:59:59Z]')) {
            self.doRequest();
          }
      }
    }

       chart = new google.visualization.Calendar(document.getElementById(self.target.substr(1)));

       options = {
        
         height: 190, 
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
            },

            monthOutlineColor: {
              stroke: '#981b48',
              strokeOpacity: 0.8,
              strokeWidth: 2
            },
            unusedMonthOutlineColor: {
              stroke: '#bc5679',
              strokeOpacity: 0.8,
              strokeWidth: 1
            },
            underMonthSpace: 16,

           }

         };

        chart.draw(dataTable, options);

        google.visualization.events.addListener(chart, 'select', selectHandler);
     }

    $(layoutSelectWidget).on("redrawCalendar", redrawCalendar);

    function redrawCalendar(e, cellSize){
      options = {
        
         height: 190, 
         noDataPattern: {
           backgroundColor: '#ddd',
           color: '#ddd'
         },
        
         
          calendar: { 
            cellSize: cellSize,
            yearLabel: {
              fontSize: 14,
              bold: true,
              italic: false
            },
            monthLabel: {
              fontSize: 11
            },

            monthOutlineColor: {
              stroke: '#981b48',
              strokeOpacity: 0.8,
              strokeWidth: 2
            },
            unusedMonthOutlineColor: {
              stroke: '#bc5679',
              strokeOpacity: 0.8,
              strokeWidth: 1
            },
            underMonthSpace: 16,

           }

         };
      if(chart)
        chart.draw(dataTable,options);
    }
  }
});

})(jQuery);
