/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });
	

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

})(jQuery); // End of use strict

/*弹出框*/
function remind(data) {
	$.alertable.alert(data, {
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

<!--检测邮箱格式-->
function checkEmail(data) {
	var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
	if (regex.test(data))
		return true;
	else
		return false;
}

<!--检测手机号-->
function checkPhone(data) {
	if (!(/^1(3|4|5|7|8)\d{9}$/.test(data)))
        return false;
	else
		return true;
}

<!--弹出框函数-->
function ShowMessage(data) {
	$.alertable.alert(data, {
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
	

<!--手机号验证-->
function phonefun() {
    var phnum = document.getElementById("user.phoneNumber2");
    //var data = document.getElementById("phoneInfo");
    if (phnum.value == "")
        return false;

    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phnum.value))) {
		$("#i_registerError").html("请规范手机号！").show();

        return false;
    }

    //data.innerHTML = "手机号注册过";
    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: phonNum = {'user.phoneNumber': phnum.value},
        url: 'http://www.flyingsnowman.xin/pupil/user/checkExist',
        success: function (result) {
            //alert(result.info);
            if (result.info == 0) {
				$("#i_registerError").html("手机已注册！").show();
            }
            else if (result.info == 1){
				$("#i_registerRight").html("手机号可用！").show();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("验证失败");
        }
    });
}
function phone1fun() {
    var phnum = document.getElementById("user.phoneNumber");
    //var data = document.getElementById("phone1Info");
    if (phnum.value == "")
        return false;
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phnum.value))) {
		$("#i_landError").html("请规范手机号！").show();

        return false;
    }
    data.innerHTML = "";
}

<!--验证码验证-->
function verifycodefun() {
    var code = document.getElementById("verifyCode");
    //var data = document.getElementById("codeInfo");
    if (code.value == "")
        return false;

    //alert(code.value);

    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: codeNum = {'verifyCode': code.value},
        //data: 'verifyCode=code.value',
        //data: $('#form_registration').serialize(),
        url: 'http://www.flyingsnowman.xin/pupil/user/verityVC',
        success: function (result) {
            //alert(result.vcInfo);
            if (result.vcInfo == 0) {
				$("#i_registerError").html("验证码错误！").show();
            }
            else if (result.vcInfo == 1){
				$("#i_registerRight").html("验证码正确！").show();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("传输出错!");
        }
    });

}

<!--登陆响应-->
$(function(){
    // dom加载完毕
    var $m_btn = $('#login');
    var $modal = $('#loginModal');
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
});
<!--登录弹出框，点击登录id为login 显示-->
function loginIn() {
    //if ($("#form_login").valid()) {
	var pass = document.getElementById("user.password");
	var phone = document.getElementById("user.phoneNumber");
	if (pass.value == "" || phone.value == "") {
		$("#i_landError").html("编辑框不能为空！").show();
		setTimeout(function(){$("#i_landError").hide();}, 3000);
		return false;
	}
	//alert(phone.value);
	//alert(pass.value);
	if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone.value)))
		return false;

	var pass2 = hex_md5(pass.value);

	$.ajax({
		type: 'POST',
		xhrFields: {
			withCredentials: true
		},
		data: $('#form_login').serialize(),
		data: data1 = {
			'user.password': pass2,
			'user.phoneNumber':phone.value
		},
		url: 'http://www.flyingsnowman.xin/pupil/user/login',
		success: function (result) {
			if (result.id != null) {
				//document.getElementById("guanbi").click();
				phone.value = "";
				$("#login").css('visibility', 'hidden');
				$(".register").css('visibility', 'hidden');
				$("#v_quitLogin").show();
				$("#guanbi").click();
				//OutButtonShow();			//退出按钮
			}
			else {
				$("#i_landError").html("登陆失败！").show();
			}
			pass.value = "";
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$("#i_landError").html("上传失败！").show();
		}
	});
    //}
}

function downeven(e) {
	var num;
	if (window.Event) {
		num = e.keyCode;
	} else if (e.which) {
		num = e.which;
	}	
	if (num == 13) {
		$("#i_login").click();
	}
}

function registereven(e) {
	var num;
	if (window.Event) {
		num = e.keyCode;
	} else if (e.which) {
		num = e.which;
	}
	if (num == 13) {
		$("#i_register").click();
	}
}


/*function OutButtonShow() {
 $("#dropOut").show();			//退出按钮
 $("#dropOut2").show();
 $("#dropOut3").show();
 $("#dropOut4").show();
 }

 function OutButtonHide() {
 $("#dropOut").hide();
 $("#dropOut2").hide();
 $("#dropOut3").hide();
 $("#dropOut4").hide();
 }*/

<!--个人注册响应-->
$(function(){
    // dom加载完毕
    var $m_btn = $('.register');
    var $modal = $('#registerModal');
    $m_btn.on('click', function(){
        $modal.modal({backdrop: 'static'});
        changeImg();
        $("#guanbi3").click();
        $("#guanbi4").click();
        $("#guanbi5").click();
        $("#guanbi6").click();
    });

    // 测试 bootstrap 居中
    $modal.on('show.bs.modal', function(){
        var $this = $(this);
        var $modal_dialog = $this.find('.modal-dialog');
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $this.css('display', 'block');
        $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
    });
});
<!--个人注册弹出框，点击注册id为register显示-->
function registerIn() {
    var schoolname = document.getElementById("user.university");
    var username = document.getElementById("user.userName");
    var phonenum = document.getElementById("user.phoneNumber2");
    var pass1 = document.getElementById("user.password2");
    var pass2 = document.getElementById("two_pass");
    var code = document.getElementById("verifyCode");


    if (schoolname.value == "" || username.value == "" || phonenum.value == ""
        || pass1.value == "" || pass2 == "" || code.value == "") {
		$("#i_registerError").html("输入框不能为空！").show();
		return false;
	}

    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phonenum.value)))
        return false;

    if (pass1.value != pass2.value) {
        var pasinfo = document.getElementById("passInfo");
		$("#i_registerError").html("两次输入的密码不一致！").show();
        return false;
    }
    var md5pass = hex_md5(pass1.value);
	
	//验证码验证
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: codeNum = {'verifyCode': code.value},
        url: 'http://www.flyingsnowman.xin/pupil/user/verityVC',
        success: function (result) {
            //alert(result.vcInfo);
            if (result.vcInfo == 0) {
				$("#i_registerError").html("验证码错误！").show();
            }
            else if (result.vcInfo == 1){
				$("#i_registerRight").html("验证码正确！").show();
				
				//注册响应
				$.ajax({
					type: 'POST',
					xhrFields: {
						withCredentials: true
					},
					url: 'http://www.flyingsnowman.xin/pupil/user/register',
					//data: $('#form_registration').serialize(),
					data: data2 = {
						'user.university': schoolname.value,
						'user.userName': username.value,
						'user.phoneNumber': phonenum.value,
						'user.password': md5pass,
						'verifyCode': code.value
					},
					success: function (result) {
						if (result.info == 1) {
							//$("#i_registerRight").html("注册成功！").show();
							//remind("注册成功！");
							schoolname.value = "";
							username.value = "";
							phonenum.value = "";
							code.value = "";
							$.alertable.alert("注册成功！", {
								show: function() {
									$(this.overlay).velocity('transition.fadeIn');
									$(this.modal).velocity('transition.flipBounceYIn');
								},
								hide: function() {
									$(this.overlay).velocity('transition.fadeOut');
									$(this.modal).velocity('transition.perspectiveUpOut');
									$("#guanbi2").click();
									$("#login").click();
								}
							});
							//setTimeout(function(){$("#guanbi2").click();}, 2000);
							//$("#guanbi2").click();
							//setTimeout(function(){$("#login").click();},2000);
							
						}
						pass1.value = "";
						pass2.value = "";
					},
					error: function (jqXHR, textStatus, errorThrown) {
						$("#i_registerError").html("上传失败！").show();
					}
				});
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#i_registerError").html("上传失败！").show();
        }
    });
}
function getInfoid(name, str) {
    if (name.value == "") {
        var pasinfo = document.getElementById(str);
		$("#i_registerError").html("输入框不能为空！").show();
    }
}


function checkmyphone(phoneid, err, right) {
	var phone = document.getElementById(phoneid).value;
	if (phone == "") {
		$("#"+err).html("手机号不能为空！").show();
	}
	if (!checkPhone(phone)) {
		$("#"+right).hide();
		$("#"+err).html("请检查手机号是否正确！").show();
	}
	else {
		$("#"+err).hide();
		$("#"+right).html("手机号格式正确！").show();
	}
}

function checkmyEmail(emailid, err, right) {
	var email = document.getElementById(emailid).value;
	if (email == "") {
		$("#"+err).html("邮箱不能为空！").show();
	}
	
	if (!checkEmail(email)) {
		$("#"+right).hide();
		$("#"+err).html("请检查邮箱格式是否正确！").show();
	}
	else {
		$("#"+err).hide();
		$("#"+right).html("邮箱格式正确！").show();
	}
}

<!--教师-->
function TeacherRegisterIn() {
	var schoolName = $("#i_teacherSchName").val();
	var Name = $("#i_teacherName").val();
	var phone = $("#i_teacherPhone").val();
	var pass = $("#i_teacherPass").val();
	var email = $("#i_teacherEmail").val();
	
	if (schoolName == "" || Name == "" || phone == "" || pass == "" || email == "")
		$("#i_teacherError").html("输入框不能为空！").show();
	
	if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone)))
        return false;
	var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
	if (!regex.test(email))
		return false;
	
	var md5pass = hex_md5(pass.value);
	
}
	
<!--企业-->
function CompanyRigisterIn() {
	var ComName = $("#i_CompanyName").val();
	var Email = $("#i_CompanyEmail").val();
	var place = $("#i_CompanyPlace").val();
	if (ComName == "" || Email == "" || place == "")
		$("#i_CompanyError").html("输入框不能为空！").show();
	if (!checkEmail(Email))
		return false;
	
	
}
	
<!--社团-->
function OrganizeRigisterIn() {
	var schoolName = $("#i_OrganizeSchoolName").val();
	var organizeName = $("#i_OrganizeName").val();
	var email = $("#i_OrganizeEmail").val();
	if (schoolName == "" || organizeName == "" || email == "")
		$("#i_OrganizeError").html("输入框不能为空！").show();
	if (!checkEmail(email))
		return false;
	
}
	
<!--学生会-->
function UnionRigisterIn() {
	var schoolName = $("#i_UnionSchoolName").val();
	var unionName = $("#i_UnionName").val();
	var email = $("#i_UnionEmail").val();
	if (schoolName == "" || unionName == "" || email == "")
		$("#i_UnionError").html("输入框不能为空！").show();
	if (!checkEmail(email))
		return false;
	
	
	
}

<!--获取焦点-->
function schoolfocus() {
	$("#i_registerError").hide();
}
function userfocus() {
	$("#i_registerError").hide();
}
function phonefocus() {
	$("#i_registerError").hide();
	$("#i_registerRight").hide();
}
function pass1focus() {
	$("#i_registerError").hide();
}
function passfocus() {
	$("#i_registerError").hide();
}
function codefocus() {
	$("#i_registerError").hide();
}
function phone1focus() {
	$("#i_landError").hide();
}
function p_passfocus() {
	$("#i_registerError").hide();
}

<!--修改验证码-->
function changeImg() {
    var code = document.getElementById("imgCheckNo");
    code.src = 'http://www.flyingsnowman.xin/pupil/user/getVerifyCode?tm='+Math.random();
}

<!--页面启动检测-->
function indexfun() {
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
            }
            else {
                $("#dropOut").show();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#login").show();
            $(".register").show();
            //alert("网页链接出现异常！");
        }
    });
	
	//获取视频
	GetHotVideoFun();
	GetTypeVideoFun("情感分享", "", "FeelVideoId");
	GetTypeVideoFun("衣食住行", "", "DailyVideoId");
	GetTypeVideoFun("校园风采", "", "FengcaiVideoId");
}
function personalfun() {
    var faceinfo = document.getElementById("p_faceinfo");
    var schoolname = document.getElementById("p_schoolname");
    var username = document.getElementById("p_username");
    var phone = document.getElementById("p_phonenum");
    var pass = document.getElementById("p_password");

    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        url: 'http://www.flyingsnowman.xin/pupil/user/gain',
        success: function (result) {
            if (result.id != null) {
                faceinfo.src = result.picture;
                schoolname.innerHTML = result.university;
                username.innerHTML = result.userName;
                phone.innerHTML = result.phoneNumber;
                pass.innerHTML = result.password;
				$("#p_changeimg").attr("src", result.picture);
				$("#p_sendImg").attr('disabled', true);				//禁用头像上传控件
				//请求个人视频
				GetMyVideoDiv();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("网页链接出现异常！");
        }
    });

}

/*开始查询视频*/
function btnSearchVideo() {
	var word = $("#baidu_line").val();
	var storage = window.localStorage;
	storage.setItem("word", word);
	window.open('../html/searchvideo.html');
}

<!--热门视频-->
function GetHotVideoFun() {
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: data1 = {
			'amount': "12"
		},
        url: 'http://www.flyingsnowman.xin/pupil/videos/hightLikeVideos',
        success: function (result) {
			//alert(result.listSize);	
			//alert(result.videosExtend[0].videoPath);
			//alert(result.videosExtend[0].imgPath);
			//alert(result.videosExtend[0].likeCnt);
			//alert(result.videosExtend[0].likeInfo);
			//alert(result.videosExtend[0].reportInfo);
            if (result.listSize != null) {
                for (var i = 0; i < result.listSize; i++) {
					CreateTypeVideoDiv('HotVideoid', result.videosExtend[i].video_id, result.videosExtend[i].user_id, 
						result.videosExtend[i].title, result.videosExtend[i].category, result.videosExtend[i].uploadTime, 
						result.videosExtend[i].videoPath, result.videosExtend[i].imgPath, result.videosExtend[i].likeCnt, 
						result.videosExtend[i].likeInfo, result.videosExtend[i].reportInfo, result.videosExtend[i].browseCnt);
				}		
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
			ShowMessage("网络异常！");
        }
    });		
}

<!--分类视频-->
function GetTypeVideoFun(videoType, schoolName, typeVideoId) {
	//alert(videoType);
	//alert(typeVideoId);
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: data1 = {
			'amount': "12",
			'university': schoolName,
			'category': videoType
		},
        url: 'http://www.flyingsnowman.xin/pupil/videos/inquireVideos',
        success: function (result) {
			//alert(result.listSize);
			//alert(result.videosExtend[0].videoPath);
			//alert(result.videosExtend[0].imgPath);
			/*alert(result.videosExtend[0].user_id);
			alert(result.videosExtend[0].likeCnt);
			alert(result.videosExtend[0].likeCnt);
			alert(result.videosExtend[0].likeInfo);
			alert(result.videosExtend[0].reportInfo);*/
            if (result.listSize != null) {
                for (var i = 0; i < result.listSize; i++) {
					CreateTypeVideoDiv(typeVideoId, result.videosExtend[i].video_id, result.videosExtend[i].user_id, 
						result.videosExtend[i].title, result.videosExtend[i].category, result.videosExtend[i].uploadTime, 
						result.videosExtend[i].videoPath, result.videosExtend[i].imgPath, result.videosExtend[i].likeCnt, 
						result.videosExtend[i].likeInfo, result.videosExtend[i].reportInfo, result.videosExtend[i].browseCnt);
				}		
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
			ShowMessage("网络异常！");
        }
    });		
}

<!--分类视频布局-->
/*
 * VideoDivId	通过这个id实现在这个div下动态创建视频框
 * video_id 	视频id
 * user_id		视频发布者ID
 * title		视频标题
 * category 	视频分类
 * uploadTime 	视频上传时间
 * videoPath
 * imgPath
 * likeCnt		点赞数
 * likeInfo		当前用户是否点赞
 * reportInfo   当前用户是否举报
 */
function CreateTypeVideoDiv(VideoDivId, video_id, user_id, title, category, uploadTime, videoPath, imgPath, likeCnt, likeInfo, reportInfo, browseCnt) {
	var videodiv = document.getElementById(VideoDivId);
	 
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	var div3 = document.createElement("div");
	var div4 = document.createElement("div");
	var div5 = document.createElement("div");	 
	var a 	 = document.createElement("a");
	var img  = document.createElement("img");		
	var span2 = document.createElement("span");
	 
	var videoid = "video" + video_id;
	div1.id = videoid;
	div1.className = "col-lg-3 col-md-4 col-sm-6 col-xs-6";
	div2.className = "portfolio-box-caption";
	div3.className = "portfolio-box-caption-content";
	div4.className = "project-category text-faded";
	div5.className = "project-name";
	 
	a.href = "./video.html";
    a.target = "_blank";
	a.className = "portfolio-box";
	a.onclick = function() {				//视频界面跳转			
		myvideoInterface(videoPath, imgPath, video_id, likeCnt, likeInfo, reportInfo, browseCnt);
	}
	img.className = "img-responsive";
	//alert(imgPath);
	img.src = imgPath;						//图片路径
	span2.className = "glyphicon glyphicon-play-circle";
	div5.innerHTML = title;					//添加标题
	 	 
	videodiv.appendChild(div1);
	div1.appendChild(a);
	a.appendChild(img);
	a.appendChild(div2);
	div2.appendChild(div3);
	div3.appendChild(div4);
	div4.appendChild(span2);
	div3.appendChild(div5);
}


<!--个人视频模块start-->
function GetMyVideoDiv() {
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: data1 = {
			'currentPage': "1",
			'amount': "12",
			'category': ""
		},
        url: 'http://www.flyingsnowman.xin/pupil/videos/personalVideos',
        success: function (result) {
			//alert(result.listSize);		
            if (result.listSize != null) {
				if (result.listSize == 0) {
					$("#p_delFileRight").html("您暂时还未上传视频！快去分享吧！").show();
				}
                for (var i = 0; i < result.listSize; i++) {
					CreateMyVideoDiv('m_myVideoId', result.videosExtend[i].video_id, result.videosExtend[i].user_id, 
						result.videosExtend[i].title, result.videosExtend[i].category, result.videosExtend[i].uploadTime, 
						result.videosExtend[i].videoPath, result.videosExtend[i].imgPath, result.videosExtend[i].likeCnt, 
						result.videosExtend[i].likeInfo, result.videosExtend[i].reportInfo, result.videosExtend[i].browseCnt);
				}		
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
			ShowMessage("网络异常！");
        }
    });	
}

/*
 * VideoDivId	通过这个id实现在这个div下动态创建视频框
 * video_id 	视频id
 * user_id		视频发布者ID
 * title		视频标题
 * category 	视频分类
 * uploadTime 	视频上传时间
 * videoPath
 * imgPath
 */
 /*
 <div class="col-xs-3 centered">
	<a href="#">
		<img class="img-responsive" src="../img/p01.png" alt="">
	</a>
	<h6><button class="btn btn-primary btn-xs btn-block">删除</button></h6>
</div><!-- col-xs-3 -->
 */
function CreateMyVideoDiv(VideoDivId, video_id, user_id, title, category, uploadTime, videoPath, imgPath, likeCnt, likeInfo, reportInfo, browseCnt) {
	
	var videodiv = document.getElementById(VideoDivId);
	 
	var div1 = document.createElement("div");
	var a 	 = document.createElement("a");
	var img  = document.createElement("img");
	var h6 	 = document.createElement("h6");
	var but  = document.createElement("button");
	 
	var videoid = "myvideo" + video_id;
	div1.id = videoid;
	div1.className = "col-sm-3 centered";
	 
	a.href = "./video.html";
    a.target = "_blank";
	a.onclick = function() {				//视频界面跳转			
		myvideoInterface(videoPath, imgPath, video_id, likeCnt, likeInfo, reportInfo, browseCnt);
	}
	img.className = "img-responsive";
	img.src = imgPath;						//图片路径
	but.className = "btn btn-primary btn-xs btn-block";
	but.id="del";
	but.innerHTML = "删除";
	but.onclick = function() {				//视频界面跳转			
		DelMyVideo(user_id, video_id);		//位于personal.js
	}
	 
	videodiv.appendChild(div1);
	div1.appendChild(a);
	div1.appendChild(h6);
	a.appendChild(img);
	h6.appendChild(but);
}

<!--视频分类页面跳转-->
function GetTypeHtml(videoType) {
	var storage=window.localStorage;
	if (videoType == '情感分享') {
		storage.setItem("type", "情感分享");
		window.open('../html/feelclassification.html');
	}
	else if (videoType == '衣食住行分享') {
		storage.setItem("type", "衣食住行");
		window.open('../html/feelclassification.html');
	}
	else if (videoType == '高校风采视频') {
		storage.setItem("type", "校园风采");
		window.open('../html/feelclassification.html');
	}
	else if (videoType == '校内情感分享') {
		storage.setItem("type", "情感分享");
		window.open("../html/schoolclassification.html");
	}
	else if (videoType == '校内衣食住行分享') {
		storage.setItem("type", "衣食住行");
		window.open("../html/schoolclassification.html");
	}
	else if (videoType == '校内全部视频') {
		storage.setItem("type", "");
		window.open("../html/schoolclassification.html");
	}
	else if (videoType == '校园风采视频') {
		storage.setItem("type", "校园风采");
		window.open("../html/schoolclassification.html");
	}
	
}

<!--跳转视频播放页面-->
function myvideoInterface(videoPath, imgPath, video_id, likeCnt, likeInfo, reportInfo, browseCnt) {
	//if (!window.localStorage)
	//	alert("该浏览器不支持localStorage");
	var storage=window.localStorage;
	storage.setItem("video", videoPath);
	storage.setItem("img", imgPath);
	storage.setItem("video_id", video_id);
	storage.setItem("likeCnt", likeCnt);
	storage.setItem("likeInfo", likeInfo);
	storage.setItem("reportInfo", reportInfo);
	storage.setItem("browseCnt", browseCnt);
	
	//window.open("../html/video.html");
}
<!--个人视频模块end-->


<!--退出登录-->
function dropOutFun() {
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
                        window.location.href = "../html/index.html";
                    }
                });
                /*$("#login").show();
                 $("#register").show();*/
                //OutButtonHide();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
			ShowMessage("网络异常");
        }
    });
}

<!--个人信息模块-->
$(function(){
    // dom加载完毕
    var $m_btn = $('#change_message');
    var $modal = $('#messageModal');
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

});
<!--修改个人信息弹出框-->
function changename() {
    var name = document.getElementById("p_user.userName");
    var pass = document.getElementById("p_password");
	if (name.value == "") {
		$("#p_SetNameError").html("用户名不能为空！").show();
		setTimeout(function(){$("#p_SetNameError").hide();}, 3000);
		return;
	}
    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: data1 = {
            'user.userName': name.value,
            'user.password': pass.innerHTML.toString()
        },
        url: 'http://www.flyingsnowman.xin/pupil/user/modifyInfo',
        success: function (result) {
            if (result.message == 0) {
				$("#p_SetNameError").html("请先登录账号！").show();
				setTimeout(function(){$("#p_SetNameError").hide();}, 3000);
            }

            if (result.info == 1) {
				$("#p_SetNameRight").html("修改成功！").show();
				$("#p_username").text(name.value);
				//setTimeout(function(){$("#p_SetNameRight").hide();}, 1000);
				//$("#p_guanbi1").onclick();
            }
            else {
				$("#p_SetNameError").html("修改失败！").show();
				setTimeout(function(){$("#p_SetNameError").hide();}, 3000);
            }
            name.value = "";
        },
        error: function (jqXHR, textStatus, errorThrown) {
			ShowMessage("网络异常！");
        }
    });
}
function changepassword() {
    var name = document.getElementById("p_username");
    var pass1 = document.getElementById("p_user.password1");
    var pass2 = document.getElementById("p_user.password2");
    var pass3 = document.getElementById("p_user.password3");
    var nowpass = document.getElementById("p_password");
    var passinfo = document.getElementById("p_passwordinfo");
    if (pass1.value == "" || pass2.value == "" || pass3.value == "") {
		$("#p_revisePassError").html("输入框不能为空！").show();
        return false;
    }
    //alert(pass1.value);
    //alert(nowpass.innerHTML);
    var oldpass = hex_md5(pass1.value);
    if (oldpass != nowpass.innerHTML.toString()) {
        //passinfo.style.color = "#f00";
        //passinfo.innerHTML = "旧密码与当前密码不匹配";
		$("#p_revisePassError").html("旧密码与当前密码不匹配！").show();
		setTimeout(function(){$("#p_revisePassError").hide();}, 3000);
        return false;
    }
    if (pass2.value != pass3.value) {
		$("#p_revisePassError").html("两次输入的密码不同！").show();
		setTimeout(function(){$("#p_revisePassError").hide();}, 3000);
        return false;
    }
    pass2.value = hex_md5(pass2.value);
    //alert(name.innerHTML.toString());
    //alert(pass2.value);
    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        data: data2 = {
            'user.userName': name.innerHTML.toString(),
            'user.password': pass2.value
        },
        url: 'http://www.flyingsnowman.xin/pupil/user/modifyInfo',
        success: function (result) {
            if (result.message == 0) {
				$("#p_revisePassError").html("请先登录账号！").show();
				setTimeout(function(){$("#p_revisePassError").hide();}, 3000);
            }

            if (result.info == 1) {
				$("#p_revisePassRight").html("修改成功！").show();
				setTimeout(function(){$("#p_revisePassRight").hide();}, 3000);
            }
            else {
                //alert("修改失败");
				$("#p_revisePassError").show();
				$("#p_revisePassError").html("修改失败！");
				setTimeout(function(){$("#p_revisePassError").hide();}, 3000);
            }
            pass1.value = "";
            pass2.value = "";
            pass3.value = "";

        },
        error: function (jqXHR, textStatus, errorThrown) {
			ShowMessage("网络异常！");
        }
    });
}

<!--获取修改头像地址-->
/*function getpicfun(_this) {
    var file = _this.files[0];
    var uptip = false;

    <!--判断文件格式-->
    for (var i=0; i < _this.files.length; i++) {
        var xn = _this.files[i].name;
        var xs = _this.files[i].size;
        var xtype = xn.substr(xn.length-3);
        var xtype2 = xn.substr(xn.length-4);
        if((xtype!="jpg" && xtype!="JPG" && xtype!="png" && xtype!="PNG" && xtype2!="jpeg") || xs>5242880) {
            uptip=true;
        }
        //ss+=xn+" : "+xs+"byte"+"<br/>";
    }
    if(uptip){
        $("#p_sendError").html("请检查大小和格式！").show();
    }else{
        $("#p_sendError").hide();
    }

    <!--获取路径-->
    if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onloadend = function (e) {
            //$(".img").attr("src",e.target.result);    //e.target.result就是最后的路径地址
            var img = document.getElementById("p_changeimg");
            img.src = e.target.result;
        };
    }
}*/

<!--视频上传-->
function getvideofun(_this) {
    var file = _this.files[0];
    var uptip = false;

    <!--判断文件格式-->
    for (var i=0; i < _this.files.length; i++) {
        var xn = _this.files[i].name;
        var xs = _this.files[i].size;
        var xtype = xn.substr(xn.length-3);
        //var xtype2 = xn.substr(xn.length-4);
        //var xtype3 = xn.substr(xn.length-5);
        if((xtype!="flv" && xtype!="mp4"&& xtype!="jpg" && xtype!="3gp" && xtype!="MOV" && xtype!="mov" && xtype!="avi") || xs>41943040) {
            uptip=true;
        }
    }
    if(uptip){
        $("#p_sendFileError").html("请检查大小和格式！").show();
        _this.value = "";
    }else{
        $("#p_sendFileError").hide();
    }
}

$(function() {
    // 上传按钮
    $("#batchUploadBtn").attr('disabled', true);
    // 上传文件按钮点击的时候
    $("#batchUploadBtn").click(function() {
        var videotitle = document.getElementById("p_videotitle");
        var videotype = document.getElementById("p_selecttype");
        var oInput = document.getElementById('p_videofile');
        var index = videotype.selectedIndex;
        var value = videotype.options[index].value;

        if (videotitle.value == "") {
            $("#p_sendFileError").html("视频标题不能为空").show();
            return;
        }else {
            $("#p_sendFileError").hide();
        }
        //判断文件是否为空
        if (oInput.value == "") {
            $("#p_sendFileError").html("视频不能为空").show();
            return;
        }else {
            $("#p_sendFileError").hide();
        }

        $("#progressBar").width("0%");		// 进度条归零
        $(this).attr('disabled', true);		// 上传按钮禁用
        $("#progressBar").parent().show();	// 进度条显示
        $("#progressBar").parent().addClass("active");
        // 上传文件
        UpladFile();
    })

    // 文件修改时
    $("#p_videofile").change(function() {
        $("#batchUploadBtn").val("上传");
        $("#progressBar").width("0%");
        var file = $(this).prop('files');
        if (file.length != 0) {
            $("#batchUploadBtn").attr('disabled', false);
        }

    });

    function UpladFile() {
        var title = document.getElementById('p_videotitle');
        var videotype = document.getElementById("p_selecttype");
        var index = videotype.selectedIndex;
        var typevalue = videotype.options[index].value;

        //文件传输模块
        var fileObj = $("#p_videofile").get(0).files[0]; // js 获取文件对象
        console.info("上传的文件："+fileObj);
        var FileController = "http://www.flyingsnowman.xin/pupil/videos/uploadVideo"; // 接收上传文件的后台地址
        // FormData 对象
        var form = new FormData();
        form.append("video", fileObj); // 文件对象
        form.append("videos.category", typevalue);
        form.append("videos.title", title.value);
        // XMLHttpRequest 对象
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.timeout = 900000;			//15分钟
        xhr.withCredentials = true;
        xhr.open("post", FileController, true);
        //xhr.responseType = 'json';
        xhr.onload = function(getmessage) {	
			$("#p_sendFileRight").html("上传完成！请刷新当前页！").show();
			setTimeout(function(){$("#p_sendFileRight").hide();}, 3000);
			
            $("#batchUploadBtn").attr('disabled', false);
            $("#batchUploadBtn").val("上传");
            $("#progressBar").parent().removeClass("active");
            $("#progressBar").parent().hide();
            //$('#myModal').modal('hide');
        };
        xhr.upload.addEventListener("progress", progressFunction, false);

        xhr.ontimeout = function(message) {
			$("#p_sendFileError").html("上传超时！").show();
			setTimeout(function(){$("#p_sendFileError").hide();}, 3000);
			
            $("#batchUploadBtn").attr('disabled', false);
            $("#batchUploadBtn").val("上传");
            $("#progressBar").parent().removeClass("active");
            $("#progressBar").parent().hide();
        }
        xhr.onerror = function(message) {
			$("#p_sendFileError").html("传输失败，请检查网络！").show();
			setTimeout(function(){$("#p_sendFileError").hide();}, 3000);
			
            $("#batchUploadBtn").attr('disabled', false);
            $("#batchUploadBtn").val("上传");
            $("#progressBar").parent().removeClass("active");
            $("#progressBar").parent().hide();
        }
        xhr.send(form);
    };
    function progressFunction(evt) {
        var progressBar = $("#progressBar");
        if (evt.lengthComputable) {
            var completePercent = Math.round(evt.loaded / evt.total * 100)+ "%";
            progressBar.width(completePercent);
            $("#batchUploadBtn").val("正在上传 " + completePercent);
			
			if (Math.round(evt.loaded / evt.total * 100) == 100) {
				$("#p_sendFileRight").html("正在保存视频！").show();	
			}
        }
    };
});

<!--个人中心卡牌页面的调转-->
(function($){
    $("#myTab a").click(function (e) {
        e.preventDefault();
        $(this).tab('show')
    })
})(jQuery);

<!--个人页跳转-->
function personalpage(_type) {
    $.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        url: 'http://www.flyingsnowman.xin/pupil/user/gain',
        success: function (result) {
            if (result.id != null) {
                if (_type == "个人主页") {
                    window.location.href = "../html/personal.html";
                } else {
                    window.location.href = "../html/classification.html";
                }
            }
            else {
                // alert("请先登录!");
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
            //alert("请求失败");
            //window.location.href="personal.html";
            $.alertable.alert('请求失败！', {
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

<!--举报弹出框-->
$(function(){
    // dom加载完毕
    var $m_btn = $('#change_report');
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

});

<!--删除我的视频弹出框-->
$(function(){
    // dom加载完毕
    var $m_btn = $('#del');
    var $modal = $('#delModal');
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

});

<!--头像裁剪模态框-->
$(function(){
    // dom加载完毕
    var $m_btn = $('#img');
    var $modal = $('#imgModal');
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

});

<!--教师注册响应-->
$(function(){
    // dom加载完毕
    var $m_btn = $('.teacher_register');
    var $modal = $('#teacher_registerModal');
    $m_btn.on('click', function(){
        $modal.modal({backdrop: 'static'});
        $("#guanbi2").click();
        $("#guanbi4").click();
        $("#guanbi5").click();
        $("#guanbi6").click();
    });

    // 测试 bootstrap 居中
    $modal.on('show.bs.modal', function(){
        var $this = $(this);
        var $modal_dialog = $this.find('.modal-dialog');
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $this.css('display', 'block');
        $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
    });
});

<!--企业注册响应-->
$(function(){
    // dom加载完毕
    var $m_btn = $('.enterprise_register');
    var $modal = $('#enterprise_registerModal');
    $m_btn.on('click', function(){
        $modal.modal({backdrop: 'static'});
        $("#guanbi2").click();
        $("#guanbi3").click();
        $("#guanbi5").click();
        $("#guanbi6").click();
    });

    // 测试 bootstrap 居中
    $modal.on('show.bs.modal', function(){
        var $this = $(this);
        var $modal_dialog = $this.find('.modal-dialog');
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $this.css('display', 'block');
        $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
    });
});

<!--社团注册响应-->
$(function(){
    // dom加载完毕
    var $m_btn = $('.corporation_register');
    var $modal = $('#corporation_registerModal');
    $m_btn.on('click', function(){
        $modal.modal({backdrop: 'static'});
        $("#guanbi2").click();
        $("#guanbi3").click();
        $("#guanbi4").click();
        $("#guanbi6").click();
    });

    // 测试 bootstrap 居中
    $modal.on('show.bs.modal', function(){
        var $this = $(this);
        var $modal_dialog = $this.find('.modal-dialog');
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $this.css('display', 'block');
        $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
    });
});

<!--学生会注册响应-->
$(function(){
    // dom加载完毕
    var $m_btn = $('.union_register');
    var $modal = $('#union_registerModal');
    $m_btn.on('click', function(){
        $modal.modal({backdrop: 'static'});
        $("#guanbi2").click();
        $("#guanbi3").click();
        $("#guanbi4").click();
        $("#guanbi5").click();
    });

    // 测试 bootstrap 居中
    $modal.on('show.bs.modal', function(){
        var $this = $(this);
        var $modal_dialog = $this.find('.modal-dialog');
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $this.css('display', 'block');
        $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2) });
    });
});