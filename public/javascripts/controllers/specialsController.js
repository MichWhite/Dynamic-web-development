var app = angular.module('WebApp');

app.controller('specialsController', ['$scope', '$http','cart', function($scope, $http,cart) {
    findAll();



    $scope.addSpecialsCart = function (item) {
        console.log('hello');
        cart.cartTotal = cart.cartTotal + 1;
        console.log(cart.cart.length);
        if(cart.cart.length==0){
            console.log('CART 0');
            cart.cart.push(item);
            cart.cartQuantity.push(1);
            $scope.CartCounter = cart.cartTotal;
            alert('ITEM ADDED TO CART');

            return;

        }

        if(cart.cart.length!=0){
            var found = cart.cart.some(function (el, i ) {

                if (el._id == item._id) {

                    console.log('CART REPLACE');

                    cart.cartQuantity[i] = cart.cartQuantity[i] + 1;
                    $scope.CartCounter = cart.cartTotal;
                    alert('ITEM ADDED TO CART');

                    return el;
                }
            });
            console.log(found);
            if (!found) {

                console.log('CART ADD');
                cart.cart.push(item);
                cart.cartQuantity.push(1);
                $scope.CartCounter = cart.cartTotal;
                alert('ITEM ADDED TO CART');

            }
        }

        console.log(cart.cart);
        console.log(cart.cartTotal);
        console.log(cart.cartQuantity);



    };

    function findAll() {
        $http.get('/specials')
            .success(function (data) {
                $scope.specials = data;
                // console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

}]);
