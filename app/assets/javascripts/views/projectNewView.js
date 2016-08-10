app.views.ProjectNewView = Backbone.View.extend({
  template: JST["templates/projectNew"],
/*initialize: function () {
    this.listenTo(this.model, "submit", this.render);
  },
*/
  events: {
//    "submit": "save"
  },
/*
  save: function (event) {
    var title = $(event.currentTarget).find("input[data-field-name=title]").val();
    var repoUrl = $(event.currentTarget).find("input[data-field-name=repoUrl]").val();
    var imageUrl = $(event.currentTarget).find("input[data-field-name=projectImageUrl]").val();
    var body = $(event.currentTarget).find("input[data-field-name=body]").val();
    var userId = this.model.id;
    var project = this.model.projects.create({
      title: title, repoUrl: repoUrl,
      projectImageUrl: projectImageUrl, body: body
    });
    project.save();
    var controller = new app.controllers.UsersController();
    controller.navigate(["users", userId].join("/"), { trigger: true });
  },
*/
  render: function () {
    var scope = {
      model: this.model
    };
    this.$el.html(this.template(scope));
    return this;
  }
});
