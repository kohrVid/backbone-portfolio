app.views.UserListView = Backbone.View.extend({
  render: function () {
//    var scope = {
    var collection = this.collection;
    var users = this.collection.models;
  //  };
    
    this.$el.html("<h1>User List</h1><ul>");
    for (var i = 0; i < users.length; i++) {
      this.$el.append('<li>');
      this.$el.append('<strong><a id="' + users[i].get("id") +'" href="#users/' + users[i].get("id") +'">' + users[i].fullName() + '</a></strong>');
      this.$el.append('<img src="' + users[i].get("imageUrl") + '">');
      this.$el.append('</li>');
    }
    this.$el.append("</ul>");
    return this;
  }
});
