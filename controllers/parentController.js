'use strict'

angular.module('nodeManager').controller('ParentController', ['$scope', '$rootScope', '$uibModal', 'Auth', 'AUTH_EVENTS', 'USER_ROLES',
  function ($scope, $rootScope, $modal, Auth, AUTH_EVENTS, USER_ROLES) {
    // this is the parent controller for all controllers.
    // Manages auth login functions and each controller
    // inherits from this controller	

    $rootScope.spinner = {
      active: false,
      on: function () {
        this.active = true
      },
      off: function () {
        this.active = false
      }
    }

    $scope.modalShown = false
    var showLoginDialog = function () {
      if (!$scope.modalShown) {
        $scope.modalShown = true
        var modalInstance = $modal.open({
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl',
          backdrop: 'static'
        })

        modalInstance.result.then(function () {
          $scope.modalShown = false
        })
      }
    }

    var setCurrentUser = function () {
      $scope.currentUser = $rootScope.currentUser
      $scope.simpul = $rootScope.simpul
      console.log($scope.currentUser)
      console.log($rootScope.kodesimpul)
      console.log($rootScope.simpul)
      console.log($rootScope.clat)
      console.log($rootScope.clon)
    }

    var showNotAuthorized = function () {
      alert('Not Authorized')
    }

    console.log(USER_ROLES)
    $scope.currentUser = null
    $scope.userRoles = USER_ROLES
    $scope.isAuthorized = Auth.isAuthorized

    // listen to events of unsuccessful logins, to run the login dialog
    $rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized)
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog)
    $rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog)
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog)
    $rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser)
  }
])
