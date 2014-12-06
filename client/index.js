Session.setDefault("filter", {_id:'jzR6Af7cKaCewWxJf'});
Poems = new Meteor.Collection("poems");
var poemsHandle = undefined;
Session.setDefault("fullscreen", false);

/*
paginatedPoems = new Meteor.Pagination(Poems, {
  	sort: {
    	timestamp: -1
  	},
  	infinite: true,
  	itemTemplate: "poemPills"
});
*/

var toggleFullScreen = function() {
      if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                  document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                  document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                  document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                  document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
      } else {
            if (document.exitFullscreen) {
                  document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
            }
      }
};

Template.sidebar.events({
    'click .fullscreen': function(event){
            toggleFullScreen();
      },
      'click .login' : function(event){
            $('.loginmodal').modal('show');
      }
});

Template.scheleton.events({
    'click .home': function(event){
      $('.homemenu').sidebar('toggle');
      }
});

Template.sidebar.events({
    'click': function(event){
      $('.homemenu').sidebar('toggle');
      }
});

Template.poems.helpers({
    poems : function(){
      return Poems.find();
    }
});

Template.poemFooter.events({
      'click .edit' : function(){ 
        editor = new MediumEditor('#poem', {
            //disableToolbar: true,
            forcePlainText: true,
            buttons: ['bold','italic','quote'],
            placeholder: "..."
      });

      document.addEventListener("webkitfullscreenchange", function(event){
          Session.set('fullscreen', document.webkitFullscreenElement != null || document.mozFullScreenElement != null || document.msFullscreenElement != null);
      });
      document.addEventListener("mozfullscreenchange", function(event){
          Session.set('fullscreen', document.webkitFullscreenElement != null || document.mozFullScreenElement != null || document.msFullscreenElement != null);
      });
      document.addEventListener("msfullscreenchange", function(event){
          Session.set('fullscreen', document.webkitFullscreenElement != null || document.mozFullScreenElement != null || document.msFullscreenElement != null);
      });
    }
});