var express = require('express');
var User = require('../../models/user.js');
var Post = require('../../models/post.js');
var Collect = require('../../models/collect.js');
var router = express.Router();
$().ready(function () {


	function tagShow(event) {
		var e = event.target || event.srcElement;
		var $e = $(e);
		if(e.tagName !== "LI") return;
		var tagName = $e.children().text();
		console.log(e);
		var tagAry = $('.anim p:hidden');
		$('#animContent').empty();
		for(var i = 0 , tagSingle ; tagSingle = tagAry[i++];){
			var $tagSingle = $(tagSingle);
			if ($tagSingle.attr('class') === tagName) {
				$('#animContent').append($tagSingle.parent());
				$(this).addClass('active');
			}
		}
	}

	function searchShow(){
		 var inputValue = $('#search').text();
		console.log(inputValue);
		var tagAry = $('.anim h2[id]');
		$('#animContent').empty();
		for(var i = 0 , tagSingle ; tagSingle = tagAry[i++];){
			var $tagSingle = $(tagSingle);
			if ($tagSingle.text() === inputValue) {
				$('#animContent').append($tagSingle.parent());
			}
		}

	}


	function collect(){
		var $title = $('#title').text();
		console.log($title);

		User.findById(req.params.id, function (err, user) {
			if (err) return next(err);

			var collect = new Collect({content: $title});
			collect.save(function (err, collcurr) {
				if (err) return next(err);

				user.collects.push(collcurr);
				user.save(function (err, post) {
					if (err) return next(err);

				});
			});
		});


	}
 });


