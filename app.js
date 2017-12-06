var app = angular.module("TableApp", []);
app.controller("mainController",  function($scope){

  //create an empty array which will be filled with new user objects
  $scope.users = [];

  // set id for the first new user
  $scope.id = 1;

  // function which check if given email address already exists in our array and if not push the given name, last name and email to the array.
  $scope.checkAndAddUser = function(email){
    var id = $scope.id; // set the id of the new user object
    var match = false;
    for( i=0 ; i < $scope.users.length ; i++) {
      //check if given email address is matching one of the already existing object, if yes set 'match' to true
      if($scope.users[i].email === email) {
        match = true;
        break;
      }
    }

    // if 'match' is set to true display alert with appropriate message, if 'match' is set to false add new user to the array
    if(match === true){
      alert("User with given email address already exists in our list");
    } else {
      $scope.users.push({'id': id, 'name': $scope.name, 'lastName': $scope.lastName, 'email': $scope.emailAddress});
      $scope.id++; // increase id by 1
      console.log($scope.users)
    }

    //clear inputs
    $scope.name="";
    $scope.lastName="";
    $scope.emailAddress="";
    //set form inputs back to untouched state
    $scope.addUserForm.$setPristine();
    $scope.addUserForm.$setUntouched();
  }

  //function which remove user from the array
  $scope.removeUser = function(id){
    var index;
    // take selected user id and assign it to the appropriate index of the array, then remove this specific record from the array
    for ( i=0 ; i < $scope.users.length ; i++) {
      if($scope.users[i].id === id) {
        index = i;
        break;
      }
    }
    $scope.users.splice(index, 1);
    console.log($scope.users);
  }

  // universal function that will sort ascending an array of objects according to the given key
  $scope.sortByKeyAsc = function(array, key) {
    return array.sort(function(a, b) {
      var x = a[key].toLowerCase(); var y = b[key].toLowerCase(); // set .toLowerCase to avoid problems with comparing strings with upper and lower cases
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  // universal function that will sort descending an array of objects according to the given key
  $scope.sortByKeyDesc = function(array, key) {
    return array.sort(function(a, b) {
      var x = a[key].toLowerCase(); var y = b[key].toLowerCase(); // set .toLowerCase to avoid problems with comparing strings with upper and lower cases
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

  /*function which sort strings with non-ASCII characters,strings from languages other than English( e.g with polish letters - "Łukasz").
  This function will sort array ascending */
  $scope.sortNameAsc = function() {
    return $scope.users.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  /*function which sort strings with non-ASCII characters,strings from languages other than English( e.g with polish letters - "Łukasz").
  This function will sort array descending */
  $scope.sortNameDesc = function() {
    return $scope.users.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
  }

})
