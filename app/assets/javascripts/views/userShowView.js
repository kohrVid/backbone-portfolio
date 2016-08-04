app.views.UserShowView = Backbone.View.extend({
  render: function () {
    var scope = {
      model: this.model
    };
//    var collection = this.collection;
//    var model = this.collection.models;
  //  };
    
    this.$el.html("<h1>" + this.model.fullName() + "</h1>");
    this.$el.append('<img src="' + this.model.get("imageUrl") + '">');
    this.$el.append('<ul>');
    this.$el.append('<li><strong> First Name:</strong> ' + this.model.get("firstName") + '</li>');
    this.$el.append('<li><strong> Last Name:</strong> ' + this.model.get("lastName") + '</li>');
    this.$el.append('<li><strong> Biography:</strong> ' + this.model.get("bio") + '</li>');
    this.$el.append('<li><strong> Mission:</strong> ' + this.model.get("mission") + '</li>');
    this.$el.append('</ul>');
    return this;
  }
});
