(function () {
  "use strict";

  window.CMARKS             = window.CMARKS || {};
  window.CMARKS.Models      = window.CMARKS.Models || {};
  window.CMARKS.Collections = window.CMARKS.Collections || {};
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

    fetch: function () {
      // this.reset([{name: "foo"}, {name: "bar"}]);
      // return

      chrome.bookmarks.getRecent(100, _.bind(function (marks) {
        this.reset(marks);
      }, this));
    }
  });

}());