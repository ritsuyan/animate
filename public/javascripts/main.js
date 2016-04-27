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
 });


/*
*   设计用户注册登陆模型，必须设置第三方比如微博登陆
* 	构建新建动画模型，用户添加新动画后必须通过tag访问
*   进入详情页后，可以发表评论，收藏，喜欢等功能。
* 	考虑中:评论社交功能，关注其他用户，私信。
*/