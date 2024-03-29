var express = require('express')
    , http = require('http')
    , user = require('./routes/user')
    , admin = require('./routes/admin')
    , course = require('./routes/course')
    , quiz = require('./routes/quiz')
    , logger = require('./logger/logger')
    , path = require('path')
    , courseProgress = require('./routes/courseProgress');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser());
app.use(express.session({secret: 'i study', cookie: {maxAge: 60000000}}));
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
app.post('/signin', user.signin);
//course
app.get('/admin', admin.displayAdminHome);
app.get('/courseCreation', admin.displayCourseCreation);
app.get('/adminAnalytics', admin.displayAdminAnalytics);
app.get('/assessmentCreation/:moduleId', admin.displayAssesstmentCreation);
app.get('/topicDetail/:coursename/:id', user.topicDetail); //change the route after getting the backend
app.get('/courseDetails/:id/:name', user.courseDetails);
app.get('/getallcourses', course.getCoursesDetails);

//quiz/5833494834d4fff52203b5fd/course/5815615b26dd983e536198fa/module/5815622626dd983e536198fb/coursename/Java
app.get('/quiz/:quizId/course/:courseId/module/:moduleId/coursename/:coursename', user.displayQuiz);


//Course Progress
app.post('/course/:courseid/user/:userid',courseProgress.enrollIntoCourse);
app.get('/course/:courseid/user/:userid',courseProgress.getAllModulesOfRegisteredCourse);
app.post('/course/:courseid/module/:moduleid/user/:userid',courseProgress.postQuizResults);

//CMS
//course
app.post('/course', course.createCourse);
app.post('/course/:courseid/module',course.createModule);
app.post('/module/:moduleid/assessment/:assessmentid?',course.createAssessment);
app.get('/course/:id?', course.getCoursesDetails);
app.get('/module/:moduleid', course.getModuleDetails);
app.get('/course/:courseid/module', course.getAllModulesofCourse);
app.get('/assessment/:assessmentid', course.getAssessment);
app.get('/search/:q', course.searchCourse);

app.get('/userprofile', function(req,res) {
    res.render('userprofile.ejs');
})

app.get('/pinkmonk',function(req,res) {
    var pinky = ["a","b","c"];
    var monkey = ["1","2","3"];
    var final = {};
    final.pinky = pinky;
    final.monkey = monkey;    
    res.send(final);
})

http.createServer(app).listen(app.get('port'), function () {
    // console.log('Express server listening on port ' + app.get('port'));
    logger.info("Express server listening on port: ", app.get('port'));
});






