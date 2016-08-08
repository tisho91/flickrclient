angular.module('app.directives')
    .directive('photoItem', function() {

        scope: {
            photo: '=photoData'
        }

        return {
            controller: function($state, $scope, commentsService) {

                $scope.viewDetails = function(id) {
                    $state.go('details', {
                        id: $scope.photo.id
                    });

                }
                $scope.submitComment = function(event, photo) {
                    if (event.keyCode === 13) {
                        var commentText = event.target.value;
                        commentsService.setComment(photo.id, commentText);
                        photo.comments = commentsService.getComments(photo.id);
                        event.target.value = '';
                    }
                }
            },
            templateUrl: "app/photos/directives/photoItem/photoItem.html"
        }
    })