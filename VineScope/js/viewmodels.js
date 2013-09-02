/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

var url = "http://vinescopecustomservices.apphb.com/api/vines/";

(function () {
    "use strict";

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
            if (!vinesDTOs) {
                return;
            }

            for (var i = 0; i < vinesDTOs.length; i++) {
                vinesList.push(vinesDTOs[i]);
            }
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
        }).done();
    }

    var searchQuery = WinJS.Binding.as({ queryText: ""});

    var getSearchResultsFor = function (queryString) {
        searchQuery.queryText = queryString;

        var vinesDTOs = Data.searchVines(queryString).then(function (vinesDTOs) {
            vinesList.splice(0, vinesList.length);

            if (!vinesDTOs) {
                return;
            }

            for (var i = 0; i < vinesDTOs.length; i++) {
                var vineDTO = vinesDTOs[i];
                vinesList.push(vineDTO);
            }
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
        vineViewModel: vineViewModel
    });
})();