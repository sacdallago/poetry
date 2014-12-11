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
              poem: "",
              title: "",
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

Template.poem.destroyed = function(){
    delete editor, titleEditor;
}

Template.poemFooter.helpers({
      'youAreAutor' : function(){
            return Meteor.userId() && (Poems.find().count() == 1) && (Meteor.userId() == Poems.findOne().user);
      },
      'editing' : function(){
            return Session.get('editingPoem');
      }
});

Template.poem.rendered = function(){
            editor = new MediumEditor('#poem', {
                  //disableToolbar: true,
                  forcePlainText: true,
                  buttons: ['bold','italic','quote'],
                  placeholder: ""
            });

            editor.elements[0].innerHTML = Poems.findOne().poem;

            titleEditor = new MediumEditor('#poemTitle', {
                  disableToolbar: true,
                  forcePlainText: true,
                  placeholder: ""
            });

            titleEditor.elements[0].innerHTML = Poems.findOne().title;

            editor.deactivate();
            titleEditor.deactivate();
}

Template.poemFooter.events({
      'click .edit' : function(){
        editor.activate();
        titleEditor.activate();
        Session.set('editingPoem',true);
      },
      'click .saveit' : function(){
        editor.deactivate();
        titleEditor.deactivate();

        var title = document.getElementById('poemTitle').textContent;
        if(title.length==0){
          title = "";
        }

        var poem = editor.elements[0].innerHTML;

        if(Poems.find().count() == 1){
            Poems.update({
              '_id': this._id
            }, {
              $set: {
                poem: poem,
                title: title
              }
            }, function(error,id,object){
              if(error){

              } else {
                Session.set('editingPoem',false);
              }
            });
        }
      },
      'click .delete' : function(){
            var current = this._id;
            Router.go('/');
            Poems.remove({'_id': current});
      }
});

Template.poem.helpers({
  'emptyTitle' : function(){
     var el = document.createElement( 'div' );
    el.innerHTML = this.title;
    var poem = el.textContent;
    poem = poem.replace(/\s+/g, '');
    if(poem.length < 1){
      return !Session.get('editingPoem') && true;
    }
    return false;
  },
  'emptyPoem' : function(){
    var el = document.createElement( 'div' );
    el.innerHTML = this.poem;
    var poem = el.textContent;
    poem = poem.replace(/\s+/g, '');
    if(poem.length < 1){
      return !Session.get('editingPoem') && true;
    }
    return false;
  }
});