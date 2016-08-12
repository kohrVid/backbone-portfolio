app.collections.UserList = Backbone.Collection.extend({
  url: "http://localhost:3000/users",
  model: app.models.User,
});
