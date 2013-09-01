/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
    var url = "http://vinescopecustomservices.apphb.com/api/vines/";
(function () {
    var vinesList = new WinJS.Binding.List([]);
    var searchResults = new WinJS.Binding.List([]);

    var loadVines = function () {
        var vinesDTOs = Data.getVines().then(function (vinesDTOs) {;
            vinesList.splice(0, vinesList.length);
            for (var i = 0; i < vinesDTOs.length; i++) {
                vinesList.push(vinesDTOs[i]);
            }
        });
    }

    var loadFoundVines = function () {
        var vinesDTOs = Data.getVines().then(function (vinesDTOs) {;
            vinesList.splice(0, vinesList.length);
            for (var i = 0; i < vinesDTOs.length; i++) {
                vinesList.push(vinesDTOs[i]);
            }
        });
    }

    WinJS.Namespace.define("ViewModels", {
        loadVines: loadVines,
        vines: vinesList,
        searchResults: searchResults,
        loadFoundVines: loadFoundVines
    });
})();