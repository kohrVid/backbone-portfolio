$(document).ready(function () {
  var user = new app.models.User({
    /*
    firstName: "Tim",
    lastName: "Berners Lee",
    imageUrl: "/uploads/tim.jpg",
    bio: "I invented the internet (sort of)!",
    mission: "Our mission is to make information freely available to all...I think"*/
    id: localStorage.users.split(",")[0]
  });
  user.fetch();

  view = new app.views.UserView({ model: user });
  $("main#content").prepend(view.render().el);
});
