/**
 * Created by ram.mandadapu on 10/15/16.
 */
exports.displayAdminHome = function(req, res){
    res.render('adminHome', { title: 'Gamified LMS' });
};

exports.displayCourseCreation = function(req, res){
    res.render('courseCreation', { title: 'Gamified LMS' });
};

exports.displayAdminAnalytics = function(req, res){
    res.render('adminAnalytics', { title: 'Gamified LMS' });
};

exports.displayAssesstmentCreation = function(req, res){
    res.render('assessmentCreation', { title: 'Gamified LMS' });
};