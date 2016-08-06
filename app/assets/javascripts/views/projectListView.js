app.views.ProjectListView = Backbone.View.extend({
  template: _.template($('#project-list').html()),
  events: {
    "dblclick #new-project": "newProjectLink"
  },
  render: function () {
    this.$el.html(this.template());
    var _this = this;
    _.each(this.collection.models, function (projectItem){
      var projectView = new app.views.ProjectView({ model: projectItem });
      _this.$el.find(".sortable").append(projectView.render().el);
    });
    return this;
  },
  newProjectLink: function () {
    controller = new app.controllers.UsersController();
    controller.navigate(["users", this.model.id, "projects", "new"].join("/"), { trigger: true });
  }
});
