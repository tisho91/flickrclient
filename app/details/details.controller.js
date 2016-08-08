'use strict';

angular.module('app.controllers')
	.controller('DetailsController', ['$scope','$state','detailsFactory','$httpParamSerializer','commentsService',function($scope,$state,detailsFactory,$httpParamSerializer,commentsService){
			$scope.photo = {};
			$scope.photoId  = $state.params.id;
			getPhotoDetails($scope.photoId);
			// function to get photo details by id;
		

		function getPhotoDetails(id){
			var data = {
				'api_key':'b3a07dd9dad31202fef2d4f72cfa05f5',
				'format': 'json',
				'photo_id': id,
				'nojsoncallback':1,
			}
			var serializedData = serializeData(data);
			detailsFactory.getPhotosDetails(serializedData)
				.then(function(data){
					var photo = data.photo;
					$scope.photo = photo;
					var url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_z.jpg';
					var ownerPhoto = "";
					if(photo.owner.iconfarm != 0){
						ownerPhoto = "https://farm" + photo.owner.iconfarm + ".staticflickr.com/" + photo.owner.iconserver + "/buddyicons/" + photo.owner.nsid + ".jpg"
					}else{
						ownerPhoto = "https://www.flickr.com/images/buddyicon.gif";
					}
					$scope.photo.url = url;
					$scope.photo.ownerPhoto = ownerPhoto;
					$scope.photo.comments = commentsService.getComments(photo.id);

					// 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_z.jpg';
					// console.log(url);
					console.log(photo);
				})
		}

		$scope.$watch(function(){
			return $('.detailsPhotoWrapper').height();
		},function(newVal,oldVal){
			if(newVal>oldVal){
				setTimeout(function(){
					resizeDetailsContent();
					
				},500)
				
			}
		})

		$scope.postComment = function(commentText){
			console.log(commentText);
			commentsService.setComment($scope.photo.id,commentText);
			$scope.photo.comments = commentsService.getComments($scope.photo.id);
			$scope.newCommentText = "";
		}

		function serializeData(data){
			return $httpParamSerializer(data);
		}
		// console.log(Object.getOwnPropertyNames($state.params.photo))
	}])