var ejs = require("ejs");
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

var url = "mongodb://localhost:27017/GamifiedLMSDB";
var MongoClient = mongodb.MongoClient;

exports.displayLogin = function(req, res){
	  res.render('index1', { title: 'Gamified LMS' });
	};
	
exports.insertUser=function(req,res){	
	
	var fname=req.param("fname"),lname=req.param("lname");
	var email=req.param("email"),pswd=req.param("password");	
		
	if((fname!==undefined && pswd !==undefined && lname!==undefined && email !==undefined) && (fname!=="" && pswd !=="" && lname!=="" && email !==""))  
		{				
		MongoClient.connect(url, function (err, db) {
			  if (err) {
			    console.log('Unable to connect to the mongoDB server. Error:', err);
			  } else {		 
			    console.log('Connection established to', url);
			 
			    var collection = db.collection('savedSearches');	
			    
				var query = {};
				
				query["fname"] = fname;
				query["lname"] = lname;
				query["email"] = email;
				query["password"] = pswd;
				
				collection.insert(query, {w:1}, function(err, result) {
			    	if (err) {
				        console.log(err);
				        res.end("error");
				      } else {
				          console.log('Inserted:', result);
				          res.end("successful");			   
				      }
			    	db.close();
			    });
			  }
			});
		}
	else
		{
			console.log("invalid input");
			res.send({"Status":"Error"});
		}			
};



