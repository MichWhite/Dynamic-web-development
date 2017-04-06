var app = angular.module('WebApp');


app.controller('mainController', ['cart','$scope', function(cart, $scope) {
    // create a message to display in our view
      $scope.message = 'CHIPPER';
    console.log(cart.cartTotal);
    console.log(cart.cart);
        $scope.CartCounter = cart.cartTotal ;

}
  ]);
