app.views.UserView = Backbone.View.extend({
  tagName: 'section',
  template: _.template($('#user-bio-template').html()),
  id: 'bio',

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  events: {
    "dblclick .editable": "edit",
    "change input.hidden-edit": "update",
  //  "blur input.hidden-edit": "render"
  },

  render: function () {
    var scope = {
      model: this.model
    };
    this.$el.html(this.template(scope));
    return this;
  },

  edit: function (event) {
//    $(".hidden-edit").hide();
//    debugger;
    $(event.currentTarget).next().show();
    $(event.currentTarget).hide()
  },

  update: function (event) {
    //Get the value of the edit box
    //Set the value on the model
    var attribute = $(event.currentTarget).data("field-name");
    this.model.set(attribute, event.currentTarget.value);
    /* One way of saving stuff:
    changes = {};
    changes[attributes] = event.currentTarget.value;
    this.model.save(changes);
    */
    this.model.save();
    $(".hidden-edit").hide();
    //update the view (re-rendering)
   // this.render();
   // the observer should call render for you
  }
});
