/**
 * Created by ram.mandadapu on 10/15/16.
 */
exports.displayAdminHome = function(req, res){
    res.render('adminHome', { title: 'Gamified LMS' });
};

exports.displayCourseCreation = function(req, res){
    res.render('courseCreation', { title: 'Gamified LMS' });
};