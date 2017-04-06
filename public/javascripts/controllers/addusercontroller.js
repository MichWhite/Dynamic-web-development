var app = angular.module('WebApp');

app.controller('addUserController',['$scope', '$location', '$http', function($scope, $location, $http){
        //
        //
        // $scope.amount = 1000;
        // $scope.options = [{ name: "PayPal", id: 0 }, { name: "Direct", id: 1 }];
        // $scope.formData.paymentOptions = $scope.options[0];
        //
        // //Reset our formData fields
        // $scope.formData.paymenttype = 'PayPal';
        // $scope.formData.amount = 1000;
        // $scope.formData.upvotes = 0;



        $scope.formData = {};

    $scope.name = "";
    $scope.formData.email = "";
    $scope.formData.password = "";

    $scope.addUser = function(){
        $scope.formData.email = $scope.formData.email;
        $scope.formData.name = $scope.formData.name;
        $scope.formData.password = $scope.formData.password;
        $http.post('/', $scope.formData)
            .success(function(data) {
                $scope.users = data;
                $location.path('/');
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
     }

  ]);
