'use strict';

angular.module('flickrclient',['ngSanitize','ui.router','ui.bootstrap','app.controllers', 'app.factories', 'app.services', 'app.directives','angularMoment'])
	.run(function(){
		console.log('ready')
	})


angular.module('app.controllers', []);
angular.module('app.factories', []);
angular.module('app.services', []);
angular.module('app.directives', []);