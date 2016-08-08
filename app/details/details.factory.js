'use strict';

angular.module('app.factories')
    .factory('detailsFactory', function($http) {
        var detailsFactory = {};
        detailsFactory.getPhotosDetails = function(data) {
            return $http({
                url: "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&" + data,
                method: "GET",

            }).then(function(response) {
                return response.data;
            })
        }


        return detailsFactory;
    })