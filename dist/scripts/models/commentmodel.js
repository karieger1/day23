var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $; //give backbone access to jquery

module.exports = Backbone.Model.extend ({
	defaults: {
		_id: null,
		url: null,
		imageID: null
	},
	urlRoot: "http://tiny-pizza-server.herokuapp.com/collections/tacotowncomments",
	idAttribute: "_id"
});