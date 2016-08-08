app.collections.UserList = Backbone.Collection.extend({
  url: "http://localhost:3000/users",
  model: app.models.User,
/*  initialize: function () {
    this.fetch();
  },
  syncCollection: function(this.model) {
    this.sync();
  }*/
});
