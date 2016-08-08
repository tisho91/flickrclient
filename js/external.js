function resizeUserContet(){
	var photosCollection = $('.photoWrapper');
	var usersCollection = $('.userContent');
	var len = photosCollection.length;
	for(var i = 0; i < len; i++){
		$(usersCollection[i]).height($(photosCollection[i]).height());
	}
}

function resizeDetailsContent(){
	var detailsPhotoWrapperHeight = $('.detailsPhotoWrapper').height();
	var uploaderHeight = $('.detailsUploader').height();
	var detailsPostComment = $('.detailsPostComment').height();
	var newHeight = detailsPhotoWrapperHeight - uploaderHeight - detailsPostComment - 1;
	$('.detailsComments').height(newHeight);

	// var photoDetailsContentHeight = $('.photoDetailsContent').height();
	// $('.detailsPhotoWrapper').height(photoDetailsContentHeight);
}