var Poems = new Meteor.Collection('poems');

Meteor.publish('poems', function(id) {
	if(id){
		return Poems.find({_id:id});
	} else {
		return Poems.find();
	}
	
});