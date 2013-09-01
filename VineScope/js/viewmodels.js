/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    var vinesList = new WinJS.Binding.List([]);
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

    WinJS.Namespace.define("ViewModels", {
        loadVines: loadVines,
        loadVine: loadVine,
        vine: vine,
        vines: vinesList,
    });
})();