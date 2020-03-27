'use strict'

angular.module('nodeManager')
nodeManager.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true
  delete $httpProvider.defaults.headers.common['X-Requested-With']
}])
nodeManager.factory('Auth', ['$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS', 'CONFIG',
  function ($http, $rootScope, $window, Session, AUTH_EVENTS, CONFIG) {
    var authService = {}

    $http.get(CONFIG.api_url + 'sisteminfo').success(function (data) {
      $rootScope.kodesimpul = data.kodesimpul.split(',', 1)[0]
      $rootScope.simpul = data.kodesimpul.split(',', 2)[1].trim()
      $rootScope.clat = data.kodesimpul.split(", ")[3];
      $rootScope.clon = data.kodesimpul.split(", ")[2];
    })
    // the login function
    authService.login = function (user, success, error) {
      // $http.get('misc/users.js').success(function (data) {
      $http({
        method: 'POST',
        url: CONFIG.api_url + 'login',
        data: user
      }).success(function (data) {
        // this is my dummy technique, normally here the 
        // user is returned with his data from the db
        var MSG = data['MSG']
        var result = data['Result']
        // console.log(data)
        // console.log(user)
        if (result) {
          console.log(data)
          // var loginData = user.username
          // insert your custom login function here 
          // if (user.username == loginData.username && user.password == loginData.username) {
          // set the browser session, to avoid relogin on refresh
          $window.sessionStorage['userInfo'] = JSON.stringify(data)

          // delete password not to be seen clientside 
          // delete loginData.password

          // update current user into the Session service or $rootScope.currentUser
          // whatever you prefer
          Session.create(data)
          // or
          $rootScope.currentUser = data

          // fire event of successful login
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess)
          // run success function
          success(data)
        } else {
          console.log(data)
          // OR ELSE
          // unsuccessful login, fire login failed event for 
          // the according functions to run
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed)
          error()
        }
      })
    }

    // check if the user is authenticated
    authService.isAuthenticated = function () {
      return !!Session.user
    }

    // check if the user is authorized to access the next route
    // this function can be also used on element level
    // e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles]
      }
      return (authService.isAuthenticated() &&
        authorizedRoles.indexOf(Session.userRole) !== -1)
    }

    // log out the user and broadcast the logoutSuccess event
    authService.logout = function () {
      Session.destroy()
      $window.sessionStorage.removeItem('userInfo')
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess)
    }

    return authService
  }
])
