// JavaScript Document

var p_nowpage = 2;
var p_isAjax = true;

var p_videoid = 0;
var p_userid = 0;

<!--滚轮检测-->
$(document).ready(function () {
	$("#ckportfolio").scroll(function () {
		var $this = $(this);
		clientHeight = $(this).height();                //可见高度
		offsetHeight = $(this).get(0).scrollHeight;     //内容高度
		scrollTop = $(this).scrollTop();                //滚动高度
		if (scrollTop / (offsetHeight - clientHeight) >= 0.99) {
			if (p_isAjax) {
				p_isAjax = false;
				$("#loading").show();
				$.ajax({
					type: 'POST',
					xhrFields: {
						withCredentials: true
					},
					data: data1 = {
						'currentPage': p_nowpage,
						'amount': "12",
						'category': ""
					},
					url: 'http://www.flyingsnowman.xin/pupil/videos/personalVideos',
					success: function (result) {
						$("#loading").hide();
						if (result.listSize > 0)
							p_nowpage++;
						if (result.listSize != null) {
							for (var i = 0; i < result.listSize; i++) {
								CreateMyVideoDiv('m_myVideoId', result.videosExtend[i].video_id, result.videosExtend[i].user_id, 
									result.videosExtend[i].title, result.videosExtend[i].category, result.videosExtend[i].uploadTime, 
									result.videosExtend[i].videoPath, result.videosExtend[i].imgPath, result.videosExtend[i].likeCnt, 
									result.videosExtend[i].likeInfo, result.videosExtend[i].reportInfo, result.videosExtend[i].browseCnt);
							}		
						}
						
						p_isAjax = true;
					},
					error: function (jqXHR, textStatus, errorThrown) {		
						$("#p_delFileError").html("网络异常！").show();
						setTimeout(function(){$("#p_delFileError").hide();}, 3000);
						p_isAjax = true;
					}
				});	
			}
			
		}
	});
});

<!--视频删除-->
function DelMyVideo(user_id, video_id){
	p_userid = user_id;
	p_videoid = video_id;
	var $modal = $('#delModal');
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

function p_yesfun() {
	$.ajax({
		type: 'POST',
		xhrFields: {
			withCredentials: true
		},
		data: data1 = {
			'user_id': p_userid,
			'video_id': p_videoid
		},
		url: 'http://www.flyingsnowman.xin/pupil/videos/deleteVideo',
		success: function (result) {
			if (result.info == 1) {
				$("#p_delFileRight").html("删除成功！请刷新页面！").show();
				setTimeout(function(){$("#p_delFileRight").hide();}, 3000);
				//window.location.reload();
			}
			else {
				$("#p_delFileError").html("删除失败!请重新尝试！").show();
				setTimeout(function(){$("#p_delFileError").hide();}, 3000);
			}
			$("#p_guanbi").click();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$("#p_delFileError").html("网络异常！").show();
			setTimeout(function(){$("#p_delFileError").hide();}, 3000);
			$("#p_guanbi").click();
		}
	});
}

<!-- 图片裁剪-->
$(function(){
    var $uploadCrop;
	var ImgBase64;

    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                });
                $('.upload-demo').addClass('ready');
            }

            reader.readAsDataURL(input.files[0]);
        }
        else {
            //alert("Sorry - you're browser doesn't support the FileReader API");
			$.alertable.alert('请选择图片或更换浏览器！', {
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
	$uploadCrop = $('#upload-demo').croppie({
		viewport: {
			width: 300,
			height: 300,
			//type: 'circle'
			type:'square'
		},
		boundary: {
			width: 330,
			height: 330
		}
	});
    $('#upload').on('change', function () {
        readFile(this);
    });
    $('.upload-result').on('click', function (ev) {
		$("#p_sendImg").attr('disabled', false);
        $uploadCrop.croppie('result', 'canvas').then(function (resp) {
            popupResult({
                src: resp
            });
        });
    });

    function popupResult(result) {
        var html;
        if (result.html) {
            html = result.html;
        }
        if (result.src) {
			ImgBase64 = result.src;
			$("#p_changeimg").attr("src", result.src);
        }
    }
	
	$('#p_sendImg').on('click', function (ev) {
		/*构建formData*/
		$("#p_sendImg").attr('disabled', true);
		$("#p_sendRight").html("头像上传中，请稍等！").show();
		var blob = dataURItoBlob(ImgBase64); 
		var canvas = document.createElement('canvas');
		var dataURL = canvas.toDataURL('image/jpeg', 0.5);
		var fd = new FormData(document.forms[0]);
		fd.append("picture", blob, 'image.jpg');
	
		$.ajax({
			type: "POST",
			xhrFields: {
				withCredentials: true
			},
			url: 'http://www.flyingsnowman.xin/pupil/user/modifyPicture',
			data: fd,
			contentType: false,
			processData: false,
			success: function (data) {
				$("#p_sendRight").hide();
				if (data.message == 0) {
					$("#p_sendError").html("请先登录！").show();
					return false;
				}
				if (data.info == 0) {
					$("#p_sendError").html("头像修改失败！").show();
					setTimeout(function(){$("#p_sendError").hide();}, 3000);
				}
				else if (data.info == 1) {
					$("#p_sendRight").html("头像修改成功！").show();
					setTimeout(function(){$("#p_sendRight").hide();}, 3000);
					var nowimg = document.getElementById("p_faceinfo");
					var changeimg = document.getElementById("p_changeimg");
					nowimg.src = changeimg.src;
				}
				$("#p_sendImg").attr('disabled', false);
			},
			error: function () {
				$("#p_sendRight").hide();
				$("#p_sendError").html("无法上传,请选择小于5M的图片！").show();
				setTimeout(function(){$("#p_sendError").hide();}, 3000);
				$("#p_sendImg").attr('disabled', false);
			}
		});
	});
	
	/*预处理以后转换成Blob对象*/
	function dataURItoBlob(base64Data) {
		var byteString;
		if (base64Data.split(',')[0].indexOf('base64') >= 0)
			byteString = atob(base64Data.split(',')[1]);
		else
			byteString = unescape(base64Data.split(',')[1]);
		var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ia], {type:mimeString});
	}
});

