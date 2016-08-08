app.views.ProjectView = Backbone.View.extend({
  template: _.template($(".project").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  events: {
    "dblclick .editable": "edit",
    "change input.hidden-edit": "update",
    "click .remove-project": "delete"
  },

  render: function (){
    this.$el.html(this.template({
	  model: this.model
    }));
    return this;
  },

  edit: function (event) {
    $(event.currentTarget).next().show();
    $(event.currentTarget).hide();
  },

  update: function (event) {
    var attribute = $(event.currentTarget).data("field-name");
    this.model.set(attribute, event.currentTarget.value);
    this.model.save();
    $(".hidden-edit").hide();
  },

  delete: function (event) {
    var user = new app.models.User({ id: this.model.attributes.userId });
    this.model.destroy();
  /*  var usersController = new app.controllers.UsersController();
    usersController.show(user.id);*/
  }

});
