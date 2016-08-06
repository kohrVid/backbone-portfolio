var user;
var rendered;
var rendered2;
var rendered3;
var view;
var project1
describe("Project View", function () {
  beforeEach(function () {
    user = new app.models.User({
      firstName: "Ada",
      lastName: "Lovelace",
      imageUrl: "/uploads/ada.jpg",
      bio: "First programmer",
      mission: "To make awesome calculators and not go insane!"
    });
    user.save();
    allProjects = new app.collections.ProjectList();
    project1 = user.projects.create({ title: "Bitbucket", repoUrl: "https://bitbucket.com/something", imageUrl: "/uploads/project.jpg", body: "This is my project" });
    view = new app.views.UserView({ model: user });
    rendered = view.render();
    $("#fixtures").html(rendered.el);
  });

  afterEach(function () {
    $("#fixtures").html("");
  });

  it("should render a project on the show page", function () {
    var projectDiv = rendered.$el.find(".sortable");
    expect(projectDiv.html()).toContain("Bitbucket");
    expect(projectDiv.html()).toContain("https://bitbucket.com/something");
    expect(projectDiv.html()).toContain("/uploads/project.jpg");
    expect(projectDiv.html()).toContain("This is my project");
  });

  it("should render an add new project button", function () {
    expect(rendered.$el.html()).toContain("Add a new project");
  });

  describe("New Project", function () {
    beforeEach(function () {
  //    $("#new-project").trigger("dblclick");
      newView = new app.views.ProjectNewView({ model: user });
      rendered2 = newView.render();
    });
    
    it("should display input for the title", function () {
      var title = rendered2.$el.find("#title");
      expect(title.data("fieldName")).toEqual("title");
    });

    it("should display input for the user's repo URL", function () {
      var repoUrl = rendered2.$el.find("#repoUrl");
      expect(repoUrl.data("fieldName")).toEqual("repoUrl");
    });

    it("should display input for the user's  image URL", function () {
      var imageUrl = rendered2.$el.find("#imageUrl");
      expect(imageUrl.data("fieldName")).toEqual("imageUrl");
    });

    it("should display input for the user's body", function () {
      var body = rendered2.$el.find("#body");
      expect(body.data("fieldName")).toEqual("body");
    });
  
    describe("Project save action", function () {
      beforeEach(function () {

	//project2 = user.projects.create({ title: "Bitbucket2", repoUrl: "https://bitbucket.com/somethingelse", imageUrl: "uploads/project.jpg", body: "This is my project" });

	var editTitle =  $("input[data-field-name=title]");
	editTitle.val("Bitbucket2");
	var editBody =  $("input[data-field-name=body]");
	editBody.val("This is a new project");
	var button = $(".submit");
	button.trigger("submit");
        var userView2 = new app.views.UserView({ model: user });
	rendered3 = userView2.render();   
      });

      it("should display the new user's name", function () {
	expect(rendered3.$el.html()).toContain("Bitbucket2");
      });

      it("should display the new user's mission", function () {
	expect(rendered3.$el.html()).toContain("This is a new project");
      });
    });
  });
});
