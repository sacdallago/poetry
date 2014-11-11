Session.setDefault("filter", undefined);
Poems = new Meteor.Collection("poems");
var poemsHandle = undefined;

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

Template.poems.helpers({
	poems : function(){
		return Poems.find();
	}
});