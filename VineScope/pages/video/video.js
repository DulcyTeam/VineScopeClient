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

            if (options.indexInVinesList >= 0) {
                var vineIndex = options.indexInVinesList;
                vine = ViewModels.vines.getAt(vineIndex);
            }
            else {
                vine = options;
            }

            ViewModels.loadVine(vine.url);
            WinJS.Binding.processAll(element, ViewModels);
            var downloadButton = document.getElementById("download-vine-bnt");
            downloadButton.addEventListener("click", downloadVineOnClick);
        },

        unload: function () {
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            // TODO: Respond to changes in viewState.
        }
    });

    function downloadVineOnClick() {
        var vineUrl = document.getElementById("vine-source").src;
        console.log(vineUrl);
        var currentState = Windows.UI.ViewManagement.ApplicationView.value;

        if (currentState === Windows.UI.ViewManagement.ApplicationViewState.snapped &&
            !Windows.UI.ViewManagement.ApplicationView.tryUnsnap()) {
            return;
        }

        var savePicker = new Windows.Storage.Pickers.FileSavePicker();
        savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.videosLibrary;
        savePicker.fileTypeChoices.insert("Video", [".mp4"]);
        savePicker.suggestedFileName = "New Video";
        savePicker.pickSaveFileAsync().then(function (file) {
            if (file) {
                Windows.Storage.CachedFileManager.deferUpdates(file);
                var uri = Windows.Foundation.Uri(vineUrl);
                var downloader = new Windows.Networking.BackgroundTransfer.BackgroundDownloader();
                var download = downloader.createDownload(uri, file);
                download.startAsync().then(function () {
                    Windows.Storage.CachedFileManager.completeUpdatesAsync(file).done(function (updateStatus) {
                        if (updateStatus === Windows.Storage.Provider.FileUpdateStatus.complete) {
                            var successMessage = new Windows.UI.Popups.MessageDialog("Download finished successfully.");
                            successMessage.showAsync()
                        }
                    });
                }, function () {
                    var failMessage = new Windows.UI.Popups.MessageDialog("Download failed.");
                    failMessage.showAsync()
                }).done();
            }
            else {
                WinJS.log && WinJS.log("Operation cancelled.", "sample", "status");
            }
        });
    }
})();