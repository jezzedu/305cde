(function() {

  

  var app = angular.module("bookViewer", [])

  var MainController = function($scope, $http) {
    
    $http.defaults.useXDomain = true;
    $http.defaults.withCredentials = true;
    delete $http.defaults.headers.common["X-Requested-With"];
    $http.defaults.headers.common["Accept"] = "application/json";
    $http.defaults.headers.common["Content-Type"] = "application/json";

    var onUserComplete = function(response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
        .then(hasResponse, hasError);
    };
    
    var userLogedIn = function(response)    {
      $scope.user = response.data;
    }
    
    var hasResponse = function(response){
      $scope.repos = response.data;
    }

    var hasError = function(reason) {
      $scope.error = "Could not fetch the data!"
    };
    
    $scope.search = function(booktitle){
      $http.get("https://api.github.com/users/"+ booktitle)
      .then(onUserComplete, hasError);
    }
    
    $scope.login = function(loginUsername, loginPassword){
      $http.get("http://localhost:3000/api/login?username="+loginUsername+
      "&password="+loginPassword).then(userLogedIn, hasError);
    }

    $scope.booktitle = "Harry Potter test";
    $scope.message = "Hello, Bookstore!";
    $scope.bookSortOrder = "-stargazers_count";
  
  };
  
  app.controller("MainController", MainController);

}());

