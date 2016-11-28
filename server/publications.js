if(Meteor.isServer){
  Meteor.publish("getMessages", function(toUser){
    messages =  Messages.find({
        $or: [ { from: this.userId }, { to: this.userId } , { to: toUser }]
      });

    users = Meteor.users.find();
    return [messages, users];
  })

  Meteor.publish("getGroups",function(){
    return Groups.find();
  })
  
}
