angular.module('starter.controllers', [])
  .controller('mainCtrl', function($scope, $stateParams, $http, $log, $state) {

  })
  .controller('registroCTrl', function($scope, $stateParams, $http, $log, $state) {

  })
  .controller('LoginCtrl', function($scope, $stateParams, $http, $log, $state) {
    var user = firebase.auth().currentUser;
    if(user != null){
      $state.go('home');
    }

    $scope.login = function(Email, Pass){
      //alert(Email+" "+Pass);
      var email = String(Email);
      var pass = String(Pass);
      //alert(user+" "+pass);
      var mensaje = "";

      if(email == "undefined"){
        mensaje += " * Debe ingresar su usuario";
      }
      if(pass == "undefined"){
        mensaje += " * Debe ingresar su contraseña";
      }

      if(mensaje.length > 0){
        document.getElementById('mensaje').textContent =  mensaje;
      }else{
        /*
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
        */
        firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
        user = firebase.auth().currentUser;
        if(user != null){
          $state.go('home');
          //alert(user.email);
          document.getElementById('Email').value = "";
          document.getElementById('Pass').value = "";
          document.getElementById('mensaje').textContent =  "";
        }else{
          mensaje += " Email o Contraseña incorrectos";
          document.getElementById('mensaje').textContent =  mensaje;
        }
      }
    }
  })

  .controller('HomeCtrl', function($scope, $stateParams, $http, $log, $state) {
    var user = firebase.auth().currentUser;
    if(user == null){
      $state.go('login');
    }else{
      //alert(user.email);
    }

    $scope.logout = function(){
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
          //alert("logout");
          $state.go('login');
      }, function(error) {
          // An error happened.
          //alert("error");
      });
    }
  });
