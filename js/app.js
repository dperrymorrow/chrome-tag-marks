window.CMARKS = window.CMARKS || {};
window.CMARKS.App = (function () {
  "use strict";

  function App() {
    var router = new CMARKS.Routers.AppRouter();
    router.index();
  }

  // App.prototype.exampleFunction = function(parens) {

  // };

  return App;
})();

var app = new CMARKS.App();