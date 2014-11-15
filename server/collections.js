var Poems = new Meteor.Collection('poems');

Meteor.publish('poems', function(id) {
				if(id){
					return Poems.find({_id:id});
				} else {
					return Poems.find();
				}
			});

/*
var paginatedPoems = new Meteor.Pagination(Poems, {
	availableSettings: {
    	sort: true,
    	auth: true
  	},
  	sort: {
    	timestamp: -1
  	},
  	auth : function(){
  		return true;
  	}
});
*/