Template.messages.onCreated(function(){
  template = this;
  template.autorun(function(){
    template.subscribe('getMessages', Session.get("toUser"))
  })
})

Template.messages.helpers({
    messages : function(){
      Meteor.call("updateMessages", Session.get("toUser"));
      return Messages.find({
          $or: [ { from: Meteor.userId(), to: Session.get("toUser") }, { from: Session.get("toUser"), to: Meteor.userId()} ]} ,{timestamp: -1});
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
      return Messages.find({from: user._id, to: Meteor.userId(), readstatus: false}).count();
    },
    username : function(){
      return Session.get("username");
    }
})

Template.messages.events({
  'keypress #messageText' : function(event){
    if(event.keyCode == 13){
      message = {text : $(' #messageText').val(), from : Meteor.userId() , to : Session.get("toUser") , timestamp : new Date(), readstatus : false }
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
     console.log(lastMessageOffset,"+",$('.msg').last().height());
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
