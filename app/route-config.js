'use strict'

angular.module('flickrclient')
	.config(['$urlRouterProvider','$stateProvider',function( $urlRouterProvider,$stateProvider) {
		$stateProvider
			.state('photos',{
				url: '/photos',
	            controller: 'PhotosController',
	            templateUrl: 'app/photos/photos.html'
			})
			.state('details',{
				url: '/photos/:id',
	            controller: 'DetailsController',
	            templateUrl: 'app/details/details.html',
	            params: {
                    id: null,
                    photo: {}
                }
			})

		$urlRouterProvider.otherwise('/photos');
	}])