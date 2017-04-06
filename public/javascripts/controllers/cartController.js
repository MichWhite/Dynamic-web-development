/**
 * Created by michealin on 2/23/2017.
 */
var app = angular.module('WebApp');

app.controller('cartController',['$scope', '$http','cart', function($scope, $http,cart) {
    $scope.message = 'Your Cart';
    $scope.cart =cart.cart;




  $scope.Itemqty = function Itemqty(item){
      var index = cart.cart.indexOf(item);
      return cart.cartQuantity[index];
    };

    $scope.minusQty = function(item){
        var index = cart.cart.indexOf(item);
        cart.cartQuantity[index]=  cart.cartQuantity[index] -1;
        cart.cartTotal=   cart.cartTotal - 1;
        $scope.cartTotal =cart.cartTotal;
        console.log(cart.cartQuantity[index]);
        $scope.totalPrice = totalPrice();
        return cart.cartQuantity[index];
    };

    $scope.plusQty = function(item){
        var index = cart.cart.indexOf(item);
        cart.cartQuantity[index]=  cart.cartQuantity[index] +1;
        console.log(cart.cartQuantity[index]);

        $scope.totalPrice = totalPrice();
        cart.cartTotal =  cart.cartTotal + 1;
        $scope.cartTotal =cart.cartTotal;
        return cart.cartQuantity[index];
    };

     $scope.cartTotal = cart.cartTotal;

    function totalPrice() {
        var prices = [];
        cart.cart.forEach(function (item) {
            var index = cart.cart.indexOf(item);
        prices.push(item.price*cart.cartQuantity[index]);
    });
    return eval(prices.join('+'));
    }


    $scope.totalPrice = totalPrice();


    $scope.remove = function(item) {
        var index  =cart.cart.indexOf(item);
        if (index > -1) {
        cart.cart.splice(index, 1);
        cart.cartTotal = cart.cartTotal-cart.cartQuantity[index];
        cart.cartQuantity.splice(index, 1);
        $scope.totalPrice =  totalPrice();
        $scope.cartTotal = cart.cartTotal;


        }

    };



    $scope.Specials = allSpecails();
        function allSpecails() {
        console.log('olokojo0');
        $http.get('/specials')
            .success(function (data) {
                var PointArray = [];
                data.forEach(function(obj,i) {
                // });
                // for(var i=0; i<=data.length; i++){
                    console.log(obj);
                    console.log(obj.items);
                    console.log(obj.items.length);
                    if (cart.cart.length != 0) {
                        for(var j=0; j<=obj.items.length-1; j++) {
                            console.log(i);
                            console.log(j);
                            var ItemName = obj.items[j].name;
                            for (var y = 0; y <= cart.cart.length-1;  y++)
                            {
                            console.log("CART"+y);
                            if (cart.cart[y].name == ItemName) {
                                if (j > 0 ) {
                                    console.log('olo');
                                    PointArray[PointArray.indexOf(j)] = PointArray[PointArray.indexOf(j)] + 1;


                                }
                                else {
                                    PointArray.push(1);
                                    // $scope.Specials = data;
                                }
                            }

                        }

                    }
                        PointArray.push(1);

                    }
                    else{
                        return data;

                    }
                });
                console.log(PointArray);
                function getSorted(data, PointArray) {
                    var result = [];
                    for(var i=0; i<data.length; i++) {
                        result[i] = data[PointArray[i]];
                    }
                    console.log(result);
                    return result;
                }
                return getSorted(data, PointArray);


            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }


    $scope.addToCart = function (item) {
        cart.cartTotal = cart.cartTotal + 1;
        console.log(cart.cart.length);
        if(cart.cart.length==0){
            console.log('CART 0');
            cart.cart.push(item);
            cart.cartQuantity.push(1);
            $scope.CartCounter = cart.cartTotal;

            $scope.totalPrice = totalPrice();
            $scope.cartTotal =cart.cartTotal;
            return;

        }

        if(cart.cart.length!=0){
            var found = cart.cart.some(function (el, i ) {

                if (el._id == item._id) {

                    console.log('CART REPLACE');

                    cart.cartQuantity[i] = cart.cartQuantity[i] + 1;
                    $scope.CartCounter = cart.cartTotal;

                    $scope.totalPrice = totalPrice();
                    $scope.cartTotal =cart.cartTotal;
                    return el;
                }
            });
            console.log(found);
            if (!found) {

                console.log('CART ADD');
                cart.cart.push(item);
                cart.cartQuantity.push(1);
                $scope.CartCounter = cart.cartTotal;

                $scope.totalPrice = totalPrice();
                $scope.cartTotal =cart.cartTotal;
            }
        }


    };

}]);
