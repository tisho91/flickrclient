'use strict';

angular.module('app.directives')
    .directive('photoUser', function() {

        scope: {
            user: '=userData'
        }

        return {
            templateUrl: "app/photos/directives/photoUser/photoUser.html"
        }
    })