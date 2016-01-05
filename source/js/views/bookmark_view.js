CMARKS.Views.BookmarkView = Backbone.View.extend({
  template: $('#bookmark-view').html(),
  tagName: "div",
  events: {
    "click a.url": "navigate",
    "click a.delete": "destroy"
  },

  helpers: {
    timeAgo: function () {
      return moment(this.dateAdded).fromNow();
    },
    shortTitle: function () {
      return s.truncate(this.title, 25);
    }
  },

  initialize: function (options) {
    this.model = options.model;
  },

  render: function () {
    var html = Mustache.to_html(this.template,
      _.extend(this.model.toJSON(), this.helpers)
    );

    $(this.el).html(html);
    return this;
  },

  navigate: function (event) {
    event.stopPropagation();
    event.preventDefault();

    chrome.tabs.getSelected(null, _.bind(function (tab) {
      chrome.tabs.update(tab.id, {url: this.model.get('url')});
    }, this));
  },

  destroy: function (event) {
    event.preventDefault();
    event.stopPropagation();

    chrome.bookmarks.remove(this.model.id.toString(), _.bind(function () {
      this.model.destroy();
      this.remove();
    }, this));
  }
});