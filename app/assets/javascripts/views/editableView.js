app.views.EditableView = Backbone.View.extend({
  /*initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },
*/
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
    $(".hidden-edit").hide();

    //REQUEST
    // 1. serialise the data with the model into a string
    // 2. Send it to rails via AJAX (jQuery)
    // 2a. POST /users
    // 2b. Deserialise request headers
    // 3. Rails routes the request to usersController#create
    //
    // RESPONSE
    // 1. Rails instantiate a User model
    // 2. Mass-assign the whitelisted params
    // 3. Save into the database (SQL)
    // 4. Respond with 201 OK
    // 5. jQuery success callback kicks in
    // 6. Serialise the response body into a Backbone model
  }
});
