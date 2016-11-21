var ejs = require("ejs");
var mongodb = require('mongodb');
var logger = require('../logger/logger');
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017/GamifiedLMSDB";
var MongoClient = mongodb.MongoClient;

exports.displayLogin = function(req, res){
	  res.render('index1', { title: 'Gamified LMS' });
	};
	
exports.signin=function(req,res) {
	var email=req.param("email"),pswd=req.param("password");	

	if(email!==undefined && pswd!==undefined && email!=="" && pswd!=="") {
		MongoClient.connect(url, function (err, db) {
	        if (err) {
	            console.log('Unable to connect to the mongoDB server. Error:', err);
	        } else {
	            console.log('Connection established to', url);
	            var collection = db.collection('user');	            
	            collection.findOne({"email":email,"password":pswd},function (err, result) {
	                if (err) {
	                    console.log(err);
	                    res.send({'status':'error'});
	                } else {
	                	req.session.uid = result._id;	                    
	                    db.close();
	                    res.status(200);
	                    res.send({'status':'success'});

	                }

	            });
	        }
	    });
	}
};

exports.insertUser=function(req,res){	
	
	var fname=req.param("fname"),lname=req.param("lname");
	var email=req.param("email"),pswd=req.param("password");	
		
	if((fname!==undefined && pswd !==undefined && lname!==undefined && email !==undefined) && (fname!=="" && pswd !=="" && lname!=="" && email !==""))  
		{				
		MongoClient.connect(url, function (err, db) {
			  if (err) {
			    //console.log('Unable to connect to the mongoDB server. Error:', err);
				logger.error('Unable to connect to the mongoDB server. Error:', err);
			  } else {		 
			    //console.log('Connection established to', url);
				  logger.debug('Connection established to', url);
			    var collection = db.collection('user');	
			    
				var query = {};
				
				query["fname"] = fname;
				query["lname"] = lname;
				query["email"] = email;
				query["password"] = pswd;


				collection.insert(query, {w:1}, function(err, result) {

			    	if (err) {
				        //console.log(err);
						logger.error('Error in inserting the user details. Error:', err);
				        res.end("error");
				      } else {
							logger.info('Inserted:', result);
				          //console.log('Inserted:', result);
				          res.end("success");
				      }
			    	db.close();
			    });
			  }
			});
		}
	else
		{
			//console.log("invalid input");
			logger.error('Invalid Input of user details');
			res.send({"Status":"Error"});
		}			
};

exports.topicDetail = function(req, res){
		console.log("topic detail called----");	  
	  res.render('topicDetail', { title: 'Gamified LMS', moduleId: req.param("id"), coursename: req.param("coursename") });
};

exports.courseDetails = function(req, res){
		console.log("course detail called----");	
	  res.render('courseDetails', { title: 'Gamified Courses', courseId: req.param("id"), courseName: req.param("name") });
	};

