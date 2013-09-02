/// <reference path="datalayer.js" />
(function () {
    "use strict";

    var goToRandomVine = function () {
        var vine = Data.getRandomVine().then(
            function (vine) {
                var currentPage = WinJS.Navigation.location
                if (currentPage) {
                    WinJS.Navigation.navigate("/pages/video/video.html", vine)
                } else {
    
                }
            });
    }

    WinJS.Utilities.markSupportedForProcessing(goToRandomVine);

    WinJS.Namespace.define("DefaultCodeBehind", {
        goToRandomVine: goToRandomVine
    });
})()