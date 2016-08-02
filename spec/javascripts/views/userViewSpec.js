describe("UserView", function () {
  var view;
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
      expect(title.html()).toEqual("Tim Berners Lee");
    });

    it("should display biography", function () {
      var biography = rendered.$el.find(".bio");
      expect(biography.html()).toEqual("I invented the internet (sort of)!");
    });

    it("should display the mission", function () {
      var biography = rendered.$el.find(".mission");
      expect(biography.html()).toEqual("Our mission is to make information freely available to all...I think");
    });
  });
});
