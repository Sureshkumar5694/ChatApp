Template.groups.events({
  'click #create' : function(){
    Meteor.call("createGroup",{name: $('#group-name').val()}, function(error, result){
      if(error){
        console.log("error",error.reason);
      }else {
        Router.go('/messages/'+Meteor.userId());
      }
    });

  }
})
