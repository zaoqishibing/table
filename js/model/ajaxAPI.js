/**
 * Created by admin on 2016/10/19.
 */

define(['jquery', 'SHA1'], function ($, SHA1) {
    var now = Date.now();
    var appid = "A6919072937273";
    var appKey = SHA1("A6919072937273" + "UZ" + "09E38B31-074C-9A30-E74F-9AC1916391E6" + "UZ" + now) + "." + now;
    return {
        ajax: function (url, type, data, successfn) {
            type = (type == null || type == "" || typeof(type) == "undefined") ? "get" : type;
            data = (data == null || data == "" || typeof(data) == "undefined") ? null : data;
            $.ajax({
                "url": url,
                "type": type,
                "cache": false,
                "data": data,
                "headers": {
                    "X-APICloud-AppId": "A6919072937273",
                    "X-APICloud-AppKey": appKey
                },
                success: function (data) {
                    successfn(data);
                },
                error: function (err) {
                    alert("请求失败" + JSON.stringify(err));
                }
            });
        }
    }
})