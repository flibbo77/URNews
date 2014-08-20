(function ($) {


AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
  start: 0,

  beforeRequest: function () {
    $(this.target).html($('<img>').attr('src', 'images/ajax-loader.gif'));
  },

  facetLinks: function (facet_field, facet_values) {
    var links = [];
    if (facet_values) {
      for (var i = 0, l = facet_values.length; i < l; i++) {
        if (facet_values[i] !== undefined ) {
          if( facet_values[i].length != 0){
          links.push(
            $('<a href="#"></a>')
            .text(facet_values[i])
            .click(this.facetHandler(facet_field, facet_values[i]))
          );
        }
        }
      }
    }
    return links;
  },

  facetHandler: function (facet_field, facet_value) {
    var self = this;
    return function () {
      self.manager.store.remove('fq');
      self.manager.store.addByValue('fq', facet_field + ':' + AjaxSolr.Parameter.escapeValue(facet_value));
      self.doRequest();
      return false;
    };
  },

  afterRequest: function () {
    $(this.target).empty();

    for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
      var doc = this.manager.response.response.docs[i];
          console.log(doc);
      $(this.target).append(this.template(doc));

      var items = [];
      items = items.concat(this.facetLinks('topics', doc.topics));
      items = items.concat(this.facetLinks('organisations', doc.organisations));
      items = items.concat(this.facetLinks('exchanges', doc.exchanges));

      var $links = $('#links_' + doc.id);
      $links.empty();
      for (var j = 0, m = items.length; j < m; j++) {
        $links.append($('<li></li>').append(items[j]));
      }
    }
  },

  template: function (doc) {
    var snippet = '';
    if(doc.text){
      if (doc.text.length > 250) {
        console.log("länger!!!");//+Jahr!!!
        snippet += doc.dateline.substring(4) + ' ' + doc.text.substring(0, 250);
        snippet += '<span style="display:none;">' + doc.text.substring(250);
        snippet += '</span> <a  href="#" class="more morelesslink">...</a>';
      }
      else {
        snippet += doc.dateline + ' ' + doc.text;
      }
    }

    var output = '<div class="NewsItem" ><h3 class="title" style="display: inline-block">' + doc.title + '</h3><button class="saveBut" style="display: inline; float: right"></button>';

    output += '<p class="snippet">' + snippet + '</p>';
    if(doc.text)
      output += "<p class = 'wordsCount' style='display: inline'> " + doc.text.split(' ').length + " words</p>";
    output += '<p id="links_' + doc.id + '" class="links" style="display:inline; float:right"></p></div>';
    
    
    return output;
  },

  init: function () {
    $(document).on('click', 'p.snippet', function () {
      var $this = $(this),
          span = $this.find('span');
          console.log(span);

      if (span.is(':visible')) {
        span.hide();
        $(".morelesslink").text('....');
      }
      else {
        span.show();
        $(".morelesslink").text('less');
      }


      return false;
    });
    
  }
});

})(jQuery);