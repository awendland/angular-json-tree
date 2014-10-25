angular.module('jsonTreeDemo', ['angular-json-tree'])
	.controller('DemoCtrl', ['$scope', function ($scope) {
		$scope.jsonString = "{\"glossary\":{\"title\":\"example glossary\",\"GlossDiv\":{\"title\":\"S\",\"GlossList\":{\"GlossEntry\":{\"ID\":\"SGML\",\"SortAs\":\"SGML\",\"GlossTerm\":\"Standard Generalized Markup Language\",\"Acronym\":\"SGML\",\"Abbrev\":\"ISO 8879:1986\",\"GlossDef\":{\"para\":\"A meta-markup language, used to create markup languages such as DocBook.\",\"GlossSeeAlso\":[\"GML\",\"XML\"]},\"GlossSee\":\"markup\"}}}}}";
		$scope.getJson = function () {
			if (!$scope.jsonString) {
				return {};
			} else {
				return JSON.parse($scope.jsonString);
			}
		}
	}]);