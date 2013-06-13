window.CMARKS = window.CMARKS || {};
window.CMARKS.Routers = window.CMARKS.Routers || {};
window.CMARKS.Routers.AppRouter = Backbone.Router.extend({
  _instance: null,
  bookmarks: {},

  routes: {
    "bookmark/new": "new",
    "bookmarks/index": "index",
    "bookmark/:id/edit": "edit"
  },

  initialize: function (options) {
    this.bookmarks = new CMARKS.Collections.BookmarksCollection();
    // this.bookmarks.bind('reset', _.bind(function () {
    //   this.index();
    // }, this ));
    // this.bookmarks.fetch();
  },

  index: function () {
    this.view = new CMARKS.Views.BookmarksIndexView({collection: this.bookmarks});
    $('#content').html(this.view.render().el);
  },

  getInstance: function () {
    this._instance = this._instance || new CMARKS.Routers.AppsRouter();
    return this._instance;
  }
});