app.views.ProjectView = Backbone.View.extend({
  tagName: "li",
  template: JST["templates/project"],
  id: "project",

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },
  events: {
    "dblclick .editable": "edit",
    "change .hidden-edit": "update",
    "click .remove-project": "delete"
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

  render: function (){
    this.$el.html(this.template({
	  model: this.model
    }));
    return this;
  },

  delete: function (event) {
    var user = new app.models.User({ id: this.model.attributes.userId });
    this.model.destroy();
  }

});
