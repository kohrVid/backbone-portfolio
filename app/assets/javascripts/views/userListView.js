app.views.UserListView = Backbone.View.extend({
  template: JST["templates/userList"],
  render: function () {
    var scope = {
      collection: this.collection,
      users: this.collection.models
    };
    this.$el.html(this.template(scope));
    
    return this;
  }
});
