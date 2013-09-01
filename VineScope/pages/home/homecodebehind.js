(function () {
    "use strict";

    var goToVinePage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/video/video.html", {
            indexInComputersList: invokeEvent.detail.itemIndex
        });
    }

    WinJS.Utilities.markSupportedForProcessing(goToVinePage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadVines: function () {
            ViewModels.loadVines();
        },

        goToVinePage: goToVinePage
    })
})();