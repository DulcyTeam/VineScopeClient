/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    var url = "http://vinescopecustomservices.apphb.com/api/vines/";

    var vinesList = new WinJS.Binding.List([]);
    var searchResults = new WinJS.Binding.List([]);

    var vineViewModel = function () {
        return WinJS.Binding.as({
            previousVineUrl: "",
            nextVineUrl: "",
            videoUrl: "",
            addedBefore: "",
            title: "",
            url: "",
            posterUrl: "",
            author: "",
        })
    }

    var vine = vineViewModel();

    var loadVines = function () {
        var vinesDTOs = Data.getVines().then(function (vinesDTOs) {
            vinesList.splice(0, vinesList.length);

            for (var i = 0; i < vinesDTOs.length; i++) {
                vinesList.push(vinesDTOs[i]);
            }
        }, function error() {

            var problemContainer = document.getElementById("problem-reporter");
            var h2 = document.createElement("h2");
            h2.innerText = "Something happened, there is a problem with the connection";
            var img = document.createElement("img");
            img.src = "../../images/sad-panda.png";
            problemContainer.appendChild(h2);
            problemContainer.appendChild(img);
        }).done();
    }

    var loadVine = function (vineUrl) {
        var vineDTO = Data.getVine(vineUrl).then(function (vineDTO) {
            vine.previousVineUrl = vineDTO.previousVineUrl;
            vine.nextVineUrl = vineDTO.nextVineUrl;
            vine.videoUrl = vineDTO.videoUrl;
            vine.addedBefore = vineDTO.addedBefore;
            vine.title = vineDTO.title;
            vine.url = vineDTO.url;
            vine.posterUrl = vineDTO.posterUrl;
            vine.author = vineDTO.author;
        }, function error() {
            var errorMessage = new Windows.UI.Popups.MessageDialog("No connection with server");
            errorMessage.showAsync()
        });
    }

    var searchQuery = WinJS.Binding.as({ queryText: ""});

    var getSearchResultsFor = function (queryString) {
        searchQuery.queryText = queryString;

        var vinesDTOs = Data.searchVines(queryString).then(function (vinesDTOs) {
            searchResults.splice(0, searchResults.length);

            if (!vinesDTOs) {
                return;
            }

            for (var i = 0; i < vinesDTOs.length; i++) {
                var vineDTO = vinesDTOs[i];
                searchResults.push(vineDTO);
            }
        }, function error() {
            var errorMessage = new Windows.UI.Popups.MessageDialog("No connection with server");
            errorMessage.showAsync()
        });
    }

    WinJS.Namespace.define("ViewModels", {
        loadVines: loadVines,
        loadVine: loadVine,
        vine: vine,
        vines: vinesList,
        searchResults: searchResults,
        getSearchResultsFor: getSearchResultsFor,
        searchQuery: searchQuery,
        vineModel: vineViewModel
    });
})();