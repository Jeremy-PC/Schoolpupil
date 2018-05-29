/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

function GetSchoolVideoDiv() {
	$.ajax({
        type: 'POST',
        xhrFields: {
            withCredentials: true
        },
        url: 'http://www.flyingsnowman.xin/pupil/user/gain',
        success: function (result) {
            if (result.id != null) {
				//获取视频
				GetTypeVideoFun("", result.university, "c_allVideoId");
				GetTypeVideoFun("情感分享", result.university, "c_FeelVideoId");
				GetTypeVideoFun("衣食住行", result.university, "c_DailyVideoId");
				GetTypeVideoFun("校园风采", result.university, "c_mienVideoId");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("网页链接出现异常！");
        }
    });	
}