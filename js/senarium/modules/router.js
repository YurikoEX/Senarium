define( ['marionette','senarium','controller'], function (Marionette,Senarium,Controller) {
    var SenariumRouter = Marionette.AppRouter.extend({
        // "someMethod" must exist at controller.someMethod
        appRoutes: {
            "forums": "forums",
            "forums/:comment": "forums",
            "rules": "rules",
            "rules/:rule": "rules",
            "about":"about",
            "playtest":"playtest",
            "admin":"admin"
        },
//        routes : {
//            "some/otherRoute" : "someOtherMethod"
//        },
        controller: Controller

    });

    Senarium.Router = new SenariumRouter();

});

