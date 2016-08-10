app.collections.UserList = Backbone.Collection.extend({
  url: "http://localhost:3000/users",
  model: app.models.User,
/*  initialize: function () {
    this.listenTo(this.users, "add", this.setUserId);
    this.listenTo(this, "sync", syncCollection);
  },
  syncCollection: function(this.model) {
    this.sync();
  }
*/});
