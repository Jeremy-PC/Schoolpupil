// JavaScript Document


var f_nowpage = 2;
var f_isAjax = true;
var f_videotype  = "";

function GetOtherSchoolVideo() {
	var storage = window.localStorage;
	f_videotype  = storage.getItem("type");
	$("#f_othervideotype").text(f_videotype);
	GetTypeVideoFun(f_videotype, '', 'f_feelVideoId');
}

<!--滚轮检测-->
$(document).ready(function () {
	$(window).scroll(function () {
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if ((scrollTop + windowHeight)/scrollHeight >= 0.99) {
			//alert("you are in the bottom");
			if (f_isAjax) {
				f_isAjax = false;
				$("#loading").show();
				$.ajax({
					type: 'POST',
					xhrFields: {
						withCredentials: true
					},
					data: data1 = {
						'currentPage': f_nowpage,
						'amount': "12",
						'university': "",
						'category': f_videotype
					},
					url: 'http://www.flyingsnowman.xin/pupil/videos/loadMoreVideos',
					success: function (result) {		
						if (result.listSize != null) {
							$("#loading").hide();

							if (result.listSize > 0)
								f_nowpage++;
							for (var i = 0; i < result.listSize; i++) {
								CreateTypeVideoDiv('f_feelVideoId', result.videosExtend[i].video_id, result.videosExtend[i].user_id, 
									result.videosExtend[i].title, result.videosExtend[i].category, result.videosExtend[i].uploadTime, 
									result.videosExtend[i].videoPath, result.videosExtend[i].imgPath, result.videosExtend[i].likeCnt, 
									result.videosExtend[i].likeInfo, result.videosExtend[i].reportInfo, result.videosExtend[i].browseCnt);
							}		
						}
						f_isAjax = true;
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
						f_isAjax = true;
					}
				});
			}			
		}
	});
});