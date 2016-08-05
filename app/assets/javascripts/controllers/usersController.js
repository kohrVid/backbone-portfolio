app.controllers.UsersController = Backbone.Router.extend({
  routes: {
    "": "home",
    "root": "home",
    "users": "index",
    "users/new": "new",
    "users/:id": "show"
  },

  new: function() {
//    var users = new app.collections.UserList();
  //  users.fetch();
    var user = new app.models.User();
    var view = new app.views.UserNewView({ model: user });
    $("main#content").html(view.render().el);
  },

  show: function(id) {
//    var users = new app.collections.UserList();
    var user = new app.models.User( {id: id} );
    user.fetch();
    var view = new app.views.UserShowView({ model: user });
    $("main#content").html(view.render().el);
  },

  index: function () {
    var users = new app.collections.UserList();
    users.fetch();

    var view = new app.views.UserListView({ collection: users });
    $("main#content").html(view.render().el);
  },

  home: function () {
    //load any data (if necessary)
    
    //select a view to display as the output
    var view = new app.views.HomeView();
    $("main#content").html(view.render().el);
  }
});
