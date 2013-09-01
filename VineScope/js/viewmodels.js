/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

    var url = "http://vinescopecustomservices.apphb.com/api/vines/";
(function () {
    var vinesList = new WinJS.Binding.List([]);
    var searchResults = new WinJS.Binding.List([]);
    var vine = new WinJS.Binding.as({
        previousVineUrl: "",
        nextVineUrl: "",
        videoUrl: "",
        addedBefore: "",
        title: "Pesho",
        url: "",
        posterUrl: "",
        author: "",
    });

    var loadVines = function () {
        var vinesDTOs = Data.getVines().then(function (vinesDTOs) {
            vinesList.splice(0, vinesList.length);
            for (var i = 0; i < vinesDTOs.length; i++) {
                vinesList.push(vinesDTOs[i]);
            }
        }).done();
    }

    var searchQuery = WinJS.Binding.as({ queryString: ""});

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
        var a = 5;
        }).done();
    }

    var loadFoundVines = function (queryString) {
        var vinesDTOs = Data.searchVines(queryString).then(function (vinesDTOs) {;
            vinesList.splice(0, vinesList.length);
            for (var i = 0; i < vinesDTOs.length; i++) {
                vinesList.push(vinesDTOs[i]);
            }
        });
    }

    WinJS.Namespace.define("ViewModels", {
        loadVines: loadVines,
        loadVine: loadVine,
        vine: vine,
        vines: vinesList,
        searchResults: searchResults,
        loadFoundVines: loadFoundVines
    });
})();