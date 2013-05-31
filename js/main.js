require.config({
    paths : {
        backbone : 'vendor/backbone/backbone',
        underscore : 'vendor/underscore',
        jquery : 'vendor/jquery-2.0.0',
        marionette : 'vendor/backbone/backbone.marionette',
        senarium : 'senarium/senarium',
        controller : 'senarium/modules/controller',
        models : 'senarium/modules/models',
        collections : 'senarium/modules/collections',
        views : 'senarium/modules/views',
        compositeViews : 'senarium/modules/compositeViews'
    },
    shim : {
        jquery : {
            exports : 'jQuery'
        },
        underscore : {
            exports : '_'
        },
        backbone : {
            deps : ['jquery'
                , 'underscore'],
            exports : 'Backbone'
        },
        marionette : {
            deps : ['jquery', 'underscore', 'backbone'],
            exports : 'Marionette'
        }
    }
})

requirejs([
            'senarium',
            'models',
            'backbone',
            'marionette',
            'collections',
            'views',
            'compositeViews',
            'controller'
        ], function(Senarium, Models, Backbone, Marionette) {

    Senarium.addRegions({
        mainRegion: "#main"
    });

    Senarium.addInitializer(function(options){

        if(options.clientID)
        {
            Senarium.LoginInfo = new Backbone.Model({clientid:options.clientID});
            var MyItemsView = Marionette.ItemView.extend({
                template: "#some-template"
            });

            var view = new MyItemsView({
                collection: someCollection
            });
        }

        var mainlayout = new Senarium.Layouts.MainLayout();
        Senarium.mainRegion.show(mainlayout);

    });

    Senarium.on("initialize:after", function(){
        if (Backbone.history){
            Backbone.history.start();
        }
    });

    var clientID;
    if(document.domain != "localhost")
        clientID = "820350092248.apps.googleusercontent.com";
    else
        clientID = "820350092248-vss2i3j5rrdl48b50n0bjteitceb3pjd.apps.googleusercontent.com";

    var options = {
        clientID: clientID
    };

    Senarium.start(options);

    window.senarium = Senarium;
});


