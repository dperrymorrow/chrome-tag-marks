(function () {
  "use strict";
  window.CMARKS = window.CMARKS || {};
  window.CMARKS.Views = window.CMARKS.Views || {};

  window.CMARKS.Views.BookmarksIndexView = Backbone.View.extend({
    template: $('#bookmark-index').html(),
    // the wrapper
    tagName: "div",
    collection: {},
    // functions to fire on events
    events: {
      // "click a.delete": "destroy"
    },

    // the constructor
    initialize: function (options) {
      this.collection = options.collection;
      this.collection.bind('reset', this.render, this);
      this.collection.fetch();
    },

    // populate the html to the dom
    render: function () {
      $(this.el).html(Mustache.to_html(this.template, {bookmarks: this.collection.toJSON()}));
      return this;
    }

    // // delete the model
    // destroy: function (event) {
    //   event.preventDefault();
    //   event.stopPropagation();

    //   this.model.destroy();
    //   this.remove();
    // }
  });
}());