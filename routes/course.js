/**
 * Created by ram.mandadapu on 9/25/16.
 */
var utilCode = require('./commonutil');
var ObjectId = require('mongodb').ObjectID;
var c2p = require('callback2promise');



exports.createCourse = function (req, res) {
    var course = {};
    course["name"] = req.param("name");
    course["title"] = req.param("title");
    course["description"] = req.param("description");
    course["imgurl"] = req.param("imgurl");
    course["modules"] = [];
    utilCode.handleMethodCall(utilCode.insertDetails, ['courses', course], res);

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

    var promise = c2p(utilCode.insertDetails)('modules', module);

    promise.then(function (result) {
        //Linking course to module
        utilCode.linkDocuments('courses', req.param('courseid'), result.ops[0]._id, 'modules');
        utilCode.sendResponse(201, result, res);
    }).catch(function (err) {
        console.log(err)
        utilCode.sendResponse(404, err, res);
    })
}


exports.createAssessment = function (req, res) {

    var assessment = {};
    assessment["questions"] = [];
    assessment["questions"].push(req.param("question"));
    var promise = c2p(utilCode.insertDetails)('assessments', assessment);

    promise.then(function (result) {
        //Linking module to assessments
        utilCode.linkDocuments('modules', req.param('moduleid'), result.ops[0]._id, 'assessments');
        utilCode.sendResponse(201, result, res);
    }).catch(function (err) {
        utilCode.sendResponse(404, "Failed", res);
    })

}


exports.getCoursesDetails = function (req, res) {
    var query = {};
    var columnFilter = {};
    var courseid = req.param("id");
    if (null != courseid && undefined != courseid) {
        query["_id"] = new ObjectId(courseid);
    } else {
        columnFilter = {"name": 1, "description": 1,"imgurl": 1};
    }
    utilCode.handleResponse('courses', query, columnFilter, res);

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
    utilCode.handleResponse('module', query, columnFilter, res);
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
    utilCode.handleResponse('assessments', query, columnFilter, res);
}


exports.searchCourse = function (req, res) {
    var keyword = req.param("q");
    var query = [{$match: {$or: [{'name': {$regex: '.*' + keyword + '.*',"$options": "i"}}, {'title': {$regex: '.*' + keyword + '.*',"$options": "i"}}, {'description': {$regex: '.*' + keyword + '.*',"$options": "i"}}]}},
        {$project: {'title': 1, 'name': 1, 'description':1, 'imgurl':1}}];
    utilCode.handleMethodCall(utilCode.callAggregate, ['courses', query], res);
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
    var promise = c2p(utilCode.getDetails)('courses', query, columnFilter);
    promise.then(function (result) {
        result[0].modules.forEach(
            function (recordid) {
                moduleRequests.push(c2p(utilCode.getDetails)('modules', {'_id': recordid}, {
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




