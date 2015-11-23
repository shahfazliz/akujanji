'use strict';

/**
 * @ngdoc overview
 * @name workspaceApp
 * @description
 * # workspaceApp
 *
 * Main module of the application.
 */
/*global angular*/
angular.module('AkuJanji', ['ngResource','ui.router'])
  .config(['$logProvider','$stateProvider', '$urlRouterProvider', function ($logProvider, $stateProvider, $urlRouterProvider){
    
    $logProvider.debugEnabled(true);
    
    $urlRouterProvider.otherwise("/");
    
    $stateProvider
      .state('home', {
        url         : '/',
        templateUrl : 'views/main.html',
        controller  : 'MainCtrl',
        controllerAs: 'main',
        data        : {
          title     : 'Home',
          debugging : false
        }
      })
  }]);