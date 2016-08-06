app.collections.ProjectList = Backbone.Collection.extend({
  localStorage: new Backbone.LocalStorage("projects"),
  model: app.models.Project
  
});
