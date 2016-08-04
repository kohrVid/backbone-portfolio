app.controllers.UsersController = Backbone.Router.extend({
  routes: {
    "": "home",
    "root": "home",
    "users": "index",
    "users/:id": "show"
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

    //1. Write a jasmine test for the UserListView page that takes a collection of users nd displays a ul/li list of users avatars (thumbnail and fullname)
    //2. Add a show link to each user so that I can click on it and display an individual user
    //3. Add a show action to this controller that loads the given users by its ID
    //4. Add a new action so that I can fill in a blank user and save them to the localStorage.
  },

  home: function () {
    //load any data (if necessary)
    
    //select a view to display as the output
    var view = new app.views.HomeView();
    $("main#content").html(view.render().el);
  }
});
