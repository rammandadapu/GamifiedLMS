(function(){
	'use strict';
angular.module('courselistapp',[])
.controller('courseListController', courseListController);

	courseListController.$inject = ['$scope','$http'];

	function courseListController($scope, $http){
		let courselist = this;
		courselist.resdata;
		courselist.encourses;
		$scope.searchTerm;
		$scope.searchedCourses;
		//courselist.searchTerm;
		//courselist.searchedCourses;
		getAllCourses(); 
		//console.log(courselist.encourses);
		// courselist.encourses=[{
		// 	img: "img/java.png",
		// 	link: "/course/581bd25b5968d1438273c216",
		// 	course:"Java"
		// },
		// {
		// 	img: "img/ruby.png",
		// 	link: "",
		// 	course:"Ruby",
		// 	id: ""	
		// },
		// {
		// 	img: "img/python.jpg",
		// 	link: "",
		// 	course:"Python"	
		// 	id:"581bd2985968d1438273c217"	
		// }];

		courselist.tcourses=[{
			img: "img/ruby.png",
			link: "",
			course:"Ruby"		
		},
		{
			img: "img/html.png",
			link: "",
			course:"HTML",
			id: "581bd2e55968d1438273c218"		
		},
		{
			img: "img/organic.png",
			link: "",
			course:"Organic Chemistry"		
		}];

		function getAllCourses(){
			$http({
			  method: 'GET',
			  url: '/course', 
			}).then((response) => {
					console.log("Inside getAllCourses",response.data);
					courselist.encourses = response.data;
			    //return response.data;
			  });
			//window.location = link;
		}

		$scope.searchCourse = ()=>{
			console.log($scope.searchTerm);
			$http({
			  method: 'GET',
			  url: '/search/'+ $scope.searchTerm, 
			  //url: '/search/'+ courselist.searchTerm, 
			}).then((response) => {
					console.log("Inside searchedCourses",response.data);
					$scope.searchedCourses = response.data;
					console.log($scope.searchedCourses);
					document.getElementById('searchLink').click();
					//courselist.searchedCourses = response.data;
					//console.log(courselist.searchedCourses);

			    //return response.data;
			  });
		};

		$scope.goToCourse = (id,name)=>{
			console.log("id: ",id);
			if(name==''&&id==''){
				name=courselist.encourses[0].name;
				id= courselist.encourses[0]._id;
			}
			window.location="/coursedetails/"+id+"/"+name;
		};

		//admin home page
		$scope.courseCreation = function () {
			window.location = '/courseCreation';
		};
	}

	angular.element(document).ready(function(){
				angular.bootstrap(document.getElementById("courselist"), ['courselistapp']);
	});
})();