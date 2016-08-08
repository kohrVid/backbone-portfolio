app.models.User = Backbone.Model.extend({
  url: "http://localhost:3000/users",

  initialize: function () {
    this.projects = new app.collections.ProjectList();
    this.projects.url = "http://localhost:3000/users/" + this.id + "/projects";
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
  },

  toJSON: function () {
    var pairs = _(this.attributes).map(function(value, key) { 
      return [key.replace(/[A-Z]/g, "_$&").toLowerCase(), value];
    });
    return _.object(_.zip(pairs));
   /* return {
      first_name: this.get("firstName"),
      last_name: this.get("lastName")//,
      //.replace(/[A-Z]/g, "_$&").toLowerCase()
      //_().map(function(v,k) { return k.replace(/[A-Z]/g, "_$&").toLowerCase()})
    }*/
  }
});
