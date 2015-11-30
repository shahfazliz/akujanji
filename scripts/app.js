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
angular.module('AkuJanji', ['ngResource','ui.router','ngAnimate','ui.bootstrap','nvd3'])
  .config(['$stateProvider', '$urlRouterProvider', '$logProvider', function ($stateProvider,$urlRouterProvider,$logProvider){
    
    $logProvider.debugEnabled(false);
    
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
      
      .state('auth', {
        abstract    : true,
        url         : '/auth',
        
        // Note: abstract still needs a ui-view for its children to populate.
        // You can simply add it inline here.
        template: '<ui-view/>'        
      })
      
      .state('auth.register', {
        url         : '/register',
        templateUrl : 'scripts/components/Auth/register.html',
        controller  : 'AuthCtrl',
        controllerAs: 'ctrl',
        data        : {
          title     : 'Register',
          debugging : false
        }
      })
      
      .state('auth.read', {
        url         : '/read',
        templateUrl : 'scripts/components/CRUD/read.html',
        controller  : 'AuthCtrl',
        controllerAs: 'ctrl',
        data        :{
          title     : 'Authentication Profile',
          debugging : false
        }
      })
      
      .state('auth.read.id', {
        url         : '/:id',
        templateUrl : 'scripts/components/CRUD/read.html',
        controller  : 'AuthCtrl',
        controllerAs: 'ctrl',
        data        :{
          title     : 'Authentication Profile',
          debugging : false
        }
      })
      
      .state('auth.login', {
        url         : '/login',
        templateUrl : 'scripts/components/Auth/login.html',
        controller  : 'AuthCtrl',
        controllerAs: 'ctrl',
        data        : {
          title     : 'Login',
          debugging : false
        }
      })
      
      .state('auth.logout', {
        url         : '/logout',
        controller  : ['AuthFactory','$state',function(AuthFactory,$state){
          AuthFactory.setLoggedOut();
          $state.go('home');
        }],
        data        : {
          title     : 'Logout',
          debugging : false
        }
      })
      
      .state('auth.forgot', {
        url         : '/forgot',
        data        : {
          title     : 'Forgot',
          debugging : false
        }
      })
      
      .state('role', {
        abstract    : true,
        url         : '/role',
        
        // Note: abstract still needs a ui-view for its children to populate.
        // You can simply add it inline here.
        template: '<ui-view/>'    
      })
      
      .state('role.create', {
        url         : '/create',
        templateUrl : 'scripts/components/CRUD/create.html',
        controller  : 'RoleCtrl',
        controllerAs: 'ctrl',
        data        : {
          title     : 'Create Role',
          debugging : false
        }
      })
      
      .state('role.read', {
        url         : '/read',
        templateUrl : 'scripts/components/CRUD/read.html',
        controller  : 'RoleCtrl',
        controllerAs: 'ctrl',
        data        :{
          title     : 'Role',
          debugging : false
        }
      })
      
      .state('role.read.id', {
        url         : '/:id',
        templateUrl : 'scripts/components/CRUD/read.html',
        controller  : 'AuthCtrl',
        controllerAs: 'ctrl',
        data        :{
          title     : 'Role',
          debugging : false
        }
      })
      
      .state('baju', {
        abstract    : true,
        url         : '/baju',
        
        // Note: abstract still needs a ui-view for its children to populate.
        // You can simply add it inline here.
        template: '<ui-view/>'
      })
      
      .state('baju.main', {
        url         : '/',
        templateUrl : 'scripts/components/Baju/main.html',
        controller  : 'BajuCtrl',
        controllerAs: 'ctrl',
        data        :{
          title     : 'Baju',
          debugging : false
        }
      })
      
      .state('baju.create', {
        url         : '/create',
        templateUrl : 'scripts/components/CRUD/create.html',
        controller  : 'BajuCtrl',
        controllerAs: 'ctrl',
        data        :{
          title     : 'Create Baju',
          debugging : false
        }
      })
      
      .state('baju.read', {
        url         : '/read',
        templateUrl : 'scripts/components/CRUD/read.html',
        controller  : 'BajuCtrl',
        controllerAs: 'ctrl',
        data        :{
          title     : 'Baju',
          debugging : false
        }
      })
      
      .state('baju.read.id', {
        url         : '/:id',
        templateUrl : 'scripts/components/CRUD/read.html',
        controller  : 'BajuCtrl',
        controllerAs: 'ctrl',
        data        :{
          title     : 'Baju',
          debugging : false
        }
      });
  }]);