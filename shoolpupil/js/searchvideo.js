/* Sass Document */

var s_word  = "";
var s_nowpage = 2;
var s_isAjax = true;

function searchSchoolVideo() {
	var storage = window.localStorage;
	s_word = storage.getItem('word');
	//alert(s_word);
	$.ajax({
		type: 'POST',
		xhrFields: {
			withCredentials: true
		},
		data: {
			'title': s_word,
			'currentPage': "1",
			'amount': "12"
		},
		url: 'http://www.flyingsnowman.xin/pupil/videos/titleInquireVideos',
		success: function (result) {	
			if (result.listSize != null) {
				for (var i = 0; i < result.listSize; i++) {
					//alert('ha');
					//console.log(result.videosExtend[i].videoPath);
					CreateTypeVideoDiv('s_searchVideo', result.videosExtendList[i].video_id, result.videosExtendList[i].user_id, 
						result.videosExtendList[i].title, result.videosExtendList[i].category, result.videosExtendList[i].uploadTime, 
						result.videosExtendList[i].videoPath, result.videosExtendList[i].imgPath, result.videosExtendList[i].likeCnt, 
						result.videosExtendList[i].likeInfo, result.videosExtendList[i].reportInfo, result.videosExtendList[i].reportCnt);
				}		
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.alertable.alert('网页异常！', {
				show: function() {
					$(this.overlay).velocity('transition.fadeIn');
					$(this.modal).velocity('transition.flipBounceYIn');
				},
				hide: function() {
					$(this.overlay).velocity('transition.fadeOut');
					$(this.modal).velocity('transition.perspectiveUpOut');
				}
			});
		}
	});
}


/*滚轮检测*/
$(document).ready(function () {
	$(window).scroll(function () {
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if ((scrollTop + windowHeight)/scrollHeight >= 0.99) {
			//alert("you are in the bottom");
			if (s_isAjax) {
				s_isAjax = false;
				$("#loading").show();
				
				$.ajax({
					type: 'POST',
					xhrFields: {
						withCredentials: true
					},
					data: {
						'title': s_word,
						'currentPage': s_nowpage,
						'amount': "12"
					},
					url: 'http://www.flyingsnowman.xin/pupil/videos/titleInquireVideos',
					success: function (result) {	
						if (result.listSize != null) {
							$("#loading").hide();
							if (result.listSize > 0)
								s_nowpage++;
							for (var i = 0; i < result.listSize; i++) {
								//console.log(result.videosExtend[i].videoPath);
								CreateTypeVideoDiv('s_searchVideo', result.videosExtendList[i].video_id, result.videosExtendList[i].user_id, 
									result.videosExtendList[i].title, result.videosExtendList[i].category, result.videosExtendList[i].uploadTime, 
									result.videosExtendList[i].videoPath, result.videosExtendList[i].imgPath, result.videosExtendList[i].likeCnt, 
									result.videosExtendList[i].likeInfo, result.videosExtendList[i].reportInfo, result.videosExtendList[i].reportCnt);
							}		
						}
						s_isAjax = true;
					},
					error: function (jqXHR, textStatus, errorThrown) {
						$.alertable.alert('网页异常！', {
							show: function() {
								$(this.overlay).velocity('transition.fadeIn');
								$(this.modal).velocity('transition.flipBounceYIn');
							},
							hide: function() {
								$(this.overlay).velocity('transition.fadeOut');
								$(this.modal).velocity('transition.perspectiveUpOut');
							}
						});
						s_isAjax = true;
					}
				});
			}			
		}
	});
});
