app.views.UserView = Backbone.View.extend({
  tagName: 'section',
  id: 'bio',

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.projects, "sync", this.render);
  },
  
  template: JST["templates/user"],
  
  events: {
    "dblclick .editable": "edit",
    "change .hidden-edit": "update"
  },

  edit: function (event) {
    $(event.currentTarget).hide().next().show().focus();
  },

  update: function (event) {
    var attribute = $(event.currentTarget).data("field-name");
    this.model.set(attribute, event.currentTarget.value);
    this.model.save();
    $("form#user-view-form").submit();
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

_.extend(app.views.UserView.prototype, app.views.EditableView);
