Router.route('/poems/:_id',{
	loadingTemplate: 'loading',

	waitOn: function () {
    // return one handle, a function, or an array
    	return Meteor.subscribe('poems', this.params._id);
  	},

  	data: function () {
  		return Poems.findOne({_id: this.params._id});
  	},

  	action: function () {
    	this.render('poem');
      this.render('poemFooter', {to: 'poemInfo'});
  	}
});

Router.route('/', {
  loadingTemplate: 'loading',

  waitOn: function () {
      return Meteor.subscribe('poems');
    },

    action: function () {
      this.render('poems');
    }
});

Router.route('/register', {
  loadingTemplate: 'loading',

    action: function () {
      this.render('register');
    }
});









/*
Router.route('/insert/:title/:poem',{
  loadingTemplate: 'loading',

  waitOn: function () {
    // return one handle, a function, or an array
      id = Poems.insert({title:this.params.title,timestamp: Date.now(), poem:this.params.poem});
      console.log(id);
      return Meteor.subscribe('poems', id);
    },

    action: function () {
      Router.go('/');
    }
});


Router.route('methodExample', {
        path: '/api/call',
        where: 'server',
        action: function() {
            // GET, POST, PUT, DELETE
            var requestMethod = this.request.method;
            // Data from a POST request
            var requestData = this.request.body;
            // Could be, e.g. application/xml, etc.
            this.response.writeHead(200, {'Content-Type': 'text/html'});
            this.response.end('<html><body>Your request was a ' + requestMethod + '</body></html>');
        }
    });
*/