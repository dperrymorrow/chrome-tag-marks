chrome.bookmarks.search('javascript', function (result){
  console.dir(result);
  $("content").html(result.toString());
});


App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    // return ['red', 'yellow', 'blue'];

    // debugger

    chrome.bookmarks.search('javascript', function (result){
      console.dir(result);
      return result;
    });
  }
});
