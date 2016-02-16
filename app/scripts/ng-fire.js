(function() {
    'use strict';
    angular
        .module("workspaceApp", ["firebase"])
        .factory("Auth", AuthService);
    
    function AuthService($firebaseAuth, $firebaseArray) {
        var ref = new Firebase("https://statusapp.firebaseio.com");
        var fb_auth = $firebaseAuth(ref);
        var auth = false;
        fb_auth.$authWithOAuthPopup("google").then(function(authData) {
            auth = true;
            console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
            auth = false;
            console.log("Authentication failed:", error);
        });    
        return {
            auth: auth,
            fb_auth: fb_auth,
            fb_array: $firebaseArray(ref)
        };
    }
})();