/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    'use strict';

    var xhrRequesterPromise = function (url, type, data) {
        if (data) {
            data = JSON.stringify(data);
        }

        var promise = 
            WinJS.xhr({
                url: url,
                type: type,
                data: data
            })

        return promise;
    }

    function postJson(url, data) {
        return xhrRequesterPromise(url, "post", data);
    }

    function getJson(url) {
        return xhrRequesterPromise(url, "get");
    }

    WinJS.Namespace.define("HttpRequester", {
        getJson: getJson,
        postJson: postJson,
    });
})();