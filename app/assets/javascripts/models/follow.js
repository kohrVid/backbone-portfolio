app.models.Follow = Backbone.Model.extend({
  url: function () {
    return "http://localhost:4567/users/" + this.get("followedId") + "/follows?follower_id=" + this.get("followerId")
  }
})
