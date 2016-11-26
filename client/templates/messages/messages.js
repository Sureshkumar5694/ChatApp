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
      console.log("count",  Messages.find({from: user._id, to: Meteor.userId(), readstatus: false}).count());
      return Messages.find({from: user._id, to: Meteor.userId(), readstatus: false}).count();
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

const messageBoxHeight = $(document).height() - $('.bar-header').height();

function calculateScroll(){
   if($('.message1').length > 0){
     lastMessageOffset = $('.message1').last()[0].offsetTop + $('.message1').last().height();
     if(lastMessageOffset > messageBoxHeight){
       $('.overflow-scroll').scrollTop(lastMessageOffset + $('.message').last().height());
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
