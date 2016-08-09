app.views.UserView = Backbone.View.extend({
  tagName: 'section',
 // template: _.template($('#user-bio-template').html()),
  id: 'bio',

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  events: {
    "dblclick .editable": "edit",
    "change .hidden-edit": "update"
  },

  template: JST["templates/user"],

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

  render: function () {
    var scope = {
      model: this.model
    };
    this.$el.html(this.template(scope));
    var projectListView = new app.views.ProjectListView({
      collection: this.model.projects, model: this.model 
    });
    this.$el.find("#projects").append(projectListView.render().el);
    return this;
  }

});
