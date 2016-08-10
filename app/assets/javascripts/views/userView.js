app.views.UserView = Backbone.View.extend({
  tagName: 'section',
 // template: _.template($('#user-bio-template').html()),
  id: 'bio',

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.projects, "sync", this.render);
  },
  
  template: JST["templates/user"],
  
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
