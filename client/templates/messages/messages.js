var messagesHandle;
var groupsHandle;
Template.messages.onCreated(function(){
  template = this;
  messagesHandle = template.subscribe('getMessages', Session.get("toUser"))
  groupsHandle = template.subscribe('getGroups');
})

Template.messages.helpers({
    messages : function(){
      if(messagesHandle.ready()){
        if(Meteor.users.findOne({_id : Session.get("toUser")})){
          // Meteor.call("updateMessages", Session.get("toUser"));
          messages = Messages.find({ $or: [ { from: Meteor.userId(), to: Session.get("toUser") }, { from: Session.get("toUser"), to: Meteor.userId()} ]} ,{timestamp: -1});
          console.log(messages.count());
          return messages.count() && messages;
        }else{
          return Messages.find({to: Session.get("toUser"), messageType: "group"},{timestamp: -1});
        }
      }
    },
    users : function(){
      return Meteor.users.find();
    },
    date : function(){
      return moment( this.timestamp ).format( 'YYYY-MM-DD' );
    },
    fromUser : function(){
      return Meteor.users.findOne({_id : this.from}).username ;
    },
    sender : function(){
      return this.from == Meteor.userId();
    },
    notCurrentUser : function(user){
      return user._id !== Meteor.userId();
    },
    unreadMessageCount : function(user){
        if(messagesHandle.ready()){
          return Messages.find({from: user._id, to: Meteor.userId(), readstatus: false}).count();
        }
    },
    username : function(){
      return Session.get("username");
    },
    groups : function(){
      if(groupsHandle.ready()){
        groups = Groups.find();
        console.log("Group Count" , groups.count());
        return groups.count() && groups;
      }
    }
})

Template.messages.events({
  'keypress #messageText' : function(event){
    if(event.keyCode == 13){
      messageType = Meteor.users.findOne({_id : Session.get("toUser")}) ? "direct" : "group";
      message = {text : $(' #messageText').val(), from : Meteor.userId() , to : Session.get("toUser") ,
        timestamp : new Date(), readstatus : false , messageType : messageType}
      Meteor.call('insertMessage' , message);
      $('#messageText').val('');
      calculateScroll();
    }
  }
})

const messageBoxHeight = $(document).height();

function calculateScroll(){
   if($('.msg').length > 0){
     lastMessageOffset = $('.msg').last()[0].offsetTop + $('.msg').last().height();
     if(lastMessageOffset > messageBoxHeight){
       $('.overflow-scroll').scrollTop(lastMessageOffset + 200);
     }
   }
}

Template.messages.onRendered(function(){
  Messages.find().observe({
   addedAt: function(doc, atIndex, before) {
       if(Session.get("toUser") == doc.from){
         Meteor.call("updateMessage", doc._id)
       }
     }
 });
})
