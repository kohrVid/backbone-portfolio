describe("User", function () {
  var user;
  beforeEach(function () {
    user = new app.models.User({
      firstName: "Dan",
      lastName: "Garland"
    });
  });

  describe("get", function () {
    it("should retrieve a given value", function () {
      expect(user.get("firstName")).toEqual("Dan");
    });
  });

  describe("set", function () {
    it("should set a given falue", function () {
      user.set("lastName", "Garland");
      expect(user.get("lastName")).toEqual("Garland");
    });
  });

  describe("A massive GOTCHA", function () {
    it("is easy to confuse get/set with dynamic attributes", function () {
      expect(user.firstName).not.toEqual(user.get("firstName"));
      expect(user.attributes.firstName).toEqual(user.get("firstName"));
    });
  });

  describe("fullName", function () {
    it("concatenates the first and last name together", function () {
      expect(user.fullName()).toEqual("Dan Garland");
    })
  });
});
