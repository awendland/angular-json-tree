/*
 * Other JSON resources:
 *  - http://beta.json-generator.com/
 *  - http://jsbeautifier.org/
 *  - http://jsonlint.com/
 */

angular.module('jsonTreeDemo', ['angular-json-tree'])
	.controller('DemoCtrl', ['$scope', '$http', function ($scope, $http) {
		$scope.json = {};
		$scope.json.string = "{\n  \"id\": \"0001\",\n  \"type\": \"donut\",\n  \"name\": \"Cake\",\n  \"ppu\": 0.55,\n  \"batters\":\n    {\n      \"batter\":\n        [\n          { \"id\": \"1001\", \"type\": \"Regular\" },\n          { \"id\": \"1002\", \"type\": \"Chocolate\" },\n          { \"id\": \"1003\", \"type\": \"Blueberry\" },\n          { \"id\": \"1004\", \"type\": \"Devil's Food\" }\n        ]\n    },\n  \"topping\":\n    [\n      { \"id\": \"5001\", \"type\": \"None\" },\n      { \"id\": \"5002\", \"type\": \"Glazed\" },\n      { \"id\": \"5005\", \"type\": \"Sugar\" },\n      { \"id\": \"5007\", \"type\": \"Powdered Sugar\" },\n      { \"id\": \"5006\", \"type\": \"Chocolate with Sprinkles\" },\n      { \"id\": \"5003\", \"type\": \"Chocolate\" },\n      { \"id\": \"5004\", \"type\": \"Maple\" }\n    ]\n}";
		$scope.json.object = JSON.parse($scope.json.string);
		var debounced;
		$scope.handleError = function ($event, jsonString) {
			$scope.error = null;
			clearTimeout(debounced);
			debounced = setTimeout(function() {
				try {
					$scope.json.object = JSON.parse(jsonString);
				} catch (e) {
					console.log(e);
					$scope.error = {
						message: e.message,
						show: true
					}
				}
				$scope.$apply();
			}, 1500);
		};
		$scope.loadUrl = function () {
			if ($scope.json.url) {
				$scope.json.badUrl = false;
				$http.get($scope.json.url).then(function (resp) {
					$scope.json.string = JSON.stringify(resp.data, null, 2);
				}, function () {
					$scope.json.badUrl = true;
				});
			}
		};
	}])
	.directive("fileread", [function () {
	    return {
	        scope: {
	            fileread: "="
	        },
	        link: function (scope, element, attributes) {
	            element.bind("change", function (changeEvent) {
	                var reader = new FileReader();
	                reader.onload = function (loadEvent) {
	                    scope.$apply(function () {
	                        scope.fileread = loadEvent.target.result;
	                    });
	                }
	                reader.readAsText(changeEvent.target.files[0]);
	            });
	        }
	    }
	}]);