CMARKS.app = {
  initialize: function () {
    var router = new CMARKS.Routers.AppRouter();
    router.index();
  }
};

CMARKS.app.initialize();