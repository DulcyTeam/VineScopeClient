/// <reference path="datalayer.js" />
(function () {
    "use strict";

    var goToRandomVine = function () {
        var vine = Data.getRandomVine().then(function (vine) {
            if (WinJS.Navigation.location == "/pages/video/video.html") {
                ViewModels.loadVine(vine.url);
            } else {
                    WinJS.Navigation.navigate("/pages/video/video.html", vine)
                WinJS.Navigation.navigate("/pages/video/video.html", vine)
            }
    
                }
        });
    }

    WinJS.Utilities.markSupportedForProcessing(goToRandomVine);

    WinJS.Namespace.define("DefaultCodeBehind", {
        goToRandomVine: goToRandomVine
    });
})()