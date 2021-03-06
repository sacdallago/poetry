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


Meteor.startup(function(){
	if(Poems.find().count() < 1){
	console.log("filling DB");
	for(var i=0;i<100;i++){
		Poems.insert({
			title: lipsum[i%6].substr(0, i%6+20),
			poem: "<p>" + lipsum[i%6] + "</p><p>"+ lipsum[i%5] + "</p><p>"+ lipsum[i%3] + "</p>",
			//poem: lipsum[i%6] + lipsum[i%5] + lipsum[i%3],
			timestamp: Date.now()-i*30
		});
	}
	console.log("Elements in DB: " + Poems.find().count());
}
});
