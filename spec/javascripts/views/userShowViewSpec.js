var rendered;
var userList;
var rendered;
var user1;
var user2;
describe("UserShow", function () {
  beforeEach(function () {
    user1 = new app.models.User({
      firstName: "Tim",
      lastName: "Berners Lee",
      imageUrl: "/uploads/tim.jpg",
      bio: "I invented the internet (sort of)!",
      mission: "Our mission is to make information freely available to all...I think"
    });
    
    user2 = new app.models.User({
      firstName: "Ada",
      lastName: "Lovelace",
      imageUrl: "/uploads/ada.jpg",
      bio: "First programmer",
      mission: "To make awesome calculators and not go insane!"
    });
    user1.save();
    user2.save();

    userList = new app.collections.UserList();
    userList.create(user1);
    userList.create(user2);
    userList.fetch();
    view = new app.views.UserListView({ collection: userList });

     // new app.views.UserShowView({ model: user2 });
 //   rendered = view.render();
/*    user1.save();
    user2.save();*/
    var user_id = "#" + user2.get("id");
    $(user_id).trigger("click");
     view2 = new app.views.UserShowView({ model: user2 });
     rendered = view2.render();
  });

  it("should display the user's first name", function () {
    expect(rendered.$el.html()).toContain("Ada");
  });

  it("should display the user's last name", function () {
    expect(rendered.$el.html()).toContain("Lovelace");
  });

  it("should display the user's  avatar", function () {
    expect(rendered.$el.html()).toContain("/uploads/ada.jpg");
  });

  it("should display the user's biography", function () {
    expect(rendered.$el.html()).toContain("First programmer");
  });

  it("should display the user's mission", function () {
    expect(rendered.$el.html()).toContain("To make awesome calculators and not go insane!");
  });
});
