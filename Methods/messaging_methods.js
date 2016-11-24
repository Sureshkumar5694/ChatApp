Meteor.methods({
  'insertMessage' :  function(message){
    if(Meteor.isServer){
      console.log("Message",message);
      Messages.insert(message);
    }
  }
})
