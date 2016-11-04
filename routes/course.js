/**
 * Created by ram.mandadapu on 9/25/16.
 */
var mongodb = require('mongodb');
var constants = require('./constants');
var mongoUrl = constants.MongoURL;
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var c2p = require('callback2promise');


sendResponse = function (code, response, res) {
    res.status(code);
    res.send(response);
}

connectToDB = function (callme) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callme(err, null);
        } else {
            console.log('Connection established to', mongoUrl);
            callme(null, db);
        }
    });
}


handleMethodCall = function (methodname, params, res) {
    var promise = c2p(methodname)(...params
    )
    ;
    //... is for variable number of arguments
    promise.then(function (result) {
        sendResponse(201, result, res);
    }).catch(function (err) {
        sendResponse(404, "Failed", res);
    })
}


insertDetails = function (dbcollection, recordToInsert, callme) {

    connectToDB(function (err, db) {
        if (err) {
            console.log(err);
            callme('fail', null);
        }
        else {
            var collection = db.collection(dbcollection);

            collection.insert(recordToInsert, function (err, result) {
                if (err) {
                    console.log(err);
                    db.close();
                    callme('fail', null);
                } else {
                    console.log("inserted");
                    db.close();
                    callme(null, result);
                }

            });

        }
    });

}

updateDetails = function (dbcollection, query, newRecord, callme) {
    connectToDB(function (err, db) {
        if (err) {
            console.log(err);
            callme('fail', null);
        }
        else {
            var collection = db.collection(dbcollection);
            collection.updateOne(query, newRecord, function (err, result) {

                if (err) {
                    console.log(err);
                    db.close();
                    callme(err, null);
                } else {
                    console.log("inserted...");
                    //Close connection
                    db.close();
                    callme(null, result);
                }
            });
        }

    });
}


getDetails = function (dbcollection, query, columnFilter, callme) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', mongoUrl);
            console.log(dbcollection);
            var collection = db.collection(dbcollection);

            collection.find(query, columnFilter).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    callme(err, null);
                } else {
                    db.close();
                    callme(null, result);
                }

            });
        }
    });
}

callAggregate = function (dbcollection, query, callme) {
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', mongoUrl);
            console.log(dbcollection);
            var collection = db.collection(dbcollection);

            collection.aggregate(query, function (err, result) {
                if (err) {
                    console.log(err);
                    callme(err, null);
                } else {
                    db.close();
                    callme(null, result);
                }

            });
        }
    });
}

linkDocuments = function (dbcollection, parentid, childid, parentFieldName) {
    connectToDB(function (err, db) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Connection established to', mongoUrl);
            var collection = db.collection(dbcollection);
            var query = {};
            query["_id"] = new ObjectId(parentid);
            var addToSet = {};
            addToSet[parentFieldName] = {$each: [childid]};
            var newModules = {$addToSet: addToSet};
            collection.updateOne(query, newModules, function (err, result) {

                if (err) {
                    console.log(err);
                } else {
                    //Close connection
                    db.close();
                }

            });
        }
    });
};


handleResponse = function (dbcollection, query, columnFilter, res) {
    var promise = c2p(getDetails)(dbcollection, query, columnFilter);
    promise.then(function (result) {
        sendResponse(200, result, res);
    }).catch(function (err) {
        console.log(err);
        sendResponse(404, err, res);
    })
}

exports.createCourse = function (req, res) {
    var course = {};
    course["name"] = req.param("name");
    course["title"] = req.param("title");
    course["description"] = req.param("description");
    course["imgurl"] = req.param("imgurl");
    course["modules"] = [];
    handleMethodCall(insertDetails, ['courses', course], res);

};


exports.createModule = function (req, res) {

    var courseDetails = {};
    courseDetails["_id"] = new ObjectId(req.param("courseid"));

    var module = {};
    module["title"] = req.param("title");
    module["content"] = req.param("content");
    module["points"] = req.param("points");
    module["difficulty"] = req.param("difficulty");
    module["videourl"] = req.param("videourl");
    module["assessments"] = [];

    var promise = c2p(insertDetails)('modules', module);

    promise.then(function (result) {
        //Linking course to module
        linkDocuments('courses', req.param('courseid'), result.ops[0]._id, 'modules');
        sendResponse(201, result, res);
    }).catch(function (err) {
        sendResponse(404, "Failed", res);
    })
}


exports.createAssessment = function (req, res) {

    var assessment = {};
    assessment["questions"] = [];
    assessment["questions"].push(req.param("question"));
    var promise = c2p(insertDetails)('assessments', assessment);

    promise.then(function (result) {
        //Linking module to assessments
        linkDocuments('modules', req.param('moduleid'), result.ops[0]._id, 'assessments');
        sendResponse(201, result, res);
    }).catch(function (err) {
        sendResponse(404, "Failed", res);
    })

}

exports.getCoursesDetails = function (req, res) {
    var query = {};
    var columnFilter = {};
    var courseid = req.param("id");
    if (null != courseid && undefined != courseid) {
        query["_id"] = new ObjectId(courseid);
    } else {
        columnFilter = {"name": 1, "description": 1}
    }
    handleResponse('courses', query, columnFilter, res);

}


exports.getModuleDetails = function (req, res) {

    var query = {};
    var columnFilter = {};
    var moduleid = req.param("moduleid");
    if (null != moduleid && undefined != moduleid) {
        query["_id"] = new ObjectId(moduleid);
    } else {
        columnFilter = {};
    }
    handleResponse('module', query, columnFilter, res);
}

exports.getAssessment = function (req, res) {

    var query = {};
    var columnFilter = {};
    var assessmentid = req.param("assessmentid");
    if (null != assessmentid && undefined != assessmentid) {
        query["_id"] = new ObjectId(assessmentid);
    } else {
        columnFilter = {};
    }
    handleResponse('assessments', query, columnFilter, res);
}


exports.searchCourse = function (req, res) {
    var keyword = req.param("q");
    var query = [{$match: {$or: [{'name': {$regex: '.*' + keyword + '.*',"$options": "i"}}, {'title': {$regex: '.*' + keyword + '.*',"$options": "i"}}, {'description': {$regex: '.*' + keyword + '.*',"$options": "i"}}]}},
        {$project: {'title': 1, 'name': 1, 'description':1}}];
    handleMethodCall(callAggregate, ['courses', query], res);
}

exports.getAllModulesofCourse = function (req, res) {

    var query = {};
    var columnFilter = {'modules': 1};
    var courseid = req.param("courseid");
    if (null != courseid && undefined != courseid) {
        query["_id"] = new ObjectId(courseid);
    } else {
        columnFilter = {'modules': 1};
    }

    var moduleRequests = [];
    var promise = c2p(getDetails)('courses', query, columnFilter);
    promise.then(function (result) {
        result[0].modules.forEach(
            function (recordid) {
                moduleRequests.push(c2p(getDetails)('modules', {'_id': recordid}, {
                    'title': 1,
                    'difficulty': 1,
                    'assessments': 1
                }));
            }
        )
    }).then(function () {
        Promise.all(moduleRequests).then(function (values) {
            res.status(200);
            res.send(values);
        })
    }).catch(function (err) {
        console.log(err);
        res.status(404);
        res.send();
    })


}




