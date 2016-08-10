app.views.UserListView = Backbone.View.extend({
  template: JST["templates/userList"],

  events: {
    "dblclick .addUser": "addUser"
  },
  render: function () {
    var scope = {
      collection: this.collection,
      users: this.collection.models
    };
    this.$el.html(this.template(scope));
    
    return this;
  },

  addUser: function () {
    var controller = new app.controllers.UsersController();
    controller.navigate("users/new", { trigger: true });
  }

});
