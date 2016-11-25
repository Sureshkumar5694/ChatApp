Template.appLayout.events({
  'click #userclick' : function(event, template){
    Session.set("toUser", this._id)
    $('#contact-list .item').removeClass('selected');
    $(event.currentTarget).addClass('selected');
  },
})
