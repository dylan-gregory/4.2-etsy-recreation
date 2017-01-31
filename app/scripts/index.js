
var handlebars = require('handlebars');
var _ = require('underscore');
var $ = require('jquery');


/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=leather&includes=Images,Shop&sort_on=score";

      fetchJSONP(url, function(data) {
        _.each(data.results, function(etsy){

        var content = {
          title: etsy.title,
          image: etsy.Image[0].url_75x75,
          etc, etc...
      }
      }
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/


var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=leather&includes=Images,Shop&sort_on=score";

var source = $('#tile-template').html();
var template = handlebars.compile(source);

console.log(template);

fetchJSONP(url, function(data) {
  _.each(data.results, function(etsy){

  var content = {
    title: etsy.title,
    image: etsy.Images[0].url_170x135,
    price: etsy.price,
    shop: etsy.Shop.shop_name

    }
    console.log(etsy)

$('#tile-container').append(template(content));

})
});











function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}




//
// data.results will be the array of items that we are going to want to
