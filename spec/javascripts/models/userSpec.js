describe("User", function () {
  var user;
  var successCallback;
  var response;
  var reloadedUser;
  beforeEach(function () {
    jasmine.Ajax.install();
    
    successCallback = jasmine.createSpy("onSuccess");

    user = new app.models.User({
      firstName: "Dan",
      lastName: "Garland"
    });
    user.save({}, {
      success: successCallback
    });
  });

  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  it("should persist via AJAX with a POST to /users", function () {
    var createRequest = jasmine.Ajax.requests.mostRecent();
    expect(createRequest.url).toBe("http://localhost:3000/users");
    expect(createRequest.method).toBe("POST");
    expect(createRequest.data()).toEqual({
      first_name: "Dan",
      last_name: "Garland"
    });
  });

  describe("on successful save()", function () {
    beforeEach(function () {
      var response = {
	status: 201,
	responseText: JSON.stringify({
	  firstName: "Dan",
	  lastName: "Garland"
	})
      }

      var request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(response);
    });

    it("return the saved user as JSON", function () {
      expect(successCallback).toHaveBeenCalled();
      var successArgs = successCallback.calls.mostRecent().args;
//	expect(successArgs.length).toEqual(1);
      expect(successArgs[0]).toEqual(jasmine.any(app.models.User));
      expect(successArgs[0]).get("firstName").toBe("Dan");
      expect(successArgs[0]).get("lastName").toBe("Garland");
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
    });
  });

  describe("projects", function () {
    var allProjects;
    //Create a project that isn't associated with the user
    beforeEach(function () {
      reloadedUser = new app.models.User({ id: user.id });
      response = {
	status: 200,
	responseText: JSON.stringify([{ title: "My Amazing Project" }])
      }
      /*
      allProjects = new app.collections.ProjectList();
      allProjects.create({ title: "Some other project" });

      //create a project associated with the user
      user.projects.create({ title: "My Amazing Project" });
      */
    });
    
    it("should only pull in related projects", function () {
      //Test that we're only loading the associated project
      
      var request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(response);
      expect(request.url).toBe("http://localhost:3000/users/" + user.id + "/projects");
      expect(request.method).toBe("GET");

      expect(reloadedUser.projects.length).toEqual(1);
      expect(reloadedUser.projects.first().get("title")).toEqual("My Amazing Project");
      expect(reloadedUser.projects.first().get("userId")).toEqual(user.id);      
    });
  });
});
