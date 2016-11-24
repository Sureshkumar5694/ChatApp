Template.messages.onCreated(function(){
  template = this;
  template.autorun(function(){
    template.subscribe('getMessages', Session.get("toUser"))
  })
})

Template.messages.helpers({
  messages :  function(){
    return Messages.find();
  }
})


Template.messages.events({
  'keypress #messageText' : function(event){
    if(event.keyCode == 13){
      message = {text : $(' #messageText').val(), from : Meteor.userId() , to : Session.get("toUser") , timestamp : new Date() }
      Meteor.call('insertMessage' , message);
    }
  }
})
