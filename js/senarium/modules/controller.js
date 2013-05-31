define( [
    'marionette',
    'senarium',
    'models',
    'collections',
    'views',
    'compositeViews'
], function (Marionette,Senarium) {

    var SenariumController = Marionette.Controller.extend({

        initialize: function(options){
            this.stuff = options.stuff;
        },

        onSignInCallback: function(){
            this.trigger("stuff:done", this.stuff);
        }

    });

    Senarium.addInitializer(function(options){
        Senarium.Controller = new SenariumController({
            stuff: "some stuff"
        });
    });


});


//
//
//
//
//var PostUserInformation = function (postInfo) {
//    $.ajax({
//        type: "POST",
//        url: 'api/User',
//        contentType: "application/json; charset=utf-8",
//        data: JSON.stringify(postInfo),
//        success: function (ret) {
//            //console.log(ret);
//        },
//        error: function (ret) {
//            //console.log(ret.responseJSON);
//        },
//        dataType: 'json'
//    });
//};
//
//
//function onSignInCallback(authResult) {
//    gapi.client.load('plus','v1', function(){
//        if (authResult['access_token']) {
//            $('#gConnect').hide();
//
//            var request = gapi.client.plus.people.get( {'userId' : 'me'} );
//            request.execute( function(profile) {
//                $('#profile').empty();
//                $('#profile').append(
//                    $('<span>'+profile.displayName + '</span>'));
//                $('#profile').show();
//
//                PostUserInformation({id:profile.id,displayName:profile.displayName});
//            });
//
//            $('#authOps').show('slow');
//        } else if (authResult['error']) {
//            // There was an error, which means the user is not signed in.
//            // As an example, you can handle by writing to the console:
//            console.log('There was an error: ' + authResult['error']);
//            $('#profile').hide('slow');
//            $('#gConnect').show();
//        }
//    });
//}
//
//
//function disconnect() {
//    // Revoke the access token.
//    $.ajax({
//        type: 'GET',
//        url: 'https://accounts.google.com/o/oauth2/revoke?token=' +
//            gapi.auth.getToken().access_token,
//        async: false,
//        contentType: 'application/json',
//        dataType: 'jsonp',
//        success: function(result) {
//            $('#profile').hide('slow');
//            $('#profile').empty();
//            $('#gConnect').show();
//        },
//        error: function(e) {
//            console.log(e);
//        }
//    });
//}
//
//
//$(document).ready(function() {
//    $('#profile').click(disconnect);
//
//    var clientID;
//    if(document.domain ==="senarium.aws.af.cm")
//        clientID = "820350092248.apps.googleusercontent.com";
//    else
//        clientID = "820350092248-vss2i3j5rrdl48b50n0bjteitceb3pjd.apps.googleusercontent.com";
//    $(".gbutton").addClass('g-signin')
//        .attr('data-clientId',clientID)
//        .attr('data-scope',"https://www.googleapis.com/auth/plus.login")
//        .attr('data-requestvisibleactions',"http://schemas.google.com/AddActivity")
//        .attr('data-callback',"onSignInCallback")
//        .attr('data-theme',"dark")
//        .attr('data-cookiepolicy',"single_host_origin");
//
//
//
//        (function() {
//            var po = document.createElement('script');
//            po.type = 'text/javascript';
//            po.async = true;
//            po.src = 'https://plus.google.com/js/client:plusone.js';
//            var s = document.getElementsByTagName('script')[0];
//            s.parentNode.insertBefore(po, s);
//        })();
//
//
//});