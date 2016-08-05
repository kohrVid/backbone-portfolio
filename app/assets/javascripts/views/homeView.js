app.views.HomeView = Backbone.View.extend({
  events: {
    "click a.users-index": "userIndex"
  },
  render: function () {
    this.$el.html("<h1>Welcome to our lovely warm SPA</h1>");
    this.$el.append('<a class="users-index" href="#users">Meet the users!</a>');
    return this;
  },

  userIndex: function (event) {
    event.preventDefault();
    var usersController = new app.controllers.UsersController();
    usersController.navigate("users", { trigger: true });

  }
});
