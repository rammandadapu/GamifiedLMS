(function(){
	'use strict';

angular.module('userapp',['courselistapp'])
.controller('userController', userController);

userController.$inject = ['$scope'];

function userController($scope){
	var user = this;
	user.titl = "Beginner";
	user.score = 560;

	user.badges =[{
		name: "C++ Wizard",
		points:800,
		badgeImg:"/img/coursedetails/gold.png"
	},{
		name: "HTML Wizard",
		points: 740,
		badgeImg:"/img/coursedetails/topbadge.png"
	},{
		name: "SCSS Lord",
		points: 440,
		badgeImg:"/img/coursedetails/bronze.png"
	},{
		name: "MS Wizard",
		points: 840,
		badgeImg:"/img/coursedetails/gold.png"
	},{
		name: "C Newbie",
		points: 340,
		badgeImg:"/img/coursedetails/topbadge.png"
	},{
		name: "D3JS Wizard",
		points: 740,
		badgeImg:"/img/coursedetails/gold.png"
	},{
		name: "ReactJS Newbie",
		points: 400,
		badgeImg:"/img/coursedetails/topbadge.png"
	}];

	user.rankings =[{
		name: "Jon Wayz",
		title: "Advanced",
		points: 1550
	},{
		name: "Alicia Zimmer",
		title: "Adavanced",
		points: 1055
	},{
		name: "Vanessa Warder",
		title: "Intermediate",
		points: 980
	},{
		name: "Bill Anderson",
		title: "Intermediate",
		points: 900
	},{
		name: "Victor Igor",
		title: "Intermediate",
		points: 890
	},{
		name: "Tarik Ghebeish",
		title: "Intermediate",
		points: 820
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

	user.socialdetails =[{
		link: "https://www.facebook.com/",
		icon: "img/social-media/fb.png"
	},
	{
		link: "https://www.linkedin.com/",
		icon: "img/social-media/link.png"
	},
	{
		link: "https://twitter.com/",
		icon: "img/social-media/twitter.png"
	}
	];

}
angular.element(document).ready(function(){
				angular.bootstrap(document.getElementById("usermodule"), ['userapp']);
			});
})();
