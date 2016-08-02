app.models.User = Backbone.Model.extend({
/*  constructor: function () {
    this.firstName = new firstName();
  },*/
  fullName: function () {
    return this.attributes.firstName + " " + this.attributes.lastName;
  /*
   * Or:
   *return [this.get("firstName"), this.get("lastName")].join(" ");
   * */
  }
});
