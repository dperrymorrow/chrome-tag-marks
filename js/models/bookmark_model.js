(function () {
  "use strict";

  window.CMARKS             = window.CMARKS || {};
  window.CMARKS.Models      = window.CMARKS.Models || {};
  window.CMARKS.Collections = window.CMARKS.Collections || {};
  window.CMARKS.Models.BookmarkModel = Backbone.Model.extend({

    // the default fields
    url: 'fooo',
    defaults: {
      name: ""
    },

    // the constructor
    initialize: function (options) {

    }

  });

  window.CMARKS.Collections.BookmarksCollection = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: CMARKS.Models.BookmarkModel,
    url: 'foo',

    fetch: function () {
      console.log('hhhhh')
      this.reset([{name: "foo"}, {name: "bar"}]);
      return

      chrome.bookmarks.getRecent(5, _.bind(function (marks) {
        this.reset(marks);
      }, this));
    }
  });

}());