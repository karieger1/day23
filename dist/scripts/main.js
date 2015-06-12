var $ = require("jquery");
$(document).ready(function() {
var _ = require("backbone/node_modules/underscore");
	//create first collection
	var ImageCollection = require("./collections/imagecollection.js");
	var ImageModel = require("./models/ImageModel.js");
	var CommentCollection = require("./collections/commentcollection.js");
	var CommentModel = require("./models/commentmodel.js");

	var ImageRowBuilder = _.template($("#image-row-template").html());
	var CommentRowBuilder = _.template($("#comment-row-template").html());

	var ImageList = new ImageCollection();
	var CommentList = new CommentCollection();

	ImageList.fetch({
		success: function() {
			CommentList.fetch();
		}
	});
	
	
	$("#add-image-form").on("submit", function (e) {
		
		e.preventDefault();

		var imageToAdd = new ImageModel ({
			url: $("#image-url-input").val(),
			caption: $("#image-caption-input").val()

		});
		console.log(imageToAdd);
		ImageList.add(imageToAdd);
		imageToAdd.save();
	});

	ImageList.on("add", function(addedImage) {
		var imageHtml = ImageRowBuilder({model: addedImage});

		$("#image-list").append(imageHtml);

		$('[data-form-cid="'+addedImage.cid+'"]').on('submit', function(e) {
            e.preventDefault();
            // console.log('comment was submitted!', addedImage.cid);
            var $commentInput = $(this).find(".comment-input");
            console.log($commentInput.val());

			var commentToAdd = new CommentModel({
				text: $commentInput.val(),
				imageId: addedImage.get("_id") 
			});

			CommentList.add(commentToAdd);
			commentToAdd.save();
        });

	});

	
	CommentList.on("add", function(addedComment) {
		var commentHtml = CommentRowBuilder({model: addedComment});
		var imageId = addedComment.get("imageId");
		var ImageModel = ImageList.get(imageId);

		$('[data-cid="'+ImageModel.cid+'"] .comment-list' ).append(commentHtml);
	});
});