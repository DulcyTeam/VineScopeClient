(function () {

    var url = "http://vinescopecustomservices.apphb.com/api/vines/";

    var getVines = function () {
        var vines = [];

        return HttpRequester.getJson(url + "all").then(function complete(response) {
            var jsonResponse = response.responseText;
            vines = JSON.parse(jsonResponse);
            return vines;
        }, function error(response) {
            var errorMessage = new Windows.UI.Popups.MessageDialog("No connection with server");
            errorMessage.showAsync();
        });
    }

    WinJS.Namespace.define("Data", {
        getVines: getVines,
    });
})()