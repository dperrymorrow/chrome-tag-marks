window.CMARKS                   = window.CMARKS || {};
window.CMARKS.Routers           = window.CMARKS.Routers || {};
window.CMARKS.Routers.AppRouter = Backbone.Router.extend({
  _instance: null,
  bookmarks: {},

  routes: {
    "bookmark/new": "new",
    "bookmarks/index": "index",
    "bookmark/:id/edit": "edit",
    "bookmark/:id/destroy": "destroy"
  },

  initialize: function (options) {
    this.bookmarks = new CMARKS.Collections.BookmarksCollection();
    this._instance = this;
  },

  index: function () {
    this.view = new CMARKS.Views.BookmarksIndexView({collection: this.bookmarks});
    $('#content').html(this.view.render().el);
  },

  destroy: function (id) {
  },

  edit: function (id) {
  },

  getInstance: function () {
    this._instance = this._instance || new CMARKS.Routers.AppsRouter();
    return this._instance;
  }
});