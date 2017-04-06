var app = angular.module('WebApp', ['ngRoute']);



app.factory('cart', function() {
    var cart = [];
    var cartQuantity = [];
    var cartTotal = 0;

    return {
        cart:cart,
        cartQuantity:cartQuantity,
        cartTotal: cartTotal
    }
});

app.config(function($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl : 'pages/home.ejs',
                controller  : 'mainController'
            })

            .when('/edit', {
                templateUrl : 'pages/addItem.ejs',
                controller  : 'addItemController'
            })

            .when('/admin', {
                templateUrl : 'pages/admin.ejs',
                controller  : 'adminController'
            })
            .when('/cart', {
                templateUrl : 'pages/cart.ejs',
                controller  : 'cartController'
            })

            .when('/register', {
                templateUrl : 'pages/signup.ejs',
                controller  : 'addUserController'
            })

            .when('/specials', {
                templateUrl : 'pages/specials.ejs',
                controller  : 'specialsController'
            })

            .when('/items', {
                templateUrl : 'pages/items.ejs',
                controller  : 'itemsController'
            });
    });


  
  


