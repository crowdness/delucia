'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'views/view2.html',
    controller: 'View2Ctrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html'
  });
}])

.controller('View2Ctrl', [function() {

}]);