describe("User", function () {
  var user;
  beforeEach(function () {
    user = new app.models.User({
      firstName: "Dan",
      lastName: "Garland"
    });
    user.save()
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

  describe("projects", function () {
    var allProjects;
    //Create a project that isn't associated with the user
    beforeEach(function () {
      allProjects = new app.collections.ProjectList();
      allProjects.create({ title: "Some other project" });
 //     someOtherProject.save();

      //create a project associated with the user
      user.projects.create({ title: "My Amazing Project" });
    });

    afterEach(function () {
      localStorage.clear();
    });
/*
    it("should avoid pulling in projects for unsaved users", function () {
      var unsavedUser = new app.models.User();
      expect(unsavedUser.projects.length).toEqual(0);
    });
  */  
    it("should only pull in related projects", function () {
      //Test that we're only loading the associated project
      var reloadedUser = new app.models.User({ id: user.id });
      reloadedUser.fetch();
      expect(reloadedUser.projects.length).toEqual(1);
      expect(reloadedUser.projects.first().get("title")).toEqual("My Amazing Project");
    });
  });
});
