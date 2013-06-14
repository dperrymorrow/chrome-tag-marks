(function () {
  "use strict";
  window.CMARKS.Views.BookmarksIndexView = Backbone.View.extend({
    template: $('#bookmark-index').html(),
    // the wrapper
    tagName: "div",
    collection: {},
    // functions to fire on events
    events: {
      // "click a.delete": "destroy"
      "click a.url": "navigate"
    },

    // the constructor
    initialize: function (options) {
      this.collection = options.collection;
      this.collection.bind('reset', this.render, this);
      this.collection.fetch();
    },

    navigate: function (event) {
      var $link = $(event.target);
      chrome.tabs.getSelected(null,function(tab) {
        chrome.tabs.update(tab.id, {url: $link.attr('href')});
      });
      // window.close(); // To close the popup.
    },

    // populate the html to the dom
    render: function () {
      console.dir(this.collection.toJSON());

      var html = Mustache.to_html(this.template, {
        bookmarks: this.collection.toJSON(),
        title: "Recent Bookmarks"
      });

      $(this.el).html(html);
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