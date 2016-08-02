app.views.UserView = Backbone.View.extend({
  tagName: 'section',
  id: 'bio',
  template: _.template($('#user-bio-template').html()),

  render: function () {
    this.$el.html(this.template({
      imageUrl: this.model.get('imageUrl'),
      bio: this.model.get('bio'),
      mission: this.model.get('mission'),
      fullName: this.model.fullName()
    })); 
    return this;

  }
});
