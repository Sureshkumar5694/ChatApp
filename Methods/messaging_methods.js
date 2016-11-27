Meteor.methods({
  'insertMessage' :  function(message){
    if(Meteor.isServer){
      Messages.insert(message);
    }
  },

  'updateMessages': function(toUser){
    if(Meteor.isServer){
      Messages.update({ to: this.userId , from: toUser} , { $set : { readstatus : true } }, {multi: true});
    }
  },

  'updateMessage': function(id){
    if (Meteor.isServer) {
      Messages.update({ _id:id }, { $set:{ readstatus: true} });
    }
  }
})
