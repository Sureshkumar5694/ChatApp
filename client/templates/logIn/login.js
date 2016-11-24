Template.logIn.onRendered(function(){

})

Template.logIn.events({
  'click #login' : function(event, template){
    let user =  template.find( "[name='username']" ).value;
    let password = template.find( "[name='password']" ).value;

    Meteor.loginWithPassword(user, password, function(error){
      if(error){
        console.log(error.reason);
      }else {
        console.log("successfully logged in " + Meteor.userId());
        Router.go('/messages/'+Meteor.userId());
      }
    });
  }
})
