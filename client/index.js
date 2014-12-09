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

Template.connectionStatus.helpers({
  'connectionLost' : function(){
    return !Meteor.status().connected;
  }
});

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
      },
      'click .logout' : function(event){
            Meteor.logout();
      },
      'click .newPoem' : function(event){
            Poems.insert({
              timestamp: Date.now(),
              user: Meteor.userId(),
              poem: "<p>Lorem ipsum dolor sit amet...</p>",
              title: "New poem",
            }, function(error,data){
              if(error){ 
              } else {
                Router.go('/poems/'+data);
              }
            });
      },
});

Template.scheleton.rendered = function(){
    document.addEventListener("webkitfullscreenchange", function(event){
          Session.set('fullscreen', document.webkitFullscreenElement != null || document.mozFullScreenElement != null || document.msFullscreenElement != null);
      });
      document.addEventListener("mozfullscreenchange", function(event){
          Session.set('fullscreen', document.webkitFullscreenElement != null || document.mozFullScreenElement != null || document.msFullscreenElement != null);
      });
      document.addEventListener("msfullscreenchange", function(event){
          Session.set('fullscreen', document.webkitFullscreenElement != null || document.mozFullScreenElement != null || document.msFullscreenElement != null);
      });
};

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


var editor = null;
var titleEditor = null;
Session.set('editingPoem',false);

Template.poemFooter.destroyed = function(){
    Session.set('editingPoem',false);
}

Template.poemFooter.helpers({
      'youAreAutor' : function(){
            return Meteor.userId() && (Poems.find().count() == 1) && (Meteor.userId() == Poems.findOne().user);
      },
      'editing' : function(){
            return Session.get('editingPoem');
      }
});

Template.poemFooter.rendered = function(){
  document.getElementById('poem').innerHTML = Poems.findOne().poem;
}

Template.poemFooter.events({
      'click .edit' : function(){
          editor = new MediumEditor('#poem', {
                  //disableToolbar: true,
                  forcePlainText: true,
                  buttons: ['bold','italic','quote'],
                  placeholder: "..."
            });

            titleEditor = new MediumEditor('#poemTitle', {
                  disableToolbar: true,
                  forcePlainText: true,
                  placeholder: "..."
            });
        Session.set('editingPoem',true);
      },
      'click .saveit' : function(){
        var title = document.getElementById('poemTitle').textContent;
        if(title.length==0){
          title = "No title";
        }
        document.getElementById('poemTitle').innerHTML="";
        var poem = editor.elements[0].innerHTML;
        if(Poems.find().count() == 1){
            Poems.update({
              '_id': Poems.findOne()._id
            }, {
              $set: {
                poem: poem,
                title: title
              }
            },function(error,id,object){
              if(error){

              } else {
                document.getElementById('poemTitle').innerHTML = title;
                Session.set('editingPoem',false);
                editor.deactivate();
                titleEditor.deactivate();
                delete editor, titleEditor;
                document.getElementById('poem').innerHTML = poem;
              }
            });
        }
      },
      'click .delete' : function(){
            Router.go('/');
            var current = Poems.findOne()._id;
            Poems.remove({'_id': current});
      }
});