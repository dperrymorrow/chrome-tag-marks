(function () {
  "use strict";
  window.CMARKS.Views.BookmarksSearchView = Backbone.View.extend({

    tagName: "div",
    template: $('#search-view').html(),
    events: {
      "keyup #search-field": "search"
    },

    initialize: function (options) {
      this.collection = options.collection;
    },

    search: function (event) {
      this.collection.searchPhrase = $(event.target).val();
      this.collection.fetch();
    },

    render: function () {
      $(this.el).html(this.template, {});
      return this;
    }
  });
}());