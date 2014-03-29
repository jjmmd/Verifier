'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
	controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {

	getReportList();

	function getReportList(){
		$http.post('/api/getReportList').then( function(result) {
			$scope.templateList = result.data.response.template
		})
	}

	$scope.getTemplate = function(){
		
		console.log($scope.t)

		console.log($scope.template.id)

		$http.post('/api/getTemplate').then( function(result) {
			$scope.outputText = result.data.response.template.templateData
			//console.log(result.data.response.template[0].templateData)
		})
	}

}])

function TemplateListCtrl($scope) {

}