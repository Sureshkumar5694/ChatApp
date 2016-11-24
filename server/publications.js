Meteor.publish("getMessages", function(toUser){
  messages =  Messages.find({
      $or: [ { from: this.userId, to: toUser }, { from: toUser, to: this.userId } ]
    });

  console.log("Messages", messages);
  return messages;
})
