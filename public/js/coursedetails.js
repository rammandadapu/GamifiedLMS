(function(){
	'use strict';

angular.module('courseapp',[])
.controller('courseController', courseController);

courseController.$inject = ['$scope'];

function courseController($scope){
	var course = this;
	course.courseDetails = {
		courseName : "JAVA",
		topics: [{
			name:"Data Types",
			difficulty: "Easy",
			topiclock:false,
			topiccomplete:false
		}, 
		{
			name:"Methods",
			difficulty: "Medium",
			topiclock:true,
			topiccomplete:false
		},
		{
			name:"Classes",
			difficulty: "Difficult",
			topiclock:true,
			topiccomplete:false
		},
		{
			name:"Interfaces",
			difficulty: "Medium",
			topiclock:true,
			topiccomplete:false
		}]
	};
	course.redirect = function(index){
		if(course.courseDetails.topics[index].topiclock===false){
			window.location = "/topicDetail:id";
		}
	};
	course.redirectQuiz = function(index){
		if(course.courseDetails.topics[index].topiclock===false){
			window.location = "/quiz";
		}
	};
	course.topicLock = function(index){
		if(course.courseDetails.topics[index].topiclock===true){
			return "fa-lock";
		}
		else{
			return "fa-unlock";
		}
	};
	course.challengeLock = function(index){
		if(course.courseDetails.topics[index].topiclock===false){
			return "fa-unlock";
		}
		else{
			return "fa-lock";
		}
	};
	course.getColor = function(index){
		if(course.courseDetails.topics[index].difficulty==="Easy"){
			return "topic-easy";
		} 
		else if(course.courseDetails.topics[index].difficulty==="Medium"){
			return "topic-medium";
		} 
		else if(course.courseDetails.topics[index].difficulty==="Difficult"){
			return "topic-difficult";
		}
	};
	course.getTopicPtr = function(index){
		if(course.courseDetails.topics[index].topiclock ===false){
			return "pointer";
		}
		else{
			return "not-allowed";
		}
	};
	course.getChallengePtr = function(index){
		if(course.courseDetails.topics[index].topiccomplete ===true){
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
