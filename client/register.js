Template.register.rendered = function(){
	$('.ui.checkbox').checkbox();
	$('.dropdown').dropdown();


	var form = $('.ui.form').form({
	    first: {
	      identifier  : 'first-name',
	      rules: [
	        {
	          type   : 'empty',
	          prompt : 'Please enter your first name'
	        }
	      ]
	    },
	    last: {
	      identifier  : 'last-name',
	      rules: [
	        {
	          type   : 'empty',
	          prompt : 'Please enter your last name'
	        }
	      ]
	    },
	    gender: {
	      identifier  : 'gender',
	      rules: [
	        {
	          type   : 'empty',
	          prompt : 'Please select a gender'
	        }
	      ]
	    },
	    username: {
	      identifier : 'email',
	      rules: [
	        {
	          type   : 'empty',
	          prompt : 'Email field can\'t be empty'
	        },
	        {
	          type   : 'email',
	          prompt : 'Please enter a valid email'
	        },
	      ]
	    },
	    password: {
	      identifier : 'password',
	      rules: [
	        {
	          type   : 'empty',
	          prompt : 'Please enter a password'
	        },
	        {
	          type   : 'length[6]',
	          prompt : 'Your password must be at least 6 characters'
	        }
	      ]
	    },
	    terms: {
	      identifier : 'terms',
	      rules: [
	        {
	          type   : 'checked',
	          prompt : 'You must agree to the terms and conditions'
	        }
	      ]
	    }
	  }, {
	    inline : true,
	    on     : 'blur',
	    onSuccess : function(event){
	        event.preventDefault();
	        console.log(this);
	    }
	  });
  };

Template.register.events({
	'click a' : function(event){
		$('.termsandconditions').modal('show');
	}
});