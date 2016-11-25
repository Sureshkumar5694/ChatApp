Meteor.publish("getMessages", function(toUser){
  messages =  Messages.find({
      $or: [ { from: this.userId, to: toUser }, { from: toUser, to: this.userId } ]
    });

  users = Meteor.users.find({ _id: { $ne: this.userId } });
  return [messages, users];
})
