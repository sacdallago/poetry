Template.login.rendered = function(){

	var form = $('.ui.form').form({
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
	        console.log(this);
	    }
	  });
  };