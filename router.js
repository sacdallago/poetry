(function() {
      //Just telling Iron Router to use upperCamelCase
      Router.configure({
            templateNameConverter : 'upperCamelCase',
            layoutTemplate: 'scheleton'
      });

      //These are the routes. Root is the main template, see index.html
})();