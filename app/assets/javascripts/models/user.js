app.models.User = Backbone.Model.extend({
  localStorage: new Backbone.LocalStorage("users"),
  fullName: function () {
    return this.attributes.firstName + " " + this.attributes.lastName;
  }
});
