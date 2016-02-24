.controller('MainCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    $scope.login_google = function($event){ $event.preventDefault();
      fn.login_google();
    };
    
    $scope.login = function($event){ $event.preventDefault();
      // console.log("cond ", cond, ".checkbox.signup ", $scope.checkbox.signup);
      fn.login($scope.user, function(){
        if ($scope.checkbox.signup) fn.signup($scope.user);
      });
    };
    
var fn = {
    alert: function(msg){
        console.log(msg);
        $scope.$evalAsync(function(){
          $scope.user.alert = msg;
        });
    },
        greet: function(msg){
        $scope.$evalAsync(function(){
          $scope.user.greeting = msg;
        });
    },
    login: function(user, cb){
        if (Auth.ref_ds1.getAuth()) return;
        
        if (!user.password) {
          fn.alert("please type password");
          return;
        }
        if (fn.valid_email(user.email))
        Auth.ref_ds1.authWithPassword(user).then(function(authData) {
          authData.email = $scope.user.email;
          fn.greet(", welcome " + authData.email.split("@")[0]);
          console.log("Authenticated successfully on:", authData.email);
          document.getElementById("test").innerHTML = "my text [" + authData.email.split("@")[0] + " ]";
          window.location.reload(true);
        }).catch(function(error) {
            fn.alert(error);
            cb();
        });
        
        if (Auth.ref_ds1.getAuth()) fn.greet("- " + $scope.user.email.split("@")[0]);
    }