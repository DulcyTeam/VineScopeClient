(function () {
    "use stict";

    var url = "http://vinescopecustomservices.apphb.com/api/vines/";

    var getVines = function () {
        var vines = [];

        return HttpRequester.getJson(url + "all").then(function complete(response) {
            var jsonResponse = response.responseText;
            vines = JSON.parse(jsonResponse);
            return vines;
        });
    };

    var searchVines = function (queryText) {
        var found = [];

        return HttpRequester.getJson(url + "search?query=" + queryText).then(function complete(response) {
            var jsonResponse = response.responseText;
            found = JSON.parse(jsonResponse);
            return found;
        }, function error(response) {
            var errorMessage = new Windows.UI.Popups.MessageDialog("No results were found");
            errorMessage.showAsync();
        });
    };

    var getVine = function (vineUrl) {
        var vine = {};

        return HttpRequester.getJson(url + "vine?url=" + vineUrl).then(function (response) {
            var jsonResponse = response.responseText;
            vine = JSON.parse(jsonResponse);
            return vine;
        }, function error(response) {
            var errorMessage = new Windows.UI.Popups.MessageDialog("No connection with server");
            errorMessage.showAsync()
        });
    }

    var getRandomVine = function () {
        var vine = {};

        return HttpRequester.getJson(url + "random").then(function (response) {
            var jsonResponse = response.responseText;
            vine = JSON.parse(jsonResponse);
            return vine;
        }, function error(response) {
            var errorMessage = new Windows.UI.Popups.MessageDialog("No connection with server");
            errorMessage.showAsync()
        });
    };

    WinJS.Namespace.define("Data", {
        getVines: getVines,
        getVine: getVine,
        searchVines: searchVines,
        getRandomVine: getRandomVine,
        //lastVineUrl: lastVineUrl
    });
})()