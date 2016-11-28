Template.appLayout.events({
  'click .user' : function(event, template){
    Session.set("toUser", this._id);
    Session.set("username", this.username)
    $('#contact-list .user').removeClass('selected');
    $(event.currentTarget).addClass('selected');
  },
  'click .add-icon' : function(){
    Router.go("/group")
  }
})
