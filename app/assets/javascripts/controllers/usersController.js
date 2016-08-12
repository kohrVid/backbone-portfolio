app.controllers.UsersController = Backbone.Router.extend({
  routes: {
    "": "home",
    "root": "home",
    "users": "index",
    "users/new": "newUser",
    "users/:id": "show",
    "users/:id/projects/new": "newProject"
  },

  newUser: function() {
    var user = new app.models.User();
//    user.fetch({
  //    error: function (user) {
	var view = new app.views.UserNewView({ model: user });
	$("main#content").html(view.render().el);
//      }
  //  });
  },

  show: function(id) {
    var user = new app.models.User({ id: id });
    user.fetch({
      success: function (user) {
	var view = new app.views.UserView({ model: user });
	$("main#content").html(view.render().el);
      }
    });
  },

  index: function () {
    var users = new app.collections.UserList();
    users.fetch({
      success: function (users) {
	var view = new app.views.UserListView({ collection: users });
	$("main#content").html(view.render().el);
      }
    });
  },

  home: function () {
    var view = new app.views.HomeView();
    $("main#content").html(view.render().el);
  },

  newProject: function (id) {
    var user = new app.models.User({ id: id });
    user.fetch();
    var view = new app.views.ProjectNewView({ model: user });
    $("main#content").html(view.render().el);
  }
});
