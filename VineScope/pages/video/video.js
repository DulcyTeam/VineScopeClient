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
            var vineIndex = options.indexInVinesList;
            var vine = ViewModels.vines.getAt(vineIndex);
            ViewModels.loadVine(vine.url);
            WinJS.Binding.processAll(element, ViewModels);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
