window.CMARKS = {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

CMARKS.Routers.AppRouter = Backbone.Router.extend({
  _instance: null,
  bookmarks: {},

  routes: {
    "bookmark/new": "new",
    "bookmarks/index": "index",
    "bookmark/:id/edit": "edit",
    "bookmark/:id/destroy": "destroy"
  },

  initialize: function (options) {
    this._instance = this;
    this.bookmarks = new CMARKS.Collections.BookmarksCollection();
    this.searchView = new CMARKS.Views.BookmarksSearchView({collection: this.bookmarks});
    $('#search-container').html(this.searchView.render().el);
  },

  index: function () {
    this.view = new CMARKS.Views.BookmarksIndexView({collection: this.bookmarks});
    $('#content').html(this.view.render().el);
  },

  destroy: function (id) {},
  edit: function (id) {},

  getInstance: function () {
    this._instance = this._instance || new CMARKS.Routers.AppsRouter();
    return this._instance;
  }
});
