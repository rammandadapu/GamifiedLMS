/**
 * Created by ram.mandadapu on 9/25/16.
 */
var mongodb = require('mongodb');
var constants = require('./constants');
var mongoUrl = constants.MongoURL;
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var c2p = require('callback2promise');

var _this = this;
exports.sendResponse = function (code, response, res) {
    res.status(code);
    res.send(response);
}

exports.connectToDB = function (callme) {
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


exports.handleMethodCall = function (methodname, params, res) {
    var promise = c2p(methodname).apply( this, params );
    promise.then(function (result) {
        _this.sendResponse(201, result, res);
    }).catch(function (err) {
        _this.sendResponse(404, "Failed", res);
    })
}


exports.insertDetails = function (dbcollection, recordToInsert, callme) {

    _this.connectToDB(function (err, db) {
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
                    callme(err, null);
                } else {
                    console.log("inserted..");
                    db.close();
                    callme(null, result);
                }

            });

        }
    });

}

exports.updateDetails = function (dbcollection, query, newRecord, callme) {
    _this.connectToDB(function (err, db) {
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


exports.getDetails = function (dbcollection, query, columnFilter, callme) {
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

exports.callAggregate = function (dbcollection, query, callme) {
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

exports.linkDocuments = function (dbcollection, parentid, childid, parentFieldName) {
    _this.connectToDB(function (err, db) {
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


exports.handleResponse = function (dbcollection, query, columnFilter, res) {
    var promise = c2p(this.getDetails)(dbcollection, query, columnFilter);
    promise.then(function (result) {
        _this.sendResponse(200, result, res);
    }).catch(function (err) {
        console.log(err);
        _this.sendResponse(404, err, res);
    })
}