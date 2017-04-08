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

            $scope.Specials = allSpecails();

        }

    };


    $scope.Specials = allSpecails();
        function allSpecails() {
        $http.get('/specials')
            .success(function (data) {
                if(cart.cart.length==0) {
                    $scope.Specials = data;
                }
                else{
                var SpecialNamesArray = [];
                for(var o =0; o<data.length; o++){
                    console.log(o);
                    var nameArray=[];
                   for(var  t=0; t<data[o].items.length; t++){
                        var nameItem =data[o].items[t].name;
                        nameItem = nameItem.replace(/[0-9] /g, '');
                       // console.log(nameItem);
                           if(t==0) {

                               nameArray.push(nameItem);
                           }
                           else if(t==data[o].items.length-1){
                               nameArray.push(nameItem);
                               SpecialNamesArray.push(nameArray)

                           }

                           else{
                               nameArray.push(nameItem);

                           }


                   }
                }
                console.log(SpecialNamesArray);

            for(var i = 0; i < cart.cart.length; i++) {
                for (var j = 0; j < SpecialNamesArray.length; j++) {
                    for (var q = 0; q < SpecialNamesArray[j].length; q++) {
                        console.log(cart.cart[i].name);
                        console.log(SpecialNamesArray[j][q]);
                        var newcaritem = cart.cart[i].name.replace(/[0-9] /g, '');
                        if (newcaritem == SpecialNamesArray[j][q]) {
                            console.log(j);
                            console.log(q);
                            console.log(data[j]);
                            console.log('nnnnnnnn');

                            if(q==0) {//if firstt special items then push once else add one
                                data[j].Point = 1;
                            }
                            else {
                                data[j].Point = data[j].Point+1;
                                console.log(data[j].Point);
                            }

                        }
                    }
                }
            }

                for(var p=0; p<data.length; p++) {
                    if(isNaN(data[p].Point)) {
                        data[p].Point = 0
                    }
                    }


                    data.sort(function (a, b) {
                        return b.Point - a.Point;
                    });
                    console.log(data);

                    $scope.Specials = data;

                }
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
