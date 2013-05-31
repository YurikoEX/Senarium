var mongo = require('mongoose');
var _ = require('underscore');

/**
 * Mongo Collections
 */
var userCollection = 'users';
var commentCollection = 'comments';
var ruleCollection = 'rules';

export class MongoRepository {
    private mongoUrl:any;
    private _db:any;
    private _collections:any[] = [];
    constructor(url){
        this.mongoUrl = url;
        this._connect();
    }
    public UpdateUserInfo(data, callback){
        var repo:MongoRepository = this;
        this._collections[userCollection].findOne({googleId:data.id}, function(err,user){
            if(err || !user)
            {
                var newUser = new repo._collections[userCollection]();
                newUser.googleId = data.googleId;
                newUser.lastSession = data.lastSession;
                newUser.name = data.displayName;
                newUser.save();
            }
            else
            {
                user.lastSession = data.lastSession;
                user.loginInfo.numLogins = user.loginInfo.numLogins++;
                user.loginInfo.lastLogin = new Date().getTime();
                user.save();
            }

        });
    }
    public GetUsers(callback){
        this._collections[userCollection].find({}, function (err, docs) {
            callback(docs);
        });
    }
    private _connect(){
        var repo = this;
        mongo.connect(this.mongoUrl);
        this._db = mongo.connection;
        this._db.on('error',console.error.bind(console,'connection error:'));
        this._db.once('open',function(){
            console.log('DB Connected!');
            var Schema = mongo.Schema;

            var User = new Schema({
                googleId:String,
                lastSession:String,
                name:String,
                permissions:{
                    admin:{
                        type: Boolean,
                        default: false },
                    author:{
                        type: Boolean,
                        default: false },
                    tester:{
                        type: Boolean,
                        default: false },
                    speaker:{
                        type: Boolean,
                        default: true }
                    },
                loginInfo:{
                    numLogins:{
                        type: Number,
                        default: 1 },
                    lastLogin:{
                        type: Date,
                        default: new Date().getTime() }
                },
                banned: {
                    type: Boolean,
                    default: false }
            });

            var Rule = new Schema({
                release: String,
                chapter: String,
                type: String,
                name: String,
                shortName: String,
                version: Number,
                body: String,
                data: [{
                    id:String,
                    value:String}],
                stability: String,
                author: [User]
            });

            var Attack = new Schema({
                    attackName:String,
                    damageType:{ type: String, enum: ['magic','physical','mental'] },
                    damage:{
                        dice:{type:Number,max: 6},
                        modifier:{type:Number,max: 6}
                    }
                }
            );

            var Defense = new Schema({
                    defenseName:String,
                    resistances:[{
                        resistType: { type: String, enum: ['magic','physical','mental'] },
                        dice:{type:Number,max: 6},
                        modifier:{type:Number,max: 6}
                    }]
                }
            );



            var Enemy = new Schema({
                alpha: String,
                name: String,
                type: String,
                description: String,
                offensive:{
                    attacks:[Attack]
                },
                defenses:{
                    defenses:[Attack]
                },
                gear:[{gearName:String}]
            });

            var Comment = new Schema({
                area : String,
                title:  String,
                author: [User],
                body:   String,
                rule: [Rule],
                comments: [{
                    author: [User],
                    body: String,
                    date: {
                        type: Date,
                        default: new Date().getTime() } }],
                date: {
                    type: Date,
                    default: new Date().getTime() },
                hidden: Boolean,
                meta: {
                    awesome: [User],
                    sucks:  [User],
                    views: [User]
                }
            });

            repo._collections[userCollection]=mongo.model(userCollection,User);
            repo._collections[ruleCollection]=mongo.model(ruleCollection,Rule);
            repo._collections[commentCollection]=mongo.model(commentCollection,Comment);
        });
    }
}
