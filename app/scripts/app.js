'use strict';
var myApp = angular.module("myApp", ["ngRoute"]);
//var ref = new Firebase("https://aestheticdrift.firebaseio.com/web/saving-data/fireblog/posts");
var main,
    showMe,
    itemX;

myApp.controller('MyController', ['$scope', '$http',
  function($scope, $http) {

    // Get a reference to our posts
    var mockRef = new Firebase("https://aestheticdrift.firebaseio.com/mock");

    // Attach an asynchronous callback to read the data at our posts reference
    mockRef.on("value", function(snapshot) {
      $scope.lessonObj = snapshot.val();
      //console.log("$scope.lessonObj", $scope.lessonObj);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    
    $scope.languages = ['english', 'spanish', 'indonesia'];

    /*//flat json file
    $http.get("scripts/lessons.json")
      .success(function(data) {
        $scope.lessonObj = data;
    });*/  

    $scope.closeResults = function() {
      $(".search-results").hide();
      $scope.findscope();
    };

    $scope.findscope = function() {
      $scope.$parent.main = true;
      $scope.$parent.showMe = true;
    };

    $scope.closeBox = function() {
      $scope.$parent.main = false;
      $scope.$parent.showMe = false;
    };

  }
]);


myApp.config(function($locationProvider, $routeProvider) {
    $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html', 
      controller: ''
    })
    .when('/english', {
      templateUrl: 'views/english.html'
    })
    .when('/spanish', {
      templateUrl: 'views/spanish.html'
    })
    .when('/indonesian', {
      templateUrl: 'views/indonesian.html'
    })
    .when('/form', {
      templateUrl: 'views/form.html', 
      controller: ''
    })
    .when('/login', {
      templateUrl: 'views/login.html'
    })
    .otherwise({
      redirectTo: '/',
      templateUrl: 'views/home.html'
    });
});


/*myApp.controller('myForm', ['$scope',
function($scope) {

  var ref = new Firebase("https://aestheticdrift.firebaseio.com/web/saving-data/fireblog");
  var d = new Date();
  
  $scope.today = Date.parse(d);

  $scope.submitForm = function(user) {
    var postsRef = ref.child("posts");
    postsRef.push({
      author: user.name,
      title: user.title,
      description: user.description,
      language: user.language
    });
    $scope.reset();
  };

  $scope.reset = function(user) {
    $scope.user = '';
  };

}]);*/

/*repeat UGC form fields*/
myApp.directive('ngFormElements', function() {
  return {
    transclude: true,
    template: '<div class=\"group\">' +
              '   <div class=\"flex-1\"><label>Language:</label></div>' +
              '   <div class=\"flex-1\">' +
              '       <div ng-repeat=\"item in messages\"><input for=\"user.language.\" ng-model=\"user.language\" type=\"checkbox\"/> {{item.language}}  </div>' +
              '   </div>' +
              '</div>',
    replace: true,
    restrict: 'E'
  }
});


//ng-modal isOpen
myApp.directive('ngModal', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div class="modal-mask flexbox-column" ng-class="{\'show-modal\': openModal}">' +
                '<div class="modal display-flex margin-auto">' +
                  '<div ng-click="closeModal()" class="close cursor">X</div>' +
                  '<div class="margin-auto"><vimeo-video player-id="video1" video-id="103384798" player-width="640" player-height="360"></vimeo-video></div>' +
                '</div>' +
              '</div>'
  }
});

//todo: use route params to change view data instead of using seperate views
//language controllers
myApp.controller('englishController', function($scope, $routeParams) {
    $scope.titleMessage = "English";
    $scope.item = $routeParams.itemTitle;
});

myApp.controller('indonesiaController', function($scope, $routeParams) {
  $scope.titleMessage = "Indonesia";
  $scope.item = $routeParams.itemTitle;
});

myApp.controller('spanishController', function($scope, $routeParams) {
  $scope.titleMessage = "Spanish";
  $scope.item = $routeParams.itemTitle;
});