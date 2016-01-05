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