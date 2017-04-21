var app = angular.module('WebApp');


app.controller('itemsController', ['$scope', '$http','cart', function( $scope, $http, cart) {
    findAll();
    findAllChips();
    findAllChicken();
    findAllBurger();
    findAllFish();
    findAllSausages();

    $scope.addToCart = function (item) {
        cart.cartTotal = cart.cartTotal + 1;
        console.log(cart.cart.length);
        if(cart.cart.length==0){
            console.log('CART 0');
            cart.cart.push(item);
            cart.cartQuantity.push(1);
            // $scope.CartCounter = cart.cartTotal ;
            console.log(cart.cartTotal);
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
        $http.get('/items')
            .success(function (data) {
                $scope.items = data;
                // console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    function findAllChips() {
        $http.get('/items')
            .success(function (data) {
                chipsArray =[];
                data.forEach( function (chip) {
                    if (chip.category == "chips") {
                        chipsArray.push(chip)
                    }
                });
                $scope.chips = chipsArray;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }


    function findAllChicken() {
        $http.get('/items')
            .success(function (data) {
                chickenArray =[];
                data.forEach( function (chicken) {
                    if (chicken.category == "chicken") {
                        chickenArray.push(chicken)
                    }
                });
                $scope.chickens = chickenArray;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    function findAllBurger() {
        $http.get('/items')
            .success(function (data) {
                burgerArray =[];
                data.forEach( function (burger) {
                    if (burger.category == "burger") {
                        burgerArray.push(burger)
                    }
                });
                $scope.burgers = burgerArray;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    function findAllFish() {
        $http.get('/items')
            .success(function (data) {
                fishArray =[];
                data.forEach( function (fish) {
                    if (fish.category == "Fish") {
                        fishArray.push(fish)
                    }
                });
                $scope.fishs = fishArray;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    function findAllSausages() {
        $http.get('/items')
            .success(function (data) {
                sausagesArray =[];
                data.forEach( function (sausages) {
                    if (sausages.category == "Sausages") {
                        sausagesArray.push(sausages)
                    }
                });
                $scope.Sausages = sausagesArray;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

}



]);

//
// angular.module('cacheExampleApp', []).
// controller('CacheController', ['$scope', '$cacheFactory',
//     function($scope, $cacheFactory) {
//         $scope.myArray = [
//             "one",
//             "two",
//             "three"
//         ];
//         $scope.keys = [];
//         $scope.cache = $cacheFactory('cacheId');
//         $scope.put = function(key, value) {
//             $scope.cache.put(key, value);
//             $scope.keys.push(key);
//         };
//         $scope.put("myArray", $scope.myArray);
//         $scope.put("myArray1", $scope.myArray);
//         $scope.put("myArray2", $scope.myArray);
//         angular.forEach($scope.keys,function(value, index){
//             console.log(value + " is:");
//             console.log($scope.cache.get(value));
//         });
//
//     }
// ]);
