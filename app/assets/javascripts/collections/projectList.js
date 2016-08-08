app.collections.ProjectList = Backbone.Collection.extend({
//  localStorage: new Backbone.LocalStorage("projects"),
  url: "http://localhost:3000/projects",
  model: app.models.Project
  
});
