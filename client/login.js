Template.login.rendered = function(){

	var form = $('.ui.form.loginForm').form({
	    username: {
	      identifier : 'email',
	      rules: [
	        {
	          type   : 'empty'
	        },
	        {
	          type   : 'email'
	        },
	      ]
	    },
	    password: {
	      identifier : 'password',
	      rules: [
	        {
	          type   : 'empty'
	        }
	      ]
	    }
	  }, {
	    onSuccess : function(event){
	        event.preventDefault();
	        var user = $('#loginEmail').val();
	        var password = $('#loginPassword').val();
	        Meteor.loginWithPassword(user, password, function(error){
	        	if(error){
	        		console.log("Login error");
	        	} else {
	        		$('.loginmodal').modal('hide');
	        	}
	        });
	    }
	  });
  };