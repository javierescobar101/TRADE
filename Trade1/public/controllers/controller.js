var myApp= angular.module('myApp',[]);

myApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "views/home.html",
			controller: "HomeCtrl"
		})
		.state('log', {
			url: "/log",
			templateUrl: "views/home.html",
			controller: "logCtrl"
		})
		.state('register', {
			url: "/register",
			templateUrl: "views/home.html",
			controller: "registerCtrl"
		})
})

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	console.log("Hello World from controller");
	$http.get('/contactlist').success(function(response){
		console.log("I got the data I requested");
		$scope.contactlist = response;
		$scope.contact = "";

	});


$scope.addContact = function(){
	console.log($scope.contact);
	$http.post('/contactlist', $scope.contact).success(function(response){
		console.log(response);
		
	});
};

$scope.remove = function(id){
	console.log(id);
	$http.delete('/contactlist/'  + id).success(function(response){
		

	});
};
$scope.edit = function(contact){
	console.log(contact);
	$scope.contact = contact;

}
$scope.update = function(){
	console.log($scope.contact._id);
	$http.put('/contactlist/'  + $scope.contact._id, $scope.contact).success(function(res, err){
		console.log(res);
	});
	$scope.contact = "";
}
$scope.deselect = function(){
	$scope.contact = "";
}
}])
.controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
})
// .constant('AUTH_EVENTS', {
//   loginSuccess: 'auth-login-success',
//   loginFailed: 'auth-login-failed',
//   logoutSuccess: 'auth-logout-success',
//   sessionTimeout: 'auth-session-timeout',
//   notAuthenticated: 'auth-not-authenticated',
//   notAuthorized: 'auth-not-authorized'
// })
// .constant('USER_ROLES', {
//   all: '*',
//   admin: 'admin',
//   editor: 'editor',
//   guest: 'guest'
// })
// .factory('AuthService', function ($http, Session) {
//   var authService = {};
 
//   authService.login = function (credentials) {
//     return $http
//       .post('/login', credentials)
//       .then(function (res) {
//         Session.create(res.data.id, res.data.user.id,
//                        res.data.user.role);
//         return res.data.user;
//       });
//   };
 
//   authService.isAuthenticated = function () {
//     return !!Session.userId;
//   };
 
//   authService.isAuthorized = function (authorizedRoles) {
//     if (!angular.isArray(authorizedRoles)) {
//       authorizedRoles = [authorizedRoles];
//     }
//     return (authService.isAuthenticated() &&
//       authorizedRoles.indexOf(Session.userRole) !== -1);
//   };
 
//   return authService;
// })
// .controller('ApplicationController', function ($scope,
//                                                USER_ROLES,
//                                                AuthService) {
//   $scope.currentUser = null;
//   $scope.userRoles = USER_ROLES;
//   $scope.isAuthorized = AuthService.isAuthorized;
 
//   $scope.setCurrentUser = function (user) {
//     $scope.currentUser = user;
//   };
// })
