(function () {
    "use strict";

    var goToVinePage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/video/video.html", {
            indexInVinesList: invokeEvent.detail.itemIndex
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