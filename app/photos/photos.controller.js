'use strict';

angular.module('app.controllers')
    .controller('PhotosController', ['$scope', '$state', '$httpParamSerializer', 'photosFactory', 'commentsService',
        function($scope, $state, $httpParamSerializer, photosFactory, commentsService) {
            $scope.photos = [];
            $scope.users = [];
            var currentSearch = "";
            var currentPage = null;
            var startPage = 1;
            $scope.moreData = false;


            $scope.search = function(searchWord, event) {
                if (typeof searchWord !== 'undefined') {

                    searchWord = searchWord.trim();
                    // console.log(searchWord);

                    if (searchWord.length === 0 || currentSearch !== searchWord) {
                        $scope.photos = [];
                        $scope.users = [];
                        currentPage = null;
                        startPage = 1;
                        $scope.moreData = false;
                    }

                    if (currentPage < startPage) {
                        searchPhotos(searchWord)
                    }
                }

            }

            $scope.$watch(function() {
                return $('#photosContainer').height();
            }, function(newVal, oldVal) {
                if (newVal > oldVal) {
                    setTimeout(function() {
                        resizeUserContet();

                    }, 500)

                }
            })


            $scope.loadMore = function(searchWord) {
                startPage += 1;
                searchPhotos(searchWord);
            }

            function searchPhotos(searchWord) {

                $scope.requestInProgres = true;
                var data = {
                    'api_key': 'b3a07dd9dad31202fef2d4f72cfa05f5',
                    'text': searchWord,
                    'page': startPage,
                    'format': 'json',
                    'nojsoncallback': 1,
                    'per_page': 2,
                    'extras': "description, date_taken, owner_name, icon_server,  url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o"
                }
                currentSearch = searchWord;
                var serializedData = serializeData(data);
                photosFactory.searchPhotos(serializedData)
                    .then(function(data) {

                        if (data.photos.total > 0) {
                            var photos = data.photos.photo;
                            // $scope.photos = data.photos.photo;
                            currentPage = data.photos.page;
                            var pagesCount = data.photos.pages;
                            if (currentPage < pagesCount) {
                                $scope.moreData = true;
                            }
                            if (currentPage === 1) {
                                $scope.users = [];
                            }
                            angular.forEach(photos, function(obj, index) {
                                // console.log(obj.id);
                                obj.comments =
                                    $scope.users.push({
                                        'iconfarm': obj.iconfarm,
                                        'iconserver': obj.iconserver,
                                        'owner': obj.owner,
                                        'ownername': obj.ownername,
                                        'datetaken': obj.datetaken
                                    })
                                getPhotoLikesCount(obj);

                                $scope.requestInProgres = false;
                                $scope.noResults = false;
                            })
                        } else {
                            $scope.noResults = true;
                            $scope.requestInProgres = false;
                            $scope.photos = [];
                            $scope.users = [];
                        }
                        resizeUserContet();

                        // console.log(data);
                    })
            }

            function getPhotoLikesCount(obj) {
                var data = {
                    'api_key': 'b3a07dd9dad31202fef2d4f72cfa05f5',
                    'format': 'json',
                    'photo_id': obj.id,
                    'nojsoncallback': 1,
                }
                var serializedData = serializeData(data);
                photosFactory.getLikesCount(serializedData)
                    .then(function(data) {
                        obj.likesCount = data;
                        getPhotoComments(obj);

                    })

            }

            function getPhotoComments(obj, index) {
                obj.comments = commentsService.getComments(obj.id);
                $scope.photos.push(obj);

            }

            function serializeData(data) {
                return $httpParamSerializer(data);
            }



        }
    ])