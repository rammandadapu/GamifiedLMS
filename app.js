var express = require('express') 
  , http = require('http')  
  , user = require('./routes/user')
  , path = require('path')
	, logger = require('./logger/logger');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser());
app.use(express.session({ secret: 'i study', cookie: { maxAge: 60000000 }}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//user
app.get('/', user.displayLogin);
app.post('/signup', user.insertUser);	
//app.post('/signout',user.signout);
//app.post('/signIn', user.validateUser);

//course
app.get('/topicDetail:id', user.topicDetail); //change the route after getting the backend

http.createServer(app).listen(app.get('port'), function(){
	  // console.log('Express server listening on port ' + app.get('port'));
	logger.info("Express server listening on port: ",app.get('port'));
	});

