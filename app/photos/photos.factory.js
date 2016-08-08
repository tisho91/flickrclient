angular.module('app.factories')
    .factory('photosFactory', ['$http',
        function($http) {

            var photosFactory = {};

            photosFactory.searchPhotos = function(data) {
                return $http({
                    url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&" + data,
                    method: "GET"

                }).then(function(response) {
                    // console.log(response);
                    return response.data;
                })
            }
            photosFactory.getLikesCount = function(data) {
                return $http({
                    url: "https://api.flickr.com/services/rest/?method=flickr.photos.getFavorites&" + data,
                    method: "GET"

                }).then(function(response) {
                    // console.log(response);
                    return response.data.photo.total;
                })

            }

            photosFactory.getComments = function(data) {
                return $http({
                    url: "https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&" + data,
                    method: "GET"

                }).then(function(response) {
                    // console.log(response);
                    return response.data;
                })
            }


            return photosFactory;
        }
    ])