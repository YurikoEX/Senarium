export class UserController{
    private _mongo:any;
    private _app:any;
    constructor(mongo,app,express){
        this._mongo = mongo;
        this._app = app;

        var controller:UserController = this;

        this._app.post('/api/User',express.bodyParser(),function(req,res){
            controller.ProcessUser(req,res);
        });

        this._app.get('/api/User', function(req,res){
            controller.GetUsers(req,res);
        });
    }

    public GetUsers(req,res){
        this._mongo.GetUsers(function(data){
            res.json(200,JSON.stringify(data));
        });
    }

    public ProcessUser(req,res){
        //var id:any = req.params.id;
        if(req.body)
        {
            var body = req.body;
            if(body.id)
            {
                this._mongo.UpdateUserInfo({
                    id:body.id,
                    displayName:body.displayName,
                    lastSession:req.sessionID
                });

                res.json(200,"Updated");
            }
            else
            {
                res.json(406,"Where is your info, good sir?");
            }
        }
        else
            res.json(400,"you are very light");

    }

}