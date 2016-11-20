(function(){
	'use strict';
	angular.module('courselistapp',[])
.controller('courseListController', courseListController);

	courseListController.$inject = ['$scope','$http'];

	function courseListController($scope, $http){
		let courselist = this;
		courselist.resdata;
		courselist.encourses;
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
		courselist.goToCourse = (id,name)=>{
			console.log("id: ",id);
			window.location="/coursedetails/"+id+"/"+name;
		};
	}
	
	angular.element(document).ready(function(){
				angular.bootstrap(document.getElementById("courselist"), ['courselistapp']);
	});
})();