app.views.HomeView = Backbone.View.extend({
  events: {
    "click a.users-index": "userIndex"
  },
  template: JST["templates/home"],

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  userIndex: function (event) {
    event.preventDefault();
    var usersController = new app.controllers.UsersController();
    usersController.navigate("users", { trigger: true });

  }
});
