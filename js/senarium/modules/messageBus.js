define( ['wreqr','senarium'], function (Wreqr,Senarium) {
    var reqres = new Wreqr.RequestResponse();

    reqres.setHandler("foo", function(){
        return "foo requested. this is the response";
    });

    Senarium.reqres = reqres;
});


