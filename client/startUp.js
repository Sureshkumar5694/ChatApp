Meteor.startup(function(){
  Bert.defaults = {
  hideDelay: 3500,
  style: 'growl-bottom-right',
  type: 'default'
  };

  Session.set("username", "Chat");
});
