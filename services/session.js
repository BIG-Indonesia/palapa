'use strict'

/*
 * In this service the user data is defined for the current session. Within
 * angular current session is until the page is refreshed. When the page is
 * refreshed the user is reinitialized through $window.sessionStorage at the
 * login.js file.
 */
angular.module('nodeManager').service('Session', function ($rootScope, USER_ROLES) {
  this.create = function (user) {
    console.log(user)
    this.user = user
    this.userRole = user.kelas
    this.userName = user.individualname
  }
  this.destroy = function () {
    this.user = null
    this.userRole = null
    this.userName = null
  }
  return this
})
