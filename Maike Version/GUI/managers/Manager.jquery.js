  
(function (callback) {
  if (typeof define === 'function' && define.amd) {
    define(['core/AbstractManager'], callback);
  }
  else {
    callback();
  }
}(function () {

/**
 * @see http://wiki.apache.org/solr/SolJSON#JSON_specific_parameters
 * @class Manager
 * @augments AjaxSolr.AbstractManager
 */
AjaxSolr.Manager = AjaxSolr.AbstractManager.extend(
  /** @lends AjaxSolr.Manager.prototype */
  {
  executeRequest: function (servlet, string, handler, errorHandler) {
    var self = this,
        options = {dataType: 'json'};

   
  
    this.store.get('sort').val(sortSelect.getSortOrder());
   
    string = string || this.store.string();
    handler = handler || function (data) {
      self.handleResponse(data);
    };
    errorHandler = errorHandler || function (jqXHR, textStatus, errorThrown) {
      self.handleError(textStatus + ', ' + errorThrown);
    };
    //console.log(string);
    if (this.proxyUrl) {
      options.url = this.proxyUrl;
      options.data = {query: string};
      options.type = 'POST';
    }
    else {
      options.url = this.solrUrl + servlet + '?' + string +  '&wt=json&json.wrf=?';
      console.log(options.url);
    }
    jQuery.ajax(options).done(handler).fail(errorHandler);
  }
});

}));

//&defType=edismax&qf=topics^2.3+organisations^2.1+title^1.2+text+places&
  //&qf=topics^2.0+organisations^4.0+exchanges^4.0+id^1.0+places^4.0+countryCodes^4.0+_version_^1.0+companies^1.0+allText^1.0+date^4.0+dateline^3.0
