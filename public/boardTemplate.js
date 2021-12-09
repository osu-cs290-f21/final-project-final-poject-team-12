(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['board'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<table id=\"board\">\n    <tr id=\"row-1\">\n        <td class=\"space\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"0") || (depth0 != null ? lookupProperty(depth0,"0") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"0","hash":{},"data":data,"loc":{"start":{"line":3,"column":27},"end":{"line":3,"column":32}}}) : helper)))
    + "</td>\n        <td class=\"space\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"1") || (depth0 != null ? lookupProperty(depth0,"1") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"1","hash":{},"data":data,"loc":{"start":{"line":4,"column":27},"end":{"line":4,"column":32}}}) : helper)))
    + "</td>\n        <td class=\"space\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"2") || (depth0 != null ? lookupProperty(depth0,"2") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"2","hash":{},"data":data,"loc":{"start":{"line":5,"column":27},"end":{"line":5,"column":32}}}) : helper)))
    + "</td>\n    </tr>\n    <tr id=\"row-2\">\n        <td class=\"space\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"3") || (depth0 != null ? lookupProperty(depth0,"3") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"3","hash":{},"data":data,"loc":{"start":{"line":8,"column":27},"end":{"line":8,"column":32}}}) : helper)))
    + "</td>\n        <td class=\"space\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"4") || (depth0 != null ? lookupProperty(depth0,"4") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"4","hash":{},"data":data,"loc":{"start":{"line":9,"column":27},"end":{"line":9,"column":32}}}) : helper)))
    + "</td>\n        <td class=\"space\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"5") || (depth0 != null ? lookupProperty(depth0,"5") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"5","hash":{},"data":data,"loc":{"start":{"line":10,"column":27},"end":{"line":10,"column":32}}}) : helper)))
    + "</td>\n    </tr>\n    <tr id=\"row-3\">\n        <td class=\"space\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"6") || (depth0 != null ? lookupProperty(depth0,"6") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"6","hash":{},"data":data,"loc":{"start":{"line":13,"column":27},"end":{"line":13,"column":32}}}) : helper)))
    + "</td>\n        <td class=\"space\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"7") || (depth0 != null ? lookupProperty(depth0,"7") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"7","hash":{},"data":data,"loc":{"start":{"line":14,"column":27},"end":{"line":14,"column":32}}}) : helper)))
    + "</td>\n        <td class=\"space\" >"
    + alias4(((helper = (helper = lookupProperty(helpers,"8") || (depth0 != null ? lookupProperty(depth0,"8") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"8","hash":{},"data":data,"loc":{"start":{"line":15,"column":27},"end":{"line":15,"column":32}}}) : helper)))
    + "</td>\n    </tr>\n</table>";
},"useData":true});
})();