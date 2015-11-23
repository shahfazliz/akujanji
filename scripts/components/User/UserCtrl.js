/*
    Created by jebat on 26/10/2015
    Last updated by jebat on 29/10/2015
    
    Description:
    This controller is a View Model side of MVVM pattern for User that will
    interface Model with template.
*/
/*global angular*/
'use strict';
angular.module('AkuJanji').controller('UserCtrl', ['$state','User',function($state,User){
    var self = this;
    
    self.title      = $state.current.data.title;
    self.debugging  = $state.current.data.debugging;
    self.model      = User;
    
    self.style = {
        labelClassWidth: 3,
        inputClassWidth: 9,
    };
    
    var actions = {};
    actions[self.title] = function(){
        alert('Register');
    };
}]);