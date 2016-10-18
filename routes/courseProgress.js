/**
 * Created by sbasati on 10/16/16.
 */
var mongodb = require('mongodb');
var constants = require('./constants');
var mongoUrl = constants.MongoURL;
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');


/**
 * API is called when a user enroll for particular course to track the progress
 * @param req
 * @param res
 */
exports.createCourseProgress = function (req, res) {
    var userId = req.param("userId");
    var courseId = req.param("courseId");
    var courseName = req.param("courseName");
    var totalModules = req.param("totalModules"); //to be fetched from aggregating the course collection
    var currentModule = req.param("currentModule");
    var totalPoints = req.param("totalPoints"); //to be fetched from aggregating the course collection
    var currentPoints = req.param("currentPoints");
    var currentLevel = req.param("currentLevel");
    if((userId!==undefined && courseId !==undefined && courseName!==undefined && totalModules !==undefined && currentModule !== undefined && totalPoints !== undefined && currentPoints !== undefined && currentLevel !== undefined))
    {
        MongoClient.connect(mongoUrl, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                console.log('Connection established to:', mongoUrl);
                var collection = db.collection('courseProgress');
                var courseProgress = {};
                courseProgress["userId"] = userId;
                courseProgress["courseId"] = courseId;
                courseProgress["courseName"] = courseName;
                courseProgress["totalModules"] = totalModules; //to be fetched from aggregating the course collection
                courseProgress["currentModule"] = currentModule;
                courseProgress["totalPoints"] = totalPoints;
                courseProgress["currentPoints"] = currentPoints;
                courseProgress["currentLevel"] = currentLevel;
                //courseProgress["enrollTime"] = req.param("enrollTime");//used for analytics

                console.log("Data to be inserted into the Course progress:", courseProgress);

                collection.insertOne(courseProgress, {w:1},function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("inserted:",result);
                        //Close connection
                        db.close();
                        res.send({"Status": "success", "result": result.ops[0]});

                    }

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
