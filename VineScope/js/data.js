/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />
(function () {
    "use strict";

    var vines = new WinJS.Binding.List([{ pesho: "pesho" }]);

    WinJS.Namespace.define("Data", {
        vines: vines,
    });
})();