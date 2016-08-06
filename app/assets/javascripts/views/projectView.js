app.views.ProjectView = Backbone.View.extend({
  template: _.template($(".project").html()),
  render: function (){
    this.$el.html(this.template({
	  model: this.model
    }));
    return this;
  }
});
