Template.signUp.onRendered( function() {
  $( "#signup" ).validate({
    rules: {
      firstname: {
        required: true,
        maxlength: 20
      },
      lastname: {
        required: true,
        maxlength: 20
      },
      username: {
        required: true,
        minlength: 4
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 4
      }
    },
    messages: {
       firstName: {
         required: 'What is your first name?'
       },
       lastName: {
         required: 'How about a second name?'
       },
       username: {
         required: 'What username would you like?'
       },
       emailAddress: {
         required: 'Need an email address here.',
         email: 'Is this email address legit?'
       },
       password: {
         required: 'Need a password here.',
         minlength: 'Use at least four characters, please.'
       }
     },
  });
});


Template.signUp.events({
  'submit form': function(event, template){
    event.preventDefault();
    let user = {
      username: template.find( "[name='username']" ).value,
      email: template.find( "[name='email']" ).value,
      password: template.find( "[name='password']" ).value,
      profile: {
        name: {
          first: template.find( '[name="firstname"]' ).value,
          last: template.find( '[name="lastname"]' ).value
        }
      }
    };

      Accounts.createUser( user, ( error ) => {
      if ( error ) {
        console.log("Error message",error.reason);
        Bert.alert( error.reason,'danger' );
      } else {
        console.log("successfully loggedin")
        // Bert.alert( 'User successfully created','success' );
        Router.go('/login');
      }
    });
  }
});
