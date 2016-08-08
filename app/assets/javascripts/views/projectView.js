app.views.ProjectView = EditableView.extend({
  tagName: "li",
  template: _.template($(".project").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  events: {
    "click .remove-project": "delete"
  },

  render: function (){
    this.$el.html(this.template({
	  model: this.model
    }));
    return this;
  },

  delete: function (event) {
    var user = new app.models.User({ id: this.model.attributes.userId });
    this.model.destroy();
  /*  var usersController = new app.controllers.UsersController();
    usersController.show(user.id);*/
  }

});
