describe("UserView", function () {
  var user;
  var view;
  var rendered;
  beforeEach(function () {
    user = new app.models.User({
      firstName: "Tim",
      lastName: "Berners Lee",
      imageUrl: "/uploads/tim.jpg",
      bio: "I invented the internet (sort of)!",
      mission: "Our mission is to make information freely available to all...I think"
    });

    view = new app.views.UserView({ model: user });
  });

  it("should provide a div to act as a container", function () {
    expect(view.el.nodeName).toEqual("SECTION");
  });

  it("should set the ID attribute", function () {
    expect(view.el.id).toEqual("bio");
  });

  describe("render", function () {
    var rendered;
    beforeEach(function () {
      rendered = view.render();
    });

    it("returns the view object", function () {
      expect(rendered).toEqual(view);
    });

    it("should display an image", function () {
      //Below we're using jQuery to find the element
      var image = rendered.$el.find("img");
      expect(image[0].nodeName).toEqual("IMG");
      expect(image.attr("src")).toEqual("/uploads/tim.jpg");
      expect(image.attr("alt")).toEqual("Tim Berners Lee");
    });
    
    it("should display fullName in H1 tags", function () {
      var title = rendered.$el.find("H1");
      expect(title.html()).toMatch(/Tim/);
      expect(title.html()).toMatch(/Berners\ Lee/);
    });

    it("should display biography", function () {
      var biography = rendered.$el.find(".bio");
      expect(biography.html()).toMatch(/I\ invented\ the\ internet\ \(sort of\)!/);
    });

    it("should display the mission", function () {
      var biography = rendered.$el.find(".mission");
      expect(biography.html()).toMatch(/Our\ mission\ is\ to\ make\ information\ freely\ available\ to\ all\.\.\.I\ think/);
    });
    
    describe("events", function () {
      beforeEach(function () {
	$("#fixtures").html(rendered.el);
      });

      afterEach(function () {
	$("#fixtures").html("");
      });

      describe("editing first name", function () {
	beforeEach(function () {
	  // Target the first name of the user with jQuery and trigger a double click event on it
	  $("#edit-first-name").trigger("dblclick .editable");
	});
	/* TODO - Broken test
	it("should replace the name with an input box", function () {
	  expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(1);
	});
*/
	describe("updating the first name", function () {
	  beforeEach(function () {
	    var editBox =  $("input[data-field-name=firstName]");//$("#edit-first-name").next("input.hidden-edit");
	    editBox.val("Sally");
	    editBox.trigger("change");
	  });
	  
	  it("should update the name in the model", function () {
	    expect(rendered.model.get("firstName")).toEqual("Sally");
	  });

	  it("should display the new first name", function () {
	    var title = rendered.$el.find("H1");
	    expect(title.html()).toMatch(/Sally/);
	    expect(title.html()).toMatch(/Berners\ Lee/);
	  });

	  it("should hide the edit input box", function () {
	    expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(0);
	  });
	});
      });

      describe("editing last name", function () {
	beforeEach(function () {
	  $("#edit-lastName").trigger("dblclick");
	});

	/* TODO - Broken test
	it("should replace the name with an input box", function () {

	  expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(1);
	});
	*/

	describe("updating last name", function () {
	  var editBox;

	  beforeEach(function () {
	    //FIll in the innput box and update it
	    var editBox = $("input[data-field-name=lastName]");// $("#edit-last-name").next("input.hidden-edit");
	    editBox.val("Smith");
	    editBox.trigger("change");  
	  });
	  
	  it("should update the name in the model", function () {
	    expect(rendered.model.get("lastName")).toEqual("Smith");
	  });

	  it("should display the new last name", function () {
	    var title = rendered.$el.find("H1");
	    expect(title.html()).toMatch(/Tim/);
	    expect(title.html()).toMatch(/Smith/);
	  });

	  it("should hide the edit input box", function () {
	    expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(0);
	  });
	});
      });

      describe("editing biography", function () {
	beforeEach(function () {
	  $("#edit-biography").trigger("dblclick");
	});

	/* TODO - broken test
	it("should replace the paragraph with an input box", function () {
	  expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(1);
	});
	*/

	describe("updating biography", function () {
	  var editBox;
	  beforeEach(function () {
	    var editBox = $("input[data-field-name=bio]");
	    editBox.val("I like cats that play piano");
	    editBox.trigger("change");  
	  });
	  
	  it("should update the biography in the model", function () {
	    expect(rendered.model.get("bio")).toEqual("I like cats that play piano");
	  });

	  it("should display the new biography", function () {
	    var biography = rendered.$el.find(".bio");
	    expect(biography.html()).toMatch(/I\ like\ cats\ that\ play\ piano/);
	  });

	  it("should hide the edit input box", function () {
	    expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(0);
	  });
	});
      });


      describe("editing mission", function () {
	beforeEach(function () {
	  $("#edit-mission").trigger("dblclick");
	});

	/* TODO - broken test
	it("should replace the paragraph with an input box", function () {
	  expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(1);
	});
	*/

	describe("updating mission", function () {
	  var editBox;
	  beforeEach(function () {
	    var editBox = $("input[data-field-name=mission]");
	    editBox.val("Bring cats to a screen near you!");
	    editBox.trigger("change");  
	  });
	  
	  it("should update the biography in the model", function () {
	    expect(rendered.model.get("mission")).toEqual("Bring cats to a screen near you!");
	  });

	  it("should display the new biography", function () {
	    var mission = rendered.$el.find(".mission");
	    expect(mission.html()).toMatch(/Bring cats to a screen near you!/);
	  });

	  it("should hide the edit input box", function () {
	    expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(0);
	  });
	});
      });

      describe("editing imageUrl", function () {
	beforeEach(function () {
	  $(".bio-image").trigger("dblclick");
	});

	/* TODO - broken test
	it("should replace the image with an input box", function () {
	  expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(1);
	});
	*/

	describe("updating imageUrl", function () {
	  var editBox;
	  beforeEach(function () {
	    var editBox = $("input[data-field-name=imageUrl]");
	    editBox.val("/uploads/newPic.jpg");
	    editBox.trigger("change");  
	  });
	  
	  it("should update the imageUrl in the model", function () {
	    expect(rendered.model.get("imageUrl")).toEqual("/uploads/newPic.jpg");
	  });

	  it("should display the new image", function () {
	    var image = rendered.$el.find(".bio-image");
	    expect(image.attr("src")).toEqual("/uploads/newPic.jpg");
	  });

	  it("should hide the edit input box", function () {
	    expect(rendered.$el.find("input.hidden-edit:visible").length).toBe(0);
	  });
	});
      });

      describe("persisting users", function () {
	beforeEach(function () {
	  user = new app.models.User({
	    id: localStorage.users.split(",")[1]
	  });
	  user.fetch();
	  $("#edit-firstName").trigger("dblclick");
	  $("input[data-field-name=firstName]").val("Marcus").trigger("change");  
	  $("#edit-mission").trigger("dblclick");
	  $("input[data-field-name=mission]").val("Bring cats to a screen near you!").trigger("change");  
	 // window.onload = function () {
	    if(!window.location.hash) {
	      window.location = window.location + "#loaded";
	      window.location.reload();
	   }
	//  };
          
	});

	it("should update the edited fields in the model", function () {
	  expect(rendered.model.get("mission")).toEqual("Bring cats to a screen near you!");
	  expect(rendered.model.get("firstName")).toEqual("Marcus");
	});

	it("should display the new fields when the users refreshes the page", function () {
	  var mission = rendered.$el.find(".mission");
	  expect(mission.html()).toMatch(/Bring cats to a screen near you!/);
	  var firstName = rendered.$el.find("H1");
	  expect(firstName.html()).toMatch(/Marcus/);
	});
      });
    });
  });


});
