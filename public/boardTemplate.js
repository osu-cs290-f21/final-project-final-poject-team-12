(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['board'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<table id=\"board\">\r\n    <tr id=\"row-1\">\r\n        <td class=\"space\" id=\"1\" >1</td>\r\n        <td class=\"space\" id=\"2\" >2</td>\r\n        <td class=\"space\" id=\"3\" >3</td>\r\n    </tr>\r\n    <tr id=\"row-2\">\r\n        <td class=\"space\" id=\"4\">4</td>\r\n        <td class=\"space\" id=\"5\">5</td>\r\n        <td class=\"space\" id=\"6\">6</td>\r\n    </tr>\r\n    <tr id=\"row-3\">\r\n        <td class=\"space\" id=\"7\">7</td>\r\n        <td class=\"space\" id=\"8\">8</td>\r\n        <td class=\"space\" id=\"9\">9</td>\r\n    </tr>\r\n</table>";
},"useData":true});
})();