/// <reference path="datalayer.js" />
(function () {
    "use strict";

    var goToRandomVine = function () {
        var vine = Data.getRandomVine().then(function (vine) {
            if (WinJS.Navigation.location == "/pages/video/video.html") {
                ViewModels.loadVine(vine.url);
            } else {
                WinJS.Navigation.navigate("/pages/video/video.html", vine)
            }
        });
    }

    var onResize = function () {
        var body = document.body;

        var currentViewState = Windows.UI.ViewManagement.ApplicationView.value;
        var snapped = Windows.UI.ViewManagement.ApplicationViewState.snapped;

        if (currentViewState === snapped) {
            document.getElementById("snapped").style.display = "block";
            document.getElementById("contenthost").style.display = "none";
            var player = document.getElementById("vine-player");
            if (player && !player.paused) {
                player.pause();
            }
        }
        else {
            document.getElementById("snapped").style.display = "none";
            document.getElementById("contenthost").style.display = "block";
        }
    }

    WinJS.Utilities.markSupportedForProcessing(goToRandomVine);

    WinJS.Namespace.define("DefaultCodeBehind", {
        onResize: onResize,
        goToRandomVine: goToRandomVine
    });
})()