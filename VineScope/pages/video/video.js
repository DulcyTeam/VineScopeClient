/// <reference path="../../js/viewmodels.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/video/video.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        init: function (element, options) {

        },

        ready: function (element, options) {
            // TODO: Initialize the page here.
            var vine;
            if (options.indexInVinesList>=0) {
                var vineIndex = options.indexInVinesList;
                vine = ViewModels.vines.getAt(vineIndex);
            } else {
                vine = options;
            }
            ViewModels.loadVine(vine.url);
            WinJS.Binding.processAll(element, ViewModels);
        },

        unload: function () {
            // ViewModels.vine = ViewModels.vineModel();
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
