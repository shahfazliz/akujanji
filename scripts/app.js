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
      
      .state('error', {
        url         : '/error',
        templateUrl : 'views/error.html',
        params      : {
          toState   : '',
          toParams  : ''
        },
        data        : {
          title     : 'Error',
          model     : '',
          action    : '',
          id        : '',
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
      
      // .state('auth.register', {
      //   url         : '/register',
      //   templateUrl : 'scripts/components/Auth/register.html',
      //   controller  : 'AuthCtrl',
      //   controllerAs: 'ctrl',
      //   data        : {
      //     title     : 'Register',
      //     debugging : false
      //   }
      // })
      
      .state('auth.read', {
        url         : '/read',
        templateUrl : 'scripts/components/CRUD/read.html',
        controller  : 'AuthCtrl',
        controllerAs: 'ctrl',
        data        :{
          title     : 'Authentication Profile',
          model     : 'Auth',
          action    : 'Read',
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
          model     : 'Auth',
          action    : 'Read',
          debugging : false
        }
      })
      
      // .state('auth.login', {
      //   url         : '/login',
      //   templateUrl : 'scripts/components/Auth/login.html',
      //   controller  : 'AuthCtrl',
      //   controllerAs: 'ctrl',
      //   data        : {
      //     title     : 'Login',
      //     debugging : false
      //   }
      // })
      
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
      
      .state('role.main', {
        url         : '/',
        templateUrl : 'scripts/components/Role/main.html',
        controller  : 'MainRoleCtrl',
        controllerAs: 'ctrl',
        data        : {
          title     : 'Roles',
          model     : 'Role',
          action    : 'Read',
          debugging : false
        }
      })
      
      .state('role.create', {
        url         : '/create',
        templateUrl : 'scripts/components/CRUD/create.html',
        controller  : 'RoleCtrl',
        controllerAs: 'ctrl',
        data        : {
          title     : 'Create Role',
          model     : 'Role',
          action    : 'Create',
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
          model     : 'Role',
          action    : 'Read',
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
          model     : 'Role',
          action    : 'Read',
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
          model     : 'Baju',
          action    : 'Read',
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
          model     : 'Baju',
          action    : 'Create',
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
          model     : 'Baju',
          action    : 'Read',
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
          model     : 'Baju',
          action    : 'Read',
          debugging : false
        }
      });
  }])
  .run(['$rootScope','$state','RoleFactory','Auth','AuthFactory',function($rootScope,$state,RoleFactory,Auth,AuthFactory){
    
    // Initialize RoleList first time
    RoleFactory.reloadRoles();
    
    // Set listerner on $stateChangeStart
    // whenever state changes, check for authorization
    $rootScope.$on('$stateChangeSuccess', 
      function(event, toState, toParams, fromState, fromParams){
        
        // If at state provider did not specify properly model and action in data
        // assume it's open for public
        if(toState.data.model && toState.data.action){
          
          var authorized = false;
          RoleFactory.can(toState.data.model, toState.data.action, Auth.authentication.roles, function(){
            authorized = true;
          });
          
          if(!authorized){
            event.preventDefault();
            // transitionTo() promise will be rejected with 
            // a 'transition prevented' error
            
            AuthFactory.popUpLogin();
            $state.go('error', {toState: toState.name, toParams: toParams}, {location: false});
          }
        }
    });
  }]);