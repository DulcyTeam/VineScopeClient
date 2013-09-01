(function () {
    "use strict";

    var goToComputerDetailsPage = function (invokeEvent) {
        WinJS.Navigation.navigate("/pages/computerdetails/computerdetails.html", {
            indexInComputersList: invokeEvent.detail.itemIndex
        });
    }

    WinJS.Utilities.markSupportedForProcessing(goToComputerDetailsPage);

    WinJS.Namespace.define("HomeCodeBehind", {
        callLoadVines: function () {
            ViewModels.loadVines();
        },
    })
})();