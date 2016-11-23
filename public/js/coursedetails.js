(function(){
	'use strict';

angular.module('courseapp',['ngRoute'])
.controller('courseController', courseController);

courseController.$inject = ['$scope','$http','$routeParams'];

function courseController($scope, $http,$routeParams){
	var course = this;
	//console.log(courseId);
	course.courseDetails;
	course.courseName = courseName;
	goToCourse();
		function goToCourse(){
			var a = "/course/"+courseId+"/module";
			$http({
			  method: 'GET',
			  url: a, 
			}).then((response) => {
			    course.courseDetails = response.data;
			    console.log(course.courseDetails);
			  });
		};
	course.redirect = function(id){
		//console.log(id);
		if(true){
			window.location = "/topicDetail/"+courseName+"/"+id;
		}
	};
	course.redirectQuiz = function(index){
		if(true){
			window.location = "/quiz/"+quizId+"/course/"+courseId+"/module/"+moduleId+"/coursename/"+courseName;
		}
	};
	course.topicLock = function(index){
		if(true){
			return "fa-lock";
		}
		else{
			return "fa-unlock";
		}
	};
	course.challengeLock = function(index){
		if(true){
			return "fa-unlock";
		}
		else{
			return "fa-lock";
		}
	};
	course.getColor = function(index){
		//console.log("inside getColor",index,course.courseDetails[index][0].difficulty);
		if(course.courseDetails[index][0].difficulty==="Easy"){
			return "topic-easy";
		} 
		else if(course.courseDetails[index][0].difficulty==="Medium"){
			return "topic-medium";
		} 
		else if(course.courseDetails[index][0].difficulty==="Difficult"){
			return "topic-difficult";
		}
	};
	course.getTopicPtr = function(index){
		if(true){
			return "pointer";
		}
		else{
			return "not-allowed";
		}
	};
	course.getChallengePtr = function(index){
		if(true){
			return "pointer";
		}
		else{
			return "not-allowed";
		}
	};
}
angular.element(document).ready(function(){
				angular.bootstrap(document.getElementById("coursemodule"), ['courseapp']);
			});
})();
