Router.configure({
  layoutTemplate: 'appLayout'
});

Router.map(function(){
  this.route('signUp',{path: "/signUp"});
  this.route('logIn',{path: '/'});
  this.route('messages',{path:'/messages/:id'});
  this.route('groups',{path: '/group'});
})
