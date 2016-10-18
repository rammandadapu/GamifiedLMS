(function(){
	'use strict';

angular.module('userapp',[])
.controller('userController', userController);

userController.$inject = ['$scope'];

function userController($scope){
	var user = this;
	user.titl = "Beginner";
	user.score = 560;

	user.badges =[{
		name: "C++ Newbie",
		points:200,
		badgeImg:"img/coursedetails/bronze.png"
	},{
		name: "HTML Wizard",
		points: 740,
		badgeImg:"img/coursedetails/topbadge.png"
	}];

	user.rankings =[{
		name: "Harry Potter",
		title: "Wizard",
		points: 1050
	},{
		name: "Hermione Granger",
		title: "Wizard",
		points: 900
	},{
		name: "Ron Weasley",
		title: "Intermediate",
		points: 500
	}];

	user.goals = [{
		name: "Finish 3 Chapters",
		desc: "Complete the next 3 chapters in Java",
		deadline: "Nov'16"
	},{
		name: "Complete Java Topics",
		desc: "Complete the next 3 chapters in Java",
		deadline: "Jan'17"
	},{
		name: "Study CSS3 Chapters",
		desc: "Complete the css3 chapters in Java",
		deadline: "Apr'17"
	}];

}
angular.element(document).ready(function(){
				angular.bootstrap(document.getElementById("usermodule"), ['userapp']);
			});
})();
