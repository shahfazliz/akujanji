/*
    Created by jebat on 01/12/2015
    Last updated by jebat on 01/12/2015
    
    Description:
    This directive is provide notification bar without relying on $rootScope
    when user already logged in or not.
*/

/*global angular*/
'use strict';
angular.module('AkuJanji').directive('notification', [function(){
    return {
        restrict: 'E',
        // sample : <Notification display='' type='' message=''/>
        scope   : {
            notificationDisplay : '=display',
            notificationType    : '=type',
            notificationMsg     : '=message'
        },
        controller: ['$scope', function($scope){
            var self = this;
            
            self.closeNotification = function(){
                $scope.notificationDisplay = false;
            };
        }],
        controllerAs: 'notificationDirective',
        templateUrl : '/scripts/components/Notification/notification.html'
    };
}]);