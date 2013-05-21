// chrome.bookmarks.search('javascript', function (result){
//   console.dir(result);
//   $("content").html(result.toString());
// });


App = Ember.Application.create();


App.Router.map(function() {
  return this.route('bookmarks', {
    path: '/'
  });
});

App.BookmarksRoute = Ember.Route.extend({
  setupController: function(controller) {
    return controller.set('content', []);
  }
});


App.BookmarksController = Ember.Controller.extend({
  bookmarks: [],

  addBookmark: function() {
    this.bookmarks.pushObject(Ember.Object.create({
      name: this.get('newName')
    }));
    return this.set('newName', "");
  }
});



// App.IndexRoute = Ember.Route.extend({
//   model: function() {
//     return ['red', 'yellow', 'blue'];

//     // debugger

//     // chrome.bookmarks.search('javascript', function (result){
//     //   console.dir(result);
//     //   return result;
//     // });
//   }
// });


