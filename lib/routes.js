Router.configure({
  layoutTemplate: 'appLayout'
});

Router.map(function(){
  this.route('signUp',{path: "/"});
  this.route('logIn',{path: '/login'});
  this.route('messages',{path:'/messages/:id'})
})
