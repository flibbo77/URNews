(function ($) {

AjaxSolr.TagcloudWidget = AjaxSolr.AbstractFacetWidget.extend({

  afterRequest: function () {
    if (this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
      $(this.target).html('no items found in current selection');
      return;
    }

    var maxCount = 0;
    var objectedItems = [];
    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
      var count = parseInt(this.manager.response.facet_counts.facet_fields[this.field][facet]);
      if (count > maxCount) {
        maxCount = count;
      }
      objectedItems.push({ facet: facet, count: count });
    }
    objectedItems.sort(function (a, b) {
      return a.facet < b.facet ? -1 : 1;
    });

    $(this.target).empty();
    $(this.target).append($("<p class='accordion_content'></p>"));
    for (var i = 0, l = objectedItems.length; i < l; i++) {
      var facet = objectedItems[i].facet;
      $(this.target).children(".accordion_content").append(
        $('<a href="#" class="tagcloud_item"></a>')
        .text(facet)
        .addClass('tagcloud_size_' + parseInt(Math.log(objectedItems[i].count / maxCount * 1000)))
        .click(this.clickHandler(facet))
      );
    }

    $(function() {
    $( "#accordion" ).accordion({
      heightStyle: "content",
      icons: null
      
    });
  });


}  
});



})(jQuery);
