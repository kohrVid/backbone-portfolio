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
    project1 = user.projects.create({ title: "Bitbucket", repoUrl: "https://bitbucket.com/something", projectImageUrl: "/uploads/project.jpg", body: "This is my project" });
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
      var projectImageUrl = rendered2.$el.find("#projectImageUrl");
      expect(projectImageUrl.data("fieldName")).toEqual("projectImageUrl");
    });

    it("should display input for the user's body", function () {
      var body = rendered2.$el.find("#body");
      expect(body.data("fieldName")).toEqual("body");
    });
  
    describe("Project save action", function () {
      beforeEach(function () {

	//project2 = user.projects.create({ title: "Bitbucket2", repoUrl: "https://bitbucket.com/somethingelse", projectImageUrl: "uploads/project.jpg", body: "This is my project" });

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

    describe("Editing the project", function () {

      describe("editing the title", function () {
	beforeEach(function () {
	  $(".project-name").trigger("dblclick .editable");
	});

	describe("updating the title", function () {
	  beforeEach(function () {
	    var editBox =  $("input[data-field-name=title]");
	    editBox.val("New Project");
	    editBox.trigger("change");
	  });
	  
	  it("should update the title in the model", function () {
	    expect(rendered.model.get("title")).toEqual("New Project");
	  });

	  it("should display the new title", function () {
	    var title = rendered.$el.find(".sortable");
	    expect(title.html()).toMatch(/New Project/);
	  });

	  it("should hide the edit input box", function () {
	    expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(0);
	  });
	});
      });

      describe("editing the Repo URL", function () {
	beforeEach(function () {
	  $(".project-repoUrl").trigger("dblclick .editable");
	});
	
	describe("updating the Repo URL", function () {
	  beforeEach(function () {
	    var editBox =  $("input[data-field-name=repoUrl]");
	    editBox.val("https://bitbucket.com/elsewhere");
	    editBox.trigger("change");
	  });
	  
	  it("should update the title in the model", function () {
	    expect(rendered.model.get("repoUrl")).toEqual("https://bitbucket.com/elsewhere");
	  });

	  it("should display the new title", function () {
	    var title = rendered.$el.find(".sortable");
	    expect(title.html()).toMatch(/https:\/\/bitbucket.com\/elsewhere/);
	  });

	  it("should hide the edit input box", function () {
	    expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(0);
	  });
	});
      });

      describe("editing the Image URL", function () {
	beforeEach(function () {
	  $(".project-projectImageUrl").trigger("dblclick .editable");
	});

	describe("updating the Image URL", function () {
	  beforeEach(function () {
	    var editBox =  $("input[data-field-name=projectImageUrl]");
	    editBox.val("/uploads/newimage.jpg");
	    editBox.trigger("change");
	  });
	  
	  it("should update the image URL in the model", function () {
	    expect(rendered.model.get("projectImageUrl")).toEqual("/uploads/newimage.jpg");
	  });

	  it("should display the new image URL", function () {
	    var title = rendered.$el.find(".sortable");
	    expect(title.html()).toMatch(/https:\/\/bitbucket.com\/elsewhere/);
	  });

	  it("should hide the edit input box", function () {
	    expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(0);
	  });
	});
      });

      describe("editing the Body", function () {
	beforeEach(function () {
	  $(".body").trigger("dblclick .editable");
	});

	describe("updating the Repo URL", function () {
	  beforeEach(function () {
	    var editBox =  $("input[data-field-name=body]");
	    editBox.val("We went and did something else.");
	    editBox.trigger("change");
	  });
	  
	  it("should update the body in the model", function () {
	    expect(rendered.model.get("body")).toEqual("We went and did something else.");
	  });

	  it("should display the new body", function () {
	    var title = rendered.$el.find(".sortable");
	    expect(title.html()).toMatch(/We went and did something else./);
	  });

	  it("should hide the edit input box", function () {
	    expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(0);
	  });
	});
      });
    });

    describe("Deleting the project", function () {
      beforeEach(function () {
	var deleteButton = "#" + project1.id + " .remove-project";
	$(deleteButton).trigger("dblclick .remove-project");
//	$("#id28383 .remove-project")
      });

      it("should delete the project", function () {
	expect(rendered.model.get("title")).toBe(nil);
	expect(rendered.model.get("projectImageUrl")).toBe(nil);
	expect(rendered.model.get("repoUrl")).toBe(nil);
	expect(rendered.model.get("body")).toBe(nil);
      });

      it("should not display the project", function () {
	var title = rendered.$el.find(".sortable");
	expect(title.html()).not.toContain("/uploads/project.jpg");
	expect(title.html()).not.toContain("https://bitbucket.com/something");
	expect(title.html()).not.toContain("This is my project");
      });
    });
  });
});
