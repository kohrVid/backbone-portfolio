
  //<!-- Load application scripts at the end of the body, so that we
  //don't slow up the loading time of the DOM -->
  var scripts = 
  ["../app/assets/javascripts/libs/underscore.js",
  "../app/assets/javascripts/libs/backbone.localStorage.js",
  "../app/assets/javascripts/app.js",
  //<!-- TODO: include source files here... -->
  "../app/assets/javascripts/models/user.js",
  "../app/assets/javascripts/views/userView.js",
  "../app/assets/javascripts/views/homeView.js",
  "../app/assets/javascripts/controllers/usersController.js",
  "../app/assets/javascripts/collections/userList.js",
  "../app/assets/javascripts/views/userListView.js",
  "../app/assets/javascripts/boot.js",

  //<!-- include spec files here... -->
  "../spec/javascripts/helpers/SpecHelper.js",
  "../spec/javascripts/models/userSpec.js",
  "../spec/javascripts/views/userViewSpec.js",
  "../spec/javascripts/views/userListViewSpec.js"];

for(var i = 0; i < scripts.length; i++) {
  $.getScript(scripts[i], function() {
    console.log('script loaded');
  });
}
