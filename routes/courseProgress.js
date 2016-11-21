/**
 * Created by sbasati on 10/16/16.
 */
var mongodb = require('mongodb');
var constants = require('./constants');
var mongoUrl = constants.MongoURL;
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var utilCode = require('./commonutil');
var c2p = require('callback2promise');
var assert = require('assert');


exports.enrollIntoCourse = function (req, res) {

    var courseId = new ObjectId(req.param("courseid"));
    var promise = c2p(utilCode.getDetails)('courses', {"_id": courseId}, {"modules": 1});
    promise.then(function (result) {
        var modules = [];
        result[0].modules.forEach(val => modules.push({"_id": val, "status": false}));
        var record = {};
        record["courseid"] = courseId;
        record["userid"] = new ObjectId(req.param("userid"));
        record["modules"] = modules;
        utilCode.handleMethodCall(utilCode.insertDetails, ['courseprogress', record], res);
        console.log(record);
        res.send();
    }).catch(function (err) {
        utilCode.sendResponse(404, err, res);
    })
};

exports.getAllModulesOfRegisteredCourse=function(req,res){
    var courseId = new ObjectId(req.param("courseid"));
    var userId = new ObjectId(req.param("userid"));
    utilCode.handleMethodCall(utilCode.getDetails, ['courseprogress', {"courseid": courseId,"userid":userId},{}], res);
}

exports.postQuizResults = function (req,res) {
    var courseId = new ObjectId(req.param("courseid"));
    var userId = new ObjectId(req.param("userid"));
    var moduleId = new ObjectId(req.param("moduleid"));
    utilCode.handleMethodCall(utilCode.updateDetails, ['courseprogress', {"courseid": courseId,"userid":userId,"modules._id":moduleId},{$set: { "modules.$.status": true }}], res);

}

