// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            }
            else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }

            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                }
                else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
            
            var fbLogin = document.getElementById("cmdFbLogin").winControl

            fbLogin.addEventListener("click", facebookLogin);

            var facebookLogin = function () {
            };

            WinJS.Utilities.id("cmdDownload").listen("click", function () {
                var currentState = Windows.UI.ViewManagement.ApplicationView.value;
                if (currentState === Windows.UI.ViewManagement.ApplicationViewState.snapped &&
                    !Windows.UI.ViewManagement.ApplicationView.tryUnsnap()) {
                    return;
                }

                var savePicker = new Windows.Storage.Pickers.FileSavePicker();
                savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.videosLibrary;
                savePicker.fileTypeChoices.insert("Video", [".mp4", ".png"]);
                savePicker.suggestedFileName = "New Video";
                savePicker.pickSaveFileAsync().then(function (file) {
                    if (file) {
                        Windows.Storage.CachedFileManager.deferUpdates(file);
       
                        Windows.Storage.FileIO.w(file, file.name).done(function () {
                            // Let Windows know that we're finished changing the file so the other app can update the remote version of the file.
                            // Completing updates may require Windows to ask for user input.
                            Windows.Storage.CachedFileManager.completeUpdatesAsync(file).done(function (updateStatus) {
                                if (updateStatus === Windows.Storage.Provider.FileUpdateStatus.complete) {
                                    WinJS.log && WinJS.log("File " + file.name + " was saved.", "sample", "status");
                                } 
                                else {
                                    WinJS.log && WinJS.log("File " + file.name + " couldn't be saved.", "sample", "status");
                                }
                            });
                        });
                    } 
                    else {
                        WinJS.log && WinJS.log("Operation cancelled.", "sample", "status");
                    }
                });
            });
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();