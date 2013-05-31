export function ExpressSetup(express, MongoStore, mongourl, dir){
    var app = express();

    app.set('port', process.env.VMC_APP_PORT || 3000);
    app.use(express.static(dir));
    app.use(express.errorHandler());
    //app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        store: new MongoStore({
            url: mongourl
        }),
        secret: '7A45E495-7780-4922-8599-2116C1BE2111'
    }));

    app.get('/', function(req,res) {
        res.sendfile('index.html',null,null);
    });

    app.all('*', function(err,req,res,next) {
        console.log('This is a global error handler at route level....');
        return next(err);
    });

    return app;
}