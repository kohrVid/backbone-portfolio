app.views.UserView = Backbone.View.extend({
  tagName: 'section',
  id: 'bio',

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.projects, "sync", this.render);
    this.listenTo(this.model.followers, "sync", this.render);
  },
  
  template: JST["templates/user"],
  
  events: {
    "dblclick .editable": "edit",
    "change .hidden-edit": "update",
    "click #add-follower": "addFollower"
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
    var userListView = new app.views.UserListView({ collection: this.model.followers });
    this.$el.find("#follower-list").html($("ul", userListView.render().el));
    return this;
  },

  addFollower: function (event) {
    event.preventDefault();
    var follow = new app.models.Follow({
      followerId: 1, //TODO: this should be the current user
      followedId: this.model.id
    });
    var _this = this;
    follow.save({}, {
      success: function () {
	_this.model.followers.url = "http://localhost:4567/users/" + follow.get("followedId") + "/followers";
       	_this.model.followers.fetch({
	  success: function (followers) {
	    var ids = followers.map(function(follower) { return follower.id; })
	    _this.model.followers.url = "http://localhost:3000/users?ids=" + ids.join(",");
	    _this.model.followers.fetch();
	  }
	});
      }
    });
  }
});

_.extend(app.views.UserView.prototype, app.views.EditableView);
