var Poems = new Meteor.Collection('poems');

/*
Meteor.publish('poems', function(id) {
	if(id){
		return Poems.find({_id:id});
	} else {
		return Poems.find();
	}
});
*/

var paginatedPoems = new Meteor.Pagination(Poems, {
	availableSettings: {
    	sort: true
  	},
  	infinite: true,	
  	sort: {
    	timestamp: 1
  	}
});

Meteor.startup(function(){
	if(Poems.find().count() < 1){
	console.log("filling DB");
	for(var i=0;i<100;i++){
		Poems.insert({
			title: lipsum[i%6].substr(0, i%6+20),
			poem: lipsum[i%6],
			timestamp: Date.now()-i*30
		});
	}
	console.log("Elements in DB: " + Poems.find().count());
}
});
