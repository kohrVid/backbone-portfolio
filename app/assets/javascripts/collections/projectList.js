app.collections.ProjectList = Backbone.Collection.extend({
//  localStorage: new Backbone.LocalStorage("projects"),
  model: app.models.Project,
  initialize: function () {
    this.url = "http://localhost:3000/users/"+ this.model.id + "/projects";
  }
});
