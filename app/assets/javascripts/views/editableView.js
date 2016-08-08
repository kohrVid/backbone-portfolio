app.views.EditableView = Backbone.View.extend({
  /*initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },
*/
  events: {
    "dblclick .editable": "edit",
    "change input.hidden-edit": "update",
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
  }
});
