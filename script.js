(function() {  

  var app = angular.module("bookViewer", [])

  var MainController = function($scope, $http) {
    
    $http.defaults.useXDomain = true;
    $http.defaults.withCredentials = true;
    delete $http.defaults.headers.common["X-Requested-With"];
    $http.defaults.headers.common["Accept"] = "application/json";
    $http.defaults.headers.common["Content-Type"] = "application/json";

    var $scope.order = function(book_id){
      $http.get("http://localhost:3000/api/order?book_id="+book_id+"&user_id="+$scope.loggedinUser.id)
        .then(hasResponse, onError);
    }

    var $scope.pay = function(){
      $http.get("http://localhost:3000/api/pay?&user_id="+$scope.loggedinUser.id)
        .then(hasResponse, onError);
    }

    var $scope.restock = function(isbn,price,quantity){
      $http.get("http://localhost:3000/api/fill_stock?&isbn="+isbn+"&price="+price+"&quantity="+quantity)
        .then(hasResponse, onError);
    }

    var userIsCompleted = function(response) {
      $scope.loggedinUser = response.data;
      $http.get("http://localhost:3000/api/all_books")
        .then(hasResponse, onError);
    };
    
    var userLoggedIn = function(response)    {
      $scope.loggedinUser = response.data;
    }
    
    var hasResponse = function(response){
      $scope.books = response.data;
    }

    var onError = function(reason) {
      $scope.error = "Could not fetch the data!"
    };
    
    $scope.search = function(booktitle){
      $http.get("https://api.github.com/users/"+ booktitle)
      .then(userIsCompleted, onError);
    }
    
    $scope.login = function(loginUsername, loginPassword){
      $http.get("http://localhost:3000/api/login?username="+loginUsername+
      "&password="+loginPassword).then(userLoggedIn, onError);
    }

    $scope.booktitle = "Harry Potter test";
    $scope.message = "Hello, Bookstore!";
    $scope.bookSortOrder = "-stargazers_count";
  
  };
  
  app.controller("MainController", MainController);

}());

