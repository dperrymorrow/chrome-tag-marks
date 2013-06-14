(function () {
  "use strict";
  window.CMARKS.Models.BookmarkModel = Backbone.Model.extend({

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

  window.CMARKS.Collections.BookmarksCollection = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: CMARKS.Models.BookmarkModel,
    url: '--',
    searchPhrase: '',

    fetch: function () {
      // this.reset([{name: "foo"}, {name: "bar"}]);
      // return

      if (this.searchPhrase === '') {
        chrome.bookmarks.getRecent(100, _.bind(function (marks) {
          this.reset(marks);
        }, this));
      } else {
        console.log(this.searchPhrase)
        chrome.bookmarks.search(this.searchPhrase, _.bind(function (marks) {
          this.reset(marks);
        }, this));
      }

    }
  });

}());