app.views.UserNewView = Backbone.View.extend({
  initialize: function () {
      this.listenTo(this.model, "submit", this.render);
  },

  template: JST["templates/userNew"],
  events: {
    "click .submit": "save"
  },

  save: function () {
    var firstName = $("input[data-field-name=firstName]").val();
    var lastName = $("input[data-field-name=lastName]").val();
    var imageUrl = $("input[data-field-name=imageUrl]").val();
    var bio = $("input[data-field-name=bio]").val();
    var mission = $("input[data-field-name=mission]").val();
    var user = new app.models.User({ 
      firstName: firstName, lastName: lastName,
      imageUrl: imageUrl, bio: bio,
      mission: mission
    });
    user.save();
    /*
    var controller = new app.controllers.UsersController();
    controller.navigate("root", { trigger: true });
*/  },

  render: function () {
    var scope = {
      model: this.model
    };
    this.$el.html(this.template(scope));
    return this;
  }
});
