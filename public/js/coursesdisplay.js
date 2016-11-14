(function(){
	'use strict';
	angular.module('courselistapp',[])
.controller('courseListController', courseListController);

	courseListController.$inject = ['$scope','$http'];

	function courseListController($scope, $http){
		let courselist = this;
		courselist.resdata;

		courselist.encourses=[{
			img: "img/java.png",
			link: "/course/",
			course:"Java"	
		},
		{
			img: "img/ruby.png",
			link: "",
			course:"Java"	
		},
		{
			img: "img/python.jpg",
			link: "",
			course:"Java"		
		}];

		courselist.tcourses=[{
			img: "img/algebra.png",
			link: "",
			course:"Java"		
		},
		{
			img: "img/html.png",
			link: "",
			course:"Java"		
		},
		{
			img: "img/organic.png",
			link: "",
			course:"Java"		
		}];

		courselist.goToCourse= function(link){
			var a = link + "581bd25b5968d1438273c216";
			$http({
			  method: 'GET',
			  url: a, 
			}).then((response) => {
			    // this callback will be called asynchronously
			    // when the response is available
			    courselist.resdata = response.data;
			  });
			//window.location = link;
		};
	}
	
	angular.element(document).ready(function(){
				angular.bootstrap(document.getElementById("courselist"), ['courselistapp']);
	});
})();