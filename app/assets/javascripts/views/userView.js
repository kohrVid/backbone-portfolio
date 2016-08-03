app.views.UserView = Backbone.View.extend({
  tagName: 'section',
  id: 'bio',
  template: _.template($('#user-bio-template').html()),
//  model: app.models.User,

  render: function () {
    var scope = {
      model: this.model
    }
    this.$el.html(this.template(scope));

      /*
      imageUrl: this.model.get('imageUrl'),
      bio: this.model.get('bio'),
      mission: this.model.get('mission'),
      fullName: this.model.fullName()
      model: this.model
    })); */
    return this;

  }
});
