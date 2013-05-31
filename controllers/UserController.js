var UserController = (function () {
    function UserController(mongo, app, express) {
        this._mongo = mongo;
        this._app = app;
        var controller = this;
        this._app.post('/api/User', express.bodyParser(), function (req, res) {
            controller.ProcessUser(req, res);
        });
        this._app.get('/api/User', function (req, res) {
            controller.GetUsers(req, res);
        });
    }
    UserController.prototype.GetUsers = function (req, res) {
        this._mongo.GetUsers(function (data) {
            res.json(200, JSON.stringify(data));
        });
    };
    UserController.prototype.ProcessUser = function (req, res) {
        if(req.body) {
            var body = req.body;
            if(body.id) {
                this._mongo.UpdateUserInfo({
                    id: body.id,
                    displayName: body.displayName,
                    lastSession: req.sessionID
                });
                res.json(200, "Updated");
            } else {
                res.json(406, "Where is your info, good sir?");
            }
        } else {
            res.json(400, "you are very light");
        }
    };
    return UserController;
})();
exports.UserController = UserController;
//@ sourceMappingURL=UserController.js.map
