/* Sass Document */

var s_schoolname = "";
var s_videotype  = "";

function SchoolTypeVideo() {
	var storage = window.localStorage;
	var videotype = storage.getItem("type");
	$("#schoolVideoType").text(videotype);
	s_videotype = videotype;
	
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        url: 'http://www.flyingsnowman.xin/pupil/user/gain',
        success: function (result) {
            if (result.id != null) {
				s_schoolname = result.university;
				//获取视频
				GetTypeVideoFun(videotype, result.university, "schoolVideoId");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("网页链接出现异常！");
        }
    });
}

var s_nowpage = 2;
var s_isAjax = true;
<!--滚轮检测-->
$(document).ready(function () {
	$(window).scroll(function () {
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if ((scrollTop + windowHeight)/scrollHeight == 1) {
			//alert("you are in the bottom");
			if (s_isAjax) {
				s_isAjax = false;
				
				$("#loading").show();
				$.ajax({
					type: 'POST',
					xhrFields: {
						withCredentials: true
					},
					data: data1 = {
						'currentPage': s_nowpage,
						'amount': "12",
						'university': s_schoolname,
						'category': s_videotype
					},
					url: 'http://www.flyingsnowman.xin/pupil/videos/loadMoreVideos',
					success: function (result) {	
						if (result.listSize != null) {
							$("#loading").hide();
							if (result.listSize > 0)
								s_nowpage++;
							for (var i = 0; i < result.listSize; i++) {
								CreateTypeVideoDiv("schoolVideoId", result.videosExtend[i].video_id, result.videosExtend[i].user_id, 
									result.videosExtend[i].title, result.videosExtend[i].category, result.videosExtend[i].uploadTime, 
									result.videosExtend[i].videoPath, result.videosExtend[i].imgPath, result.videosExtend[i].likeCnt, 
									result.videosExtend[i].likeInfo, result.videosExtend[i].reportInfo, result.videosExtend[i].browseCnt);
							}			
						}
						
						s_isAjax = true;
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
						s_isAjax = true;
					}
				});	
			}
			
		}
	});
});
