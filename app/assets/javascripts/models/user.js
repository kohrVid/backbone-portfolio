app.models.User = Backbone.Model.extend({
  localStorage: new Backbone.LocalStorage("users"),

  initialize: function () {
    this.projects = new app.collections.ProjectList();
    this.projects.fetch();
    this.listenTo(this.projects, "add", this.setUserId);
    this.listenTo(this, "sync", this.resetProjects);
  },

  fullName: function () {
    return this.attributes.firstName + " " + this.attributes.lastName;
  },

  setUserId: function (project) {
    project.set("userId", this.id);
  },

  resetProjects: function () {
    if (this.id) this.projects.reset(this.projects.where({ userId: this.id }));
  }
});
