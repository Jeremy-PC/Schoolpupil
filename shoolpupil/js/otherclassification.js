// JavaScript Document

var o_nowpage = 2;
var isAjax = true;


<!--滚轮检测-->
$(document).ready(function () {
	$(window).scroll(function () {
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if ((scrollTop + windowHeight)/scrollHeight >= 0.99) {
			//alert("you are in the bottom");
			
			if (isAjax) {
				isAjax = false;
				
				$("#loading").show();
				$.ajax({
					type: 'POST',
					xhrFields: {
						withCredentials: true
					},
					data: data1 = {
						'currentPage': o_nowpage,
						'amount': "12",
						'university': "",
						'category': ""
					},
					url: 'http://www.flyingsnowman.xin/pupil/videos/loadMoreVideos',
					success: function (result) {
						//alert(result.listSize);		
						if (result.listSize != null) {
							$("#loading").hide();
							if (result.listSize > 0)
								o_nowpage++;
							for (var i = 0; i < result.listSize; i++) {
								CreateTypeVideoDiv('o_videoid3', result.videosExtend[i].video_id, result.videosExtend[i].user_id, 
									result.videosExtend[i].title, result.videosExtend[i].category, result.videosExtend[i].uploadTime, 
									result.videosExtend[i].videoPath, result.videosExtend[i].imgPath, result.videosExtend[i].likeCnt, 
									result.videosExtend[i].likeInfo, result.videosExtend[i].reportInfo, result.videosExtend[i].browseCnt);
							}		
						}
						
						isAjax = true;		//恢复初始态
					},
					error: function (jqXHR, textStatus, errorThrown) {
						// alert("网络异常!");
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
						isAjax = true;
					}
				});	
			}
			
		}
	});
});