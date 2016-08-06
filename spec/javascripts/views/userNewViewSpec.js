var rendered;
var view;
var user;
describe("UserNew", function () {
  beforeEach(function () {
    user = new app.models.User();
    view = new app.views.UserNewView({ model: user });
    rendered = view.render();
  });

  it("should display input for the user's first name", function () {
    var firstName = rendered.$el.find("#firstName");
    expect(firstName.data("fieldName")).toEqual("firstName");
  });

  it("should display input for the user's last name", function () {
    var lastName = rendered.$el.find("#lastName");
    expect(lastName.data("fieldName")).toEqual("lastName");
  });

  it("should display input for the user's  avatar", function () {
    var imageUrl = rendered.$el.find("#imageUrl");
    expect(imageUrl.data("fieldName")).toEqual("imageUrl");
  });

  it("should display input for the user's biography", function () {
    var biography = rendered.$el.find("#bio");
    expect(biography.data("fieldName")).toEqual("bio");
  });

  it("should display input for the user's mission", function () {
    var mission = rendered.$el.find("#mission");
    expect(mission.data("fieldName")).toEqual("mission");
  });

  describe("User save action", function () {
    beforeEach(function () {
      var editName =  $("input[data-field-name=firstName]");
      editName.val("Sally");
      var editMission =  $("input[data-field-name=mission]");
      editMission.val("To do something cool");
      var button = $(".submit");
      button.trigger("click");
      view2 = new app.views.UserShowView({ model: user });
      rendered = view2.render();   
    });

    it("should display the new user's name", function () {
      expect(rendered.$el.html()).toContain("Sally");
    });

    it("should display the new user's mission", function () {
      expect(rendered.$el.html()).toContain("To do something cool");
    });
  });
});
