(function () {
  "use strict";
  window.CMARKS.Views.BookmarksSearchView = Backbone.View.extend({
    template: $('#search-view').html(),
    // the wrapper
    tagName: "div",
    events: {
      "keyup #search-field": "search"
    },
    // the constructor
    initialize: function (options) {
      // model is passed through
      this.collection = options.collection;
    },

    search: function (event) {
      this.collection.searchPhrase = $(event.target).val();
      this.collection.fetch();
    },

    // populate the html to the dom
    render: function () {
      $(this.el).html(this.template, {});
      return this;
    }
  });
}());