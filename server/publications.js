Meteor.publish("getMessages", function(toUser){
  messages =  Messages.find({
      $or: [ { from: this.userId }, { to: this.userId } ]
    });

  users = Meteor.users.find();
  return [messages, users];
})
