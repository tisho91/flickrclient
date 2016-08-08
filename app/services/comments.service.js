angular.module('app.services')
	.service('commentsService', [ function(){
		var commentsService = {};
		var comments = {};
		if(typeof localStorage.comments !== 'undefined'){
			comments = JSON.parse(localStorage.comments);
		}


		commentsService.setComment = function(id,comment){
			// var fortuneComments = [];
			if(typeof comments[id] === 'undefined'){
				comments[id] = [];
			}
			var currentComment = {
				'authorname': 'randomauthor',
				'_content' : comment,
				'iconfarm' : 0
			}
			comments[id].unshift(currentComment);
			localStorage.comments = JSON.stringify(comments);

		}
		commentsService.getComments = function(id){
			var result = [];

			if(typeof comments[id] !== 'undefined'){
				result = comments[id];
			}
			console.log(result);
			return result;
		}
		



		return commentsService;
	}])