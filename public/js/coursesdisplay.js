(function(){
	'use strict';
	angular.module('courselistapp',[])
.controller('courseListController', courseListController);

	courseListController.$inject = ['$scope'];

	function courseListController($scope){
		var courselist = this;

		courselist.encourses=[{
			img: "img/java.png",
			link: "/coursedetails"	
		},
		{
			img: "img/ruby.png",
			link: ""	
		},
		{
			img: "img/python.jpg",
			link: ""	
		}];

		courselist.tcourses=[{
			img: "img/algebra.png",
			link: ""	
		},
		{
			img: "img/html.png",
			link: ""	
		},
		{
			img: "img/organic.png",
			link: ""	
		}];

		courselist.goToCourse= function(link){
		window.location = link;
		};
	}
	
	angular.element(document).ready(function(){
				angular.bootstrap(document.getElementById("courselist"), ['courselistapp']);
	});
})();