angular.module('jsonTreeDemo', ['angular-json-tree'])
	.controller('DemoCtrl', ['$scope', '$http', function ($scope, $http) {
		$scope.jsonString = "{\n  \"id\": \"0001\",\n  \"type\": \"donut\",\n  \"name\": \"Cake\",\n  \"ppu\": 0.55,\n  \"batters\":\n    {\n      \"batter\":\n        [\n          { \"id\": \"1001\", \"type\": \"Regular\" },\n          { \"id\": \"1002\", \"type\": \"Chocolate\" },\n          { \"id\": \"1003\", \"type\": \"Blueberry\" },\n          { \"id\": \"1004\", \"type\": \"Devil's Food\" }\n        ]\n    },\n  \"topping\":\n    [\n      { \"id\": \"5001\", \"type\": \"None\" },\n      { \"id\": \"5002\", \"type\": \"Glazed\" },\n      { \"id\": \"5005\", \"type\": \"Sugar\" },\n      { \"id\": \"5007\", \"type\": \"Powdered Sugar\" },\n      { \"id\": \"5006\", \"type\": \"Chocolate with Sprinkles\" },\n      { \"id\": \"5003\", \"type\": \"Chocolate\" },\n      { \"id\": \"5004\", \"type\": \"Maple\" }\n    ]\n}";
		$scope.json = JSON.parse($scope.jsonString);
		$scope.$watch('jsonString', function (newVal, oldVal) {
			if (newVal !== oldVal) {
				$scope.json = JSON.parse(newVal);
			}
		});
		$scope.loadUrl = function () {
			if ($scope.jsonUrl) {
				$http.get($scope.jsonUrl).then(function (resp) {
					$scope.jsonString = JSON.stringify(resp.data);
					$scope.json = resp.data;
				});
			}
		};
	}]);