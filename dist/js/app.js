window.CMARKS = {
  Routers: {},
  Models: {},
  Collections: {},
  Views: {}
};

CMARKS.Routers.AppRouter = Backbone.Router.extend({
  _instance: null,
  bookmarks: {},

  routes: {
    "bookmark/new": "new",
    "bookmarks/index": "index",
    "bookmark/:id/edit": "edit",
    "bookmark/:id/destroy": "destroy"
  },

  initialize: function (options) {
    this._instance = this;
    this.bookmarks = new CMARKS.Collections.BookmarksCollection();
    this.searchView = new CMARKS.Views.BookmarksSearchView({collection: this.bookmarks});
    $('#search-container').html(this.searchView.render().el);
  },

  index: function () {
    this.view = new CMARKS.Views.BookmarksIndexView({collection: this.bookmarks});
    $('#content').html(this.view.render().el);
  },

  destroy: function (id) {},
  edit: function (id) {},

  getInstance: function () {
    this._instance = this._instance || new CMARKS.Routers.AppsRouter();
    return this._instance;
  }
});


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

CMARKS.Views.BookmarksIndexView = Backbone.View.extend({
  tagName: "div",
  template: $('#bookmark-index').html(),
  collection: {},
  events: {},

  initialize: function (options) {
    this.collection = options.collection;
    this.collection.bind('reset', this.render, this);
    this.collection.bind('reset', this.timeAgo, this);
    this.collection.bind('remove', this.timeAgo, this);
    this.collection.fetch();
  },

  render: function () {
    _.each(this.collection.models, $.proxy(this, 'addOne'));
    return this;
  },

  timeAgo: function () {
    var lastStamp = '';
    this.$el.find('.time-ago').each(function () {
      var $stamp = $(this);

      if ($stamp.text() === lastStamp) {
        $stamp.hide();
      } else {
        $stamp.show();
      }

      lastStamp = $stamp.text();
    });
  },

  addOne: function (model) {
    var single = new CMARKS.Views.BookmarkView({model: model});
    this.$el.prepend(single.render().el);
  }
});

CMARKS.Views.BookmarksSearchView = Backbone.View.extend({
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

CMARKS.app = {
  initialize: function () {
    var router = new CMARKS.Routers.AppRouter();
    router.index();
  }
};

CMARKS.app.initialize();