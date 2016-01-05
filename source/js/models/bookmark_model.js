CMARKS.Models.BookmarkModel = Backbone.Model.extend({
  // the default fields
  url: '--',
  defaults: {
    title: "",
    url: "",
    dateAdded: 0
  },

  // the constructor
  initialize: function (options) {

  }

});

CMARKS.Collections.BookmarksCollection = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: CMARKS.Models.BookmarkModel,
  url: '--',
  searchPhrase: '',

  comparator: function(mark) {
    return mark.get("dateAdded");
  },

  clearJs: function (marks) {
    return _.reject(marks, function (mark) {
      return s.include(mark.url, 'javascript:%20');
    });
  },

  fetch: function () {
    // this.reset([{name: "foo"}, {name: "bar"}]);
    // return

    if (this.searchPhrase === '') {
      chrome.bookmarks.getRecent(10000, _.bind(function (marks) {
        this.reset(this.clearJs(marks));
      }, this));
    } else {
      chrome.bookmarks.search(this.searchPhrase, _.bind(function (marks) {
        this.reset(this.clearJs(marks));
      }, this));
    }
  }
});
