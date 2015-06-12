var $ = require("jquery");
var Backbone = require("backbone");
Backbone.$ = $; //give backbone access to jquery

var ImageModel = require("../models/commentmodel.js")

module.exports = Backbone.Collection.extend ({
	model: ImageModel,
	url: "http://tiny-pizza-server.herokuapp.com/collections/tacotowncomments",
});