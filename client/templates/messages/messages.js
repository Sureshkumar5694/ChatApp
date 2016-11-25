Template.messages.onCreated(function(){
  template = this;
  template.autorun(function(){
    template.subscribe('getMessages', Session.get("toUser"))
  })
})

Template.messages.helpers({
  messages :  function(){
    return Messages.find({},{timestamp: -1});
  },
  users : function(){
    return Meteor.users.find();
  },
  date : function(){
    return moment( this.timestamp ).format( 'YYYY-MM-DD' );
  },
  fromUser: function(){
    return Meteor.users.findOne({_id : this.from}).username ;
  },
  sender : function(){
    return this.from == Meteor.userId();
  },
  notCurrentUser : function(user){
    return user._id !== Meteor.userId();
  }
})

Template.messages.events({
  'keypress #messageText' : function(event){
    if(event.keyCode == 13){
      message = {text : $(' #messageText').val(), from : Meteor.userId() , to : Session.get("toUser") , timestamp : new Date() }
      Meteor.call('insertMessage' , message);
      $('#messageText').val('');
      debugger;
      calculateScroll();
    }
  }
})

const messageBoxHeight = $(document).height() - $('.bar-header').height();

 function calculateScroll(){
   console.log(messageBoxHeight);
   debugger;
    lastMessageOffset = $('.message1').last()[0].offsetTop + $('.message1').last().height();
    if(lastMessageOffset > messageBoxHeight){
      $('.overflow-scroll').scrollTop(lastMessageOffset + $('.message').last().height());
    }
}
