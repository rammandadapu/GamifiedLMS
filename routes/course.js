/**
 * Created by ram.mandadapu on 9/25/16.
 */
var mongodb = require('mongodb');
var constants = require('./constants');
var mongoUrl = constants.MongoURL;
var MongoClient = mongodb.MongoClient;

exports.createCourse = function (req, res) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', mongoUrl);
            var collection = db.collection('courses');

            var course = "{}";
           // course["name"] = "test";

            collection.insert(course,{w:1}, function (err, result) {
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
}