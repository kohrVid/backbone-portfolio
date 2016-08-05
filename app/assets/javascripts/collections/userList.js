app.collections.UserList = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage("users"),
  model: app.models.User,
/*  initialize: function () {
    this.fetch();
  },
  syncCollection: function(this.model) {
    this.sync();
  }*/
});
