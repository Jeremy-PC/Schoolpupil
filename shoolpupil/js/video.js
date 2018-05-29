/**
 * Created by Jeremy on 2017/11/1.
 */

var storage=window.localStorage;
var strvideo = storage.getItem("video");
var strimg = storage.getItem("img");
var videoid = storage.getItem("video_id");
var likeCnt = storage.getItem("likeCnt");
var likeInfo = storage.getItem("likeInfo");
var reportInfo = storage.getItem("reportInfo");
var browseCnt = storage.getItem("browseCnt");
var faceImg = '';
var myName = '';
//alert(browseCnt);

(function($) {
    var videoObject = {
        container: '.video',								//“#”代表容器的ID，“.”或“”代表容器的class
        variable: 'player',									//该属性必需设置，值等于下面的new chplayer()的对象
        flashplayer:false,                                 //如果强制使用flashplayer则设置成true
        mobileCkControls:true,                             //是否在移动端（包括ios）环境中显示控制栏
        poster: strimg,										//封面图片
        video: {
        	file: strvideo,                                 //视频地址
            type:'video/mp4',
        }
    };
    var player=new ckplayer(videoObject);

	//获取视频最新状态
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: data1 = {
			'video_id': videoid
		},
        url: 'http://www.flyingsnowman.xin/pupil/videos/video_idInquireVideos',
        success: function (result) {
			if (result.info == 1) {
				$("#v_browseCnt").text(result.videosExtend.browseCnt);
				$("#v_likeCnt").text(result.videosExtend.likeCnt);

				//添加视频的浏览举报和点赞
				if (result.videosExtend.likeInfo == 1) {		
					$("#LikeImg").attr("src", "../img/icon/RedDot.png");
				}

				if (result.videosExtend.reportInfo == 1) {
					$("#ReportImg").attr("src", "../img/icon/RedReport.png");
				}		
			} else {
				$("#v_browseCnt").text(browseCnt);
				$("#v_likeCnt").text(likeCnt);

				//添加视频的浏览举报和点赞
				if (likeInfo == 1) {		
					$("#LikeImg").attr("src", "../img/icon/RedDot.png");
				}

				if (reportInfo == 1) {
					$("#ReportImg").attr("src", "../img/icon/RedReport.png");
				}	
			}						
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#v_browseCnt").text(browseCnt);
			$("#v_likeCnt").text(likeCnt);

			//添加视频的浏览举报和点赞
			if (likeInfo == 1) {		
				$("#LikeImg").attr("src", "../img/icon/RedDot.png");
			}

			if (reportInfo == 1) {
				$("#ReportImg").attr("src", "../img/icon/RedReport.png");
			}	
        }
    });	
	
	//添加浏览量
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: data1 = {
			'video_id': videoid
		},
        url: 'http://www.flyingsnowman.xin/pupil/videos/addBrowse',
        success: function (result) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("网络异常!");
            $.alertable.alert('网络异常！', {
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
	
	/*获取一级评论*/
	$.ajax({
		type: 'GET',
        xhrFields: {
            withCredentials: true
        },
        url: 'http://www.flyingsnowman.xin/pupil/comment/inquireComments/'+videoid+'/1/6',
        success: function (result) {
			//alert(result.commentsExtendList[0].creatTime);
			var comtime;
			for (var i = result.listSize - 1; i >= 0 ; i--) {
				result.commentsExtendList[i].commentId;
				result.commentsExtendList[i].videoId;
				result.commentsExtendList[i].userId;
				result.commentsExtendList[i].text;
				comtime = result.commentsExtendList[i].creatTime;
				result.commentsExtendList[i].userName;
				result.commentsExtendList[i].picture;
				result.commentsExtendList[i].replyCnt;
				result.commentsExtendList[i].commentInfo;
				
				var myDate = new Date(comtime);
				//获取当前年
				var year=myDate.getFullYear();
				//获取当前月
				var month=myDate.getMonth()+1;
				//获取当前日
				var date=myDate.getDate();
				var h=myDate.getHours();       //获取当前小时数(0-23)
				var m=myDate.getMinutes();     //获取当前分钟数(0-59)
				if(m<10) m = '0' + m;
				var s=myDate.getSeconds();
				if(s<10) s = '0' + s;
				var now = year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
								  
				//动态创建评论模块
				oHtml = '<div class="comment-show-con clearfix"><div class="comment-show-con-img pull-left"><img src='+result.commentsExtendList[i].picture+' class="img-circle img-responsive center-block" alt=""></div><div class="comment-show-con-list pull-left clearfix"><div class="pl-text clearfix"><span class="comment-size-name">'+result.commentsExtendList[i].userName+' : </span><span class="my-pl-con">'+result.commentsExtendList[i].text+'</span><span class="v_comment" style="display: none">'+result.commentsExtendList[i].commentId+'</span><span class="v_aimUser" style="display: none">'+result.commentsExtendList[i].userId+'</span></div><div class="date-dz"><span class="date-dz-left pull-left comment-time">'+now+'</span><div class="date-dz-right pull-right comment-pl-block"><a href="javascript:;" class="removeBlock one-remove" style="text-decoration: none;">删除</a><span class="pull-left date-dz-line">|</span><a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" style="text-decoration: none;">回复</a></div></div></div><div class="col-lg-offset-1 col-lg-11 col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-1 col-xs-11 clearfix" style="margin-top: 10px;"><span class="nowPage" style="display:none">1</span>';
				if (result.commentsExtendList[i].replyCnt == 0) {
					oHtml += '<a class="more" href="javascript:;" style="text-decoration: none; display:none;">还有'+result.commentsExtendList[i].replyCnt+'条回复</a></div></div>';
				} else {
					oHtml += '<a class="more" href="javascript:;" style="text-decoration: none;">还有'+result.commentsExtendList[i].replyCnt+'条回复</a></div></div>';
				}
				
				
				$("#comment_show").prepend(oHtml);
			}	
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
	});

	/*检测是否登陆*/
	$.ajax({
		type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        url: 'http://www.flyingsnowman.xin/pupil/user/gain',
        success: function (result) {
            if (result.id == null) {
				$("#login").show();
				$(".register").show();
            }else{
                $("#v_quitLogin").show();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#login").show();
            $(".register").show();
        }
	});


})(jQuery);

function addReport() {
	var $modal = $('#reportModal');
	$modal.modal({backdrop: 'static'});
	
	// 测试 bootstrap 居中
    $modal.on('show.bs.modal', function(){
        var $this = $(this);
        var $modal_dialog = $this.find('.modal-dialog');
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $this.css('display', 'block');
        $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
    });
}

/*$(function(){
    // dom加载完毕
    var $m_btn = $('#report');
    var $modal = $('#reportModal');
    $m_btn.on('click', function(){
        $modal.modal({backdrop: 'static'});
    });

    // 测试 bootstrap 居中
    $modal.on('show.bs.modal', function(){
        var $this = $(this);
        var $modal_dialog = $this.find('.modal-dialog');
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $this.css('display', 'block');
        $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
    });

});*/


function v_yesfun() {
	$.ajax({
		type: 'POST',
		xhrFields: {
			withCredentials: true
		},
		data: data1 = {
			'video_id': videoid
		},
		url: 'http://www.flyingsnowman.xin/pupil/videos/addReport',
		success: function (result) {
			if (result.info == 1) {
				$("#ReportImg").attr("src", "../img/icon/RedReport.png");
			}
			if (result.info == 0) {
				$.alertable.alert('不能重复举报！', {
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
			$("#guanbireport").click();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.alertable.alert('网络异常！', {
				show: function() {
					$(this.overlay).velocity('transition.fadeIn');
					$(this.modal).velocity('transition.flipBounceYIn');
				},
				hide: function() {
					$(this.overlay).velocity('transition.fadeOut');
					$(this.modal).velocity('transition.perspectiveUpOut');
				}
			});
			$("#guanbireport").click();
		}
	});	
}

function addLike() {
	//alert("喜欢");
	//alert(likeInfo);
	if (likeInfo == 0) {
		$.ajax({
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			data: data1 = {
				'video_id': videoid
			},
			url: 'http://www.flyingsnowman.xin/pupil/videos/addLike',
			success: function (result) {	
				if (result.info == 1) {
					$("#LikeImg").attr("src", "../img/icon/RedDot.png");
					$("#v_likeCnt").text(parseInt(likeCnt)+1);
				}
				else {
					$.alertable.alert('不能重复点赞！', {
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
			},
			error: function (jqXHR, textStatus, errorThrown) {
				// alert("网络异常!");
                $.alertable.alert('网络异常！', {
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
	else if (likeInfo == 1) {
		$.alertable.alert('不能重复点赞！', {
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
}

function addBrowse() {
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: data1 = {
			'video_id': videoid
		},
        url: 'http://www.flyingsnowman.xin/pupil/videos/addBrowse',
        success: function (result) {

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.alertable.alert('网络异常！', {
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

function UserStatus(reqType) {
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        url: 'http://www.flyingsnowman.xin/pupil/user/gain',
        success: function (result) {
            if (result.id != null) {
				if (reqType == '点赞') {
					addLike();
				} else {
					addReport();
				}
            } else {
                $.alertable.alert('请先登录！', {
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
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

/*获取更多的回复*/
$('.commentAll').on('click','.more',function(){
	var commentid = $(this).parents('.col-lg-offset-1').siblings('.comment-show-con-list').children('.pl-text').children('.v_comment').text();
	var replayarea = $(this).parents('.col-lg-offset-1').siblings('.comment-show-con-list');	//回复区
	var This = $(this);
	var num = This.text();
	var page = $(this).siblings('.nowPage');
	var twoReplayPage = page.text();
	//alert(twoReplayPage);
	if (twoReplayPage == 1) {
		//清空目前动态创建的回复块
		 $(this).parents('.col-lg-offset-1').siblings('.comment-show-con-list').find('.hf-list-con').remove();
	}
	
	$.ajax({
		type: 'GET',
		xhrFields: {
			withCredentials: true
		},
		url: 'http://www.flyingsnowman.xin/pupil/comment/inquireReplys/'+commentid+'/'+twoReplayPage+'/6',
		success: function (result) {
			if (result.listSize > 0) {
				page.text(parseInt(twoReplayPage)+1);
				for (var i = 0; i < result.listSize; i++) {
					//alert(result.replysExtendList[i].commentId);
					var myDate = new Date(result.replysExtendList[i].creatTime);
					//获取当前年
					var year=myDate.getFullYear();
					//获取当前月
					var month=myDate.getMonth()+1;
					//获取当前日
					var date=myDate.getDate();
					var h=myDate.getHours();       //获取当前小时数(0-23)
					var m=myDate.getMinutes();     //获取当前分钟数(0-59)
					if(m<10) m = '0' + m;
					var s=myDate.getSeconds();
					if(s<10) s = '0' + s;
					var now = year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
					//动态创建回复模块
					oHtml = '<div class="hf-list-con"><div class="pl-text clearfix"><span class="comment-size-name">'+result.replysExtendList[i].userName+'： </span><span class="comment-size">回复@</span><span class="comment-size-name">'+result.replysExtendList[i].aimUserName+'：</span><span class="my-pl-con">'+result.replysExtendList[i].text+'</span></div><div class="date-dz"><span class="userId" style="display: none">'+result.replysExtendList[i].userId+'</span><span class="replayid" style="display: none">'+result.replysExtendList[i].replyId+'</span><span class="date-dz-left pull-left comment-time">'+now+'</span><div class="date-dz-right pull-right comment-pl-block"><a href="javascript:;" class="removeBlock two-remove" style="text-decoration: none;">删除</a><span class="pull-left date-dz-line">|</span><a href="javascript:;" class="date-dz-pl hf-con-block pull-left" style="text-decoration: none;">回复</a></div></div></div>';
					replayarea.append(oHtml);
				}
				//if (result.listSize < 6)
				//	This.text('回复以全部加载');

				//alert(num.replace(/[^0-9]/ig,""));
				var residue = num.replace(/[^0-9]/ig,"") - result.listSize;
				//alert(residue);
				if (residue == 0) {
					This.text('回复以全部加载');
				} else {
					This.text('还有'+residue+'条回复');
				}
			} else if(result.listSize == 0) {
				This.text('回复以全部加载');
			}
		},
		error: function () {
		}
	});
});

//
//评论模块 发送一级评论
//
var v_flag = true;
function sendComment() {
	//sendData();
	if (v_flag == true) {
		v_flag = false;
		$.ajax({
			type: 'POST',
			xhrFields: {
				withCredentials: true
			},
			url: 'http://www.flyingsnowman.xin/pupil/user/gain',
			success: function (result) {

				if (result.id == null) {
					$.alertable.alert('请先登录！', {
						show: function() {
							$(this.overlay).velocity('transition.fadeIn');
							$(this.modal).velocity('transition.flipBounceYIn');
						},
						hide: function() {
							$(this.overlay).velocity('transition.fadeOut');
							$(this.modal).velocity('transition.perspectiveUpOut');
						}
					});
				} else {
					faceImg = result.picture;
					myName = result.userName;
					sendData();
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
			}
		});
		setTimeout('v_flag=true', 2000);
	} else {
		$.alertable.alert('操作频率过高！', {
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
	
}

function sendData() {
	var myDate = new Date();
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	//获取当前日
	var date=myDate.getDate();
	var h=myDate.getHours();       //获取当前小时数(0-23)
	var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	if(m<10) m = '0' + m;
	var s=myDate.getSeconds();
	if(s<10) s = '0' + s;
	var now = year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
	//评论框内容
	var comdata = $("#v_commentdata").val();
	
	if (comdata == '') {
		$.alertable.alert('评论不能为空！', {
			show: function() {
				$(this.overlay).velocity('transition.fadeIn');
				$(this.modal).velocity('transition.flipBounceYIn');
			},
			hide: function() {
				$(this.overlay).velocity('transition.fadeOut');
				$(this.modal).velocity('transition.perspectiveUpOut');
			}
		});
		return;
	}
	//console.log(comdata);	
	
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
		data: {
			'videoId': videoid,
			'text': comdata
		},
        url: 'http://www.flyingsnowman.xin/pupil/comment/addComment',
        success: function (result) {
			//alert(result.info);
			if (result.info == 1) {
				//动态创建评论模块
				oHtml = '<div class="comment-show-con clearfix"><div class="comment-show-con-img pull-left"><img src='+faceImg+' class="img-responsive center-block" alt=""></div><div class="comment-show-con-list pull-left clearfix"><div class="pl-text clearfix"><span class="comment-size-name">'+myName+'  ： </span><span class="my-pl-con">'+comdata+'</span><span class="v_comment" style="display: none">'+result.commentId+'</span><span class="v_aimUser" style="display: none">'+result.userId+'</span></div><div class="date-dz"><span class="date-dz-left pull-left comment-time">'+now+'</span><div class="date-dz-right pull-right comment-pl-block"><a href="javascript:;" class="removeBlock one-remove" style="text-decoration: none;">删除</a><span class="pull-left date-dz-line">|</span><a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" style="text-decoration: none;">回复</a></div></div></div></div>';

				if(comdata.replace(/(^\s*)|(\s*$)/g, "") != ''){
					$("#comment_show").prepend(oHtml);
					$("#v_commentdata").val('');
				}
			}
			
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

//点击回复动态创建回复块
$('.comment-show').on('click','.date-dz-pl',function(){
	//获取回复人的名字
	//var fhName = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').html();
	//回复@
	//var fhN = '回复@'+fhName;
	//$("#date_dz").prepend('<div>hello</div>');
	//$("#date_dz").append('<div>hello</div>');
	
	if ($(this).text() == '回复'){
		$(this).text('关闭');
	} else {
		$(this).text('回复');
	}
	
	var fhHtml = '<div class="from"><div class="form-group clearfix"><textarea id="textare" class="form-control text" rows="3" id="text" placeholder="请输入评论文本内容...."></textarea><div class="col-lg-offset-9 col-lg-3 col-md-offset-9 col-md-3 col-sm-offset-8 col-sm-4 col-xs-offset-8 col-xs-4" style="margin-top: 10px;"><button class="btn btn-danger btn-block">回复</button></div></div></div>';
	//显示回复
	if($(this).is('.hf-con-block')){
		$(this).parents('.date-dz-right').parents('.date-dz').append(fhHtml);
		$(this).removeClass('hf-con-block');			//回复控件 class
		$('.form-control').flexText();
	}else {
		$(this).addClass('hf-con-block');
		$(this).parents('.date-dz-right').siblings('.from').remove();
	}
});

//创建回复信息
$('.comment-show').on('click', '.btn-danger', function() {
	var myDate = new Date();
	//获取当前年
	var year=myDate.getFullYear();
	//获取当前月
	var month=myDate.getMonth()+1;
	//获取当前日
	var date=myDate.getDate();
	var h=myDate.getHours();       //获取当前小时数(0-23)
	var m=myDate.getMinutes();     //获取当前分钟数(0-59)
	if(m<10) m = '0' + m;
	var s=myDate.getSeconds();
	if(s<10) s = '0' + s;
	var now = year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
	//评论框内容
	
	//alert(this.className);
	if ($(this).is('.btn-danger')) {
		var replayArea = $(this).parents('.col-lg-offset-9').parents('.form-group').children('.form-control');
		var reply = $(this).parents('.col-lg-offset-9').parents('.form-group').children('.form-control').val();	//获取回复消息
		if (reply == '') {
			$.alertable.alert('回复不能为空！', {
                show: function() {
                    $(this.overlay).velocity('transition.fadeIn');
                    $(this.modal).velocity('transition.flipBounceYIn');
                },
                hide: function() {
                    $(this.overlay).velocity('transition.fadeOut');
                    $(this.modal).velocity('transition.perspectiveUpOut');
                }
            });
			return;
		}
			
		var commentId = $(this).parents('.col-lg-offset-9').parents('.form-group').parents('.from').parents('.comment-show-con-list').children('.pl-text').children('.v_comment').text();
		var aimUserId = $(this).parents('.col-lg-offset-9').parents('.form-group').parents('.from').parents('.comment-show-con-list').children('.pl-text').children('.v_aimUser').text();

		//获取回复区
		var replyArea = $(this).parents('.col-lg-offset-9').parents('.form-group').parents('.from').parents('.comment-show-con-list');
		//被回复人的名字
		var otherName = $(this).parents('.col-lg-offset-9').parents('.form-group').parents('.from').parents('.comment-show-con-list').children('.pl-text').children('.comment-size-name').text();
		
		if (v_flag == true) {
			v_flag = false;
			$.ajax({
				type: 'POST',
				xhrFields: {
					withCredentials: true
				},
				url: 'http://www.flyingsnowman.xin/pupil/user/gain',
				success: function (result) {
					if (result.id == null) {
						$.alertable.alert('请先登录！', {
							show: function() {
								$(this.overlay).velocity('transition.fadeIn');
								$(this.modal).velocity('transition.flipBounceYIn');
							},
							hide: function() {
								$(this.overlay).velocity('transition.fadeOut');
								$(this.modal).velocity('transition.perspectiveUpOut');
							}
						});
					} else {
						var username = result.userName;
						$.ajax({
							type: 'POST',
							xhrFields: {
								withCredentials: true
							},
							data: {
								'commentId': commentId,
								'aimUserId': aimUserId,
								'text': reply
							},
							url: 'http://www.flyingsnowman.xin/pupil/comment/addReply',
							success: function (result) {
								if (result.info == 1) {
									oHtml = '<div class="hf-list-con"><div class="pl-text clearfix"><span class="comment-size-name">'+username+' </span><span class="comment-size">回复@</span><span class="comment-size-name">'+otherName+'</span><span class="my-pl-con">'+reply+'</span></div><div class="date-dz"><span class="userId" style="display: none">'+result.userId+'</span><span class="replayid" style="display: none">'+result.replyId+'</span><span class="date-dz-left pull-left comment-time">'+now+'</span><div class="date-dz-right pull-right comment-pl-block"><a href="javascript:;" class="removeBlock two-remove" style="text-decoration: none;">删除</a><span class="pull-left date-dz-line">|</span><a href="javascript:;" class="date-dz-pl hf-con-block pull-left" style="text-decoration: none;">回复</a></div></div></div>';	
									replyArea.append(oHtml);

									//发送成功后清空回复框
									replayArea.val('');
								}
							},
							error: function (jqXHR, textStatus, errorThrown) {
							}		
						});
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
				}
			});	
			setTimeout('v_flag=true', 2000);
		} else {
			$.alertable.alert('操作频率过高！', {
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
			
	}
});

//删除评论块
/*$('.commentAll').on('click','.removeBlock',function(){	
	var oT = $(this).parents('.date-dz-right').parents('.date-dz').parents('.all-pl-con');
	if(oT.siblings('.all-pl-con').length >= 1){
		oT.remove();
	}else {
		$(this).parents('.date-dz-right').parents('.date-dz').parents('.all-pl-con').parents('.hf-list-con').css('display','none')
		oT.remove();
	}
	$(this).parents('.date-dz-right').parents('.date-dz').parents('.comment-show-con-list').parents('.comment-show-con').remove();

})*/
/*删除一级评论*/
$('.commentAll').on('click','.one-remove',function(){	
	var commid = $(this).parents('.date-dz-right').parents('.date-dz').parents('.comment-show-con-list').children('.pl-text').children('.v_comment').text();
	var userid = $(this).parents('.date-dz-right').parents('.date-dz').parents('.comment-show-con-list').children('.pl-text').children('.v_aimUser').text();
	
	var delreplay = $(this).parents('.date-dz-right').parents('.date-dz').parents('.comment-show-con-list').parents('.comment-show-con');
	
	$.ajax({
		type: 'POST',
		xhrFields: {
			withCredentials: true
		},
		data: {
			'userId': userid,
			'commentId': commid
		},
		url: 'http://www.flyingsnowman.xin/pupil/comment/deleteComment',
		success: function (result) {
			if (result.info == 1) {
				delreplay.remove();
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
		}		
	});
})

/*删除二级评论*/
$('.commentAll').on('click','.two-remove',function(){
	//alert("two");
	var userid = $(this).parents('.date-dz-right').siblings('.userId').text();
	var replyid = $(this).parents('.date-dz-right').siblings('.replayid').text();
	var delreplay = $(this).parents('.date-dz-right').parents('.date-dz').parents('.hf-list-con');
	
	//alert(userid);
	//alert(replyid);
	
	$.ajax({
		type: 'POST',
		xhrFields: {
			withCredentials: true
		},
		data: {
			'userId': userid,
			'replyId': replyid
		},
		url: 'http://www.flyingsnowman.xin/pupil/comment/deleteReply',
		success: function (result) {
			if (result.info == 1) {
				delreplay.remove();
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
		}		
	});	
})

var isAjax = true;
var v_page = 2;
/*滚轮检测*/
$(document).ready(function () {
	$(window).scroll(function () {
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(document).height();
		var windowHeight = $(this).height();
		if ((scrollTop + windowHeight)/scrollHeight >= 0.99) {
			if (isAjax) {
				isAjax = false;		
				$("#loading").show();
				$.ajax({
					type: 'GET',
					xhrFields: {
						withCredentials: true
					},
					url: 'http://www.flyingsnowman.xin/pupil/comment/inquireComments/'+videoid+'/'+v_page+'/6',
					success: function (result) {
						$("#loading").hide();
						if (result.listSize > 0) {
							v_page++;
						}
						//alert(result.commentsExtendList[0].creatTime);
						var comtime;
						for (var i = 0; i < result.listSize ; i++) {
							result.commentsExtendList[i].commentId;
							result.commentsExtendList[i].videoId;
							result.commentsExtendList[i].userId;
							result.commentsExtendList[i].text;
							comtime = result.commentsExtendList[i].creatTime;
							result.commentsExtendList[i].userName;
							result.commentsExtendList[i].picture;
							result.commentsExtendList[i].replyCnt;
							result.commentsExtendList[i].commentInfo;

							var myDate = new Date(comtime);
							//获取当前年
							var year=myDate.getFullYear();
							//获取当前月
							var month=myDate.getMonth()+1;
							//获取当前日
							var date=myDate.getDate();
							var h=myDate.getHours();       //获取当前小时数(0-23)
							var m=myDate.getMinutes();     //获取当前分钟数(0-59)
							if(m<10) m = '0' + m;
							var s=myDate.getSeconds();
							if(s<10) s = '0' + s;
							var now = year+'-'+month+"-"+date+" "+h+':'+m+":"+s;

							//动态创建评论模块
							oHtml = '<div class="comment-show-con clearfix"><div class="comment-show-con-img pull-left"><img src='+result.commentsExtendList[i].picture+' class="img-circle img-responsive center-block" alt=""></div><div class="comment-show-con-list pull-left clearfix"><div class="pl-text clearfix"><span class="comment-size-name">'+result.commentsExtendList[i].userName+' : </span><span class="my-pl-con">'+result.commentsExtendList[i].text+'</span><span class="v_comment" style="display: none">'+result.commentsExtendList[i].commentId+'</span><span class="v_aimUser" style="display: none">'+result.commentsExtendList[i].userId+'</span></div><div class="date-dz"><span class="date-dz-left pull-left comment-time">'+now+'</span><div class="date-dz-right pull-right comment-pl-block"><a href="javascript:;" class="removeBlock one-remove" style="text-decoration: none;">删除</a><span class="pull-left date-dz-line">|</span><a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" style="text-decoration: none;">回复</a></div></div></div><div class="col-lg-offset-1 col-lg-11 col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-1 col-xs-11 clearfix" style="margin-top: 10px;"><span class="nowPage" style="display:none">1</span><a class="more" href="javascript:;" style="text-decoration: none;">还有'+result.commentsExtendList[i].replyCnt+'条回复</a></div></div>';
							
							$("#comment_show").append(oHtml);
						}
						isAjax = true;
					},
					error: function (jqXHR, textStatus, errorThrown) {
						isAjax = true
					}	
				});	
			}
			
		}
	});
});

/*
var videoObject = {
    container: '.video',//“#”代表容器的ID，“.”或“”代表容器的class
    variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
    poster:'../img/portfolio/1.jpg',//封面图片
    video:'http://ckplayer-video.oss-cn-shanghai.aliyuncs.com/ckplayer-sample/mydream_zh_768-432.mp4',//视频地址
    debug:true,//开启调试模式
    flashplayer: false, //是否需要强制使用flashplayer
};
var player=new ckplayer(videoObject);
*/

function dropOutFuntwo() {
    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        url: 'http://www.flyingsnowman.xin/pupil/user/quit',
        success: function (result) {
            if (result.info == 1) {
                // alert("退出成功!");
                $.alertable.alert('退出成功！', {
                    show: function() {
                        $(this.overlay).velocity('transition.fadeIn');
                        $(this.modal).velocity('transition.flipBounceYIn');
                    },
                    hide: function() {
                        $(this.overlay).velocity('transition.fadeOut');
                        $(this.modal).velocity('transition.perspectiveUpOut');
                        window.location.href = "../html/video.html";
                    }
                });
				/*$("#login").show();
				 $("#register").show();*/
                //OutButtonHide();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert("网页异常！");
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
