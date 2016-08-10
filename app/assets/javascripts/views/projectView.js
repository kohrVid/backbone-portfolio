app.views.ProjectView = Backbone.View.extend({
  tagName: "li",
  template: JST["templates/project"],
  id: "project",

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
  }

});
_.extend(app.views.ProjectView.prototype, app.views.EditableView);
