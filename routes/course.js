/**
 * Created by ram.mandadapu on 9/25/16.
 */
var mongodb = require('mongodb');
var constants = require('./constants');
var mongoUrl = constants.MongoURL;
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;

exports.createCourse = function (req, res) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', mongoUrl);
            var collection = db.collection('courses');
            var course = {};
            course["name"] = req.param("name");
            course["title"] = req.param("title");
            course["description"] = req.param("description");
            course["modules"] =[];
            course["assessments"]=[];
            course["module-assignment-order"] =[];

            console.log(course);

            collection.insert(course, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("inserted");
                    //Close connection
                    db.close();
                    res.status(201);
                    res.send("test");

                }

            });
        }
    });
};


exports.createModule= function (req, res) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', mongoUrl);
            var collection = db.collection('module');
            var module = {};

            module["title"] = req.param("title");
            module["content"] = req.param("content");


            console.log(module);

            collection.insertOne(module, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("inserted");
                    console.log(result);
                    //Close connection
                    db.close();
                    linkModuletoCourse(req.param('courseid'),result.ops[0]._id);
                    res.status(201);
                    res.send("test");

                }

            });
        }
    });
};


linkModuletoCourse=function(courseid,moduleid){
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', mongoUrl);
            var collection = db.collection('courses');


            var query  = {};
            query["_id"] = new ObjectId(courseid);
            var newModules={$addToSet: { modules: { $each: [ moduleid ] } } };
            collection.updateOne(query,newModules, function (err, result) {
                if (err) {
                    console.log('Hello');
                    console.log(err);
                } else {
                    console.log("inserted");
                   // console.log(result);
                    //Close connection
                    db.close();


                }

            });
        }
    });
};