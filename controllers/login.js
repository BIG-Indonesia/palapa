'use strict';

angular.module('nodeManager')
    .controller('LoginCtrl', ['$scope', '$state', '$uibModalInstance', '$window', 'Auth', '$base64',
        function($scope, $state, $uibModalInstance, $window, Auth, $base64) {
            $scope.credentials = {};
            $scope.loginForm = {};
            $scope.error = false;

            //when the form is submitted
            $scope.submit = function() {
                $scope.submitted = true;
                if (!$scope.loginForm.$invalid) {
                    $scope.login($scope.credentials);
                } else {
                    $scope.error = true;
                    return;
                }
            };

            //Performs the login function, by sending a request to the server with the Auth service
            $scope.login = function(credentials) {
                // console.log(credentials)
                $scope.error = false;
                Auth.login(credentials, function(user) {
                    //success function
                    $uibModalInstance.close();
                    $state.go('home');
                }, function(err) {
                    $scope.error = true;
                });
            };

            // if a session exists for current user (page was refreshed)
            // log him in again
            if ($window.sessionStorage["userInfo"]) {
                var credentials = JSON.parse($window.sessionStorage["userInfo"]);
                credentials.password = $base64.decode(credentials.password)
                $scope.login(credentials);
            }

        }
    ]);