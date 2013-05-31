define( ['senarium'], function (Senarium) {

    Senarium.Layouts = {};

    Senarium.Layouts.MainLayout = Backbone.Marionette.Layout.extend({
        template: "#template-mainLayout",

        regions: {
            navigationRegion: "#navigationRegion",
            contentRegion: "#contentRegion",
            footerRegion: "#footerRegion"
        },
        events: {
            'click .buttonNext': 'clickButtonNext'
        },
        clickButtonNext: function () {
            var w = [];
            $(".instanceValue").each(function () {
                w.push($(this).val());
            });
            if (w[0] === w[1]) {
                alert("THESE ARE THE SAME INSTANCE!");
            } else {
                ResolveITMigrationApp.AppControllerInstance.StartMigration(w[0], w[1]);
            }
        }
    });


});




