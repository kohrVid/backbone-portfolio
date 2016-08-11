app.models.Project = Backbone.Model.extend({
  urlRoot: "http://localhost:3000/projects",
/*  initialize: function () {
    if (this.id) this.urlRoot = "http://localhost:3000/users/" + this.userId + "/projects";
  },
  */
  toJSON: function () {
    var pairs = _(this.attributes).map(function(value, key) { 
      return [key.replace(/[A-Z]/g, "_$&").toLowerCase(), value];
    });
    return { project: _.object(_.zip(pairs)) };
  }
});
