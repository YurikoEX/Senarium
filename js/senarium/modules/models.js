define( ['senarium','backbone'], function (Senarium, Backbone) {

    Senarium.Models = {};

    Senarium.Models.LoginModel = Backbone.Model.extend({
        defaults:{
            scope:"https://www.googleapis.com/auth/plus.login",
            requestvisibleactions:"http://schemas.google.com/AddActivity",
            callback:"onSignInCallback",
            theme:"dark",
            cookiepolicy:"single_host_origin"
        }
    });
});