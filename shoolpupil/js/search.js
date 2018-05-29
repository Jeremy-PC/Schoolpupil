/* Sass Document */

/*关键词搜索*/
$(function() {
    $("#baidu_line").searchSuggest({
        url: 'http://unionsug.baidu.com/su?p=3&t=' + (new Date()).getTime() + '&wd=',
        /*优先从url ajax 请求 json 帮助数据，注意最后一个参数为关键字请求参数*/
        jsonp: 'cb',
        /*如果从 url 获取数据，并且需要跨域，则该参数必须设置*/
        json: {
            'data': [{
                'id': '0',
                'word': 'baidu',
                'description': ''
            }, {
                'id': '1',
                'word': 'lzw.me',
                'description': ''
            }, {
                'id': '2',
                'word': 'w1.lzw.me',
                'description': ''
            }, {
                'id': '3',
                'word': 'g.lzw.me',
                'description': ''
            }, {
                'id': '4',
                'word': 'seo.lzw.me',
                'description': ''
            }],
            'defaults': 'http://lzw.me'
        },
        width: 200,
        /*提示框的宽度，缺省为输入框的宽度相同*/
        topoffset: 16,
        /*提示框与输入框的距离，缺省为5*/
        style: 'line',
        cssFile: '../css/search-suggest.css',
        processData: function(json) { // url 获取数据时，对数据的处理，作为 getData 的回调函数
            if (!json || json.title.length == 0) return false;

            console.log(json);
			//alert(json.title[0]);
			//alert(json.title.length);
            var jsonStr = "{'data':[";
            for (var i = json.title.length - 1; i >= 0; i--) {
                jsonStr += "{'id':'" + i + "','word':'" + json.title[i] + "', 'description': ''},";
            }
            jsonStr += "],'defaults':'baidu'}";

            //字符串转化为 js 对象
            return json = (new Function("return " + jsonStr))();
        },
        getData: function(word, parent, callback) { //数据获取方法
            if (!word) return;
			$.ajax({
				type: 'POST',
				xhrFields: {
					withCredentials: true
				},
				data: {
					'titleWord': word
				},
				url: 'http://www.flyingsnowman.xin/pupil/videos/selectTitle',
				success: function (data) {
					callback(parent, data);
				},
				error: function (data) {
					callback(parent, data);
				}
			});	
        }

    });
})