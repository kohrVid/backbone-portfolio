var userList;
var rendered;
var user1;
var user2;
describe("UserListView", function () {
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
//    userList.save()
    userList.create(user1);
    userList.create(user2);
    userList.fetch();
    view = new app.views.UserListView({ collection: userList });
    rendered = view.render();
  });
  it("should display a list of each user's avatar", function () {
  //  var image = rendered.$el.find("img");
    expect(rendered.$el.html()).toContain("img");
    expect(rendered.$el.html()).toContain("/uploads/tim.jpg");
    expect(rendered.$el.html()).toContain("/uploads/ada.jpg");
  });
});
