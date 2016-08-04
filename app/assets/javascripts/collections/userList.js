app.collections.UserList = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage("users"),
  model: app.models.User
});
