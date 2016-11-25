Template.appLayout.events({
  'click #userclick' : function(event, template){
    Session.set("toUser", this._id)
  }
})
