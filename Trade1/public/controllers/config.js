myApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "views/home.html",
			controller: "HomeCtrl"
		})
		.state('log', {
			url: "/log.html",
			templateUrl: "views/home.html",
			controller: "logCtrl"
		})
		.state('register', {
			url: "/register.html",
			templateUrl: "views/home.html",
			controller: "registerCtrl"
		})
})