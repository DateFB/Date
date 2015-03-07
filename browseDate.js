currentUser = Parse.User.current();
navigator.geolocation.getCurrentPosition(function(position) {
	currentUser.position = position; 
});

var userQuery = new Parse.Query(Parse.UserInformation);
userQuery.equalTo("gender", currentUser.get("genderPref"));
userQuery.greaterThanOrEqualTo("age", currentUser.get("minAge"));
userQuery.lessThanOrEqualTo("age", currentUser.get("maxAge"));


var DateInfo = Parse.Object.extend("Date");
var dateQuery = new Parse.Query(DateInfo);
dateQuery.matchesKeyInQuery("userID", "username", userQuery);
var userGeo = new Parse.GeoPoint({latitude: currentUser.position.coords.latitude, longitude: currentUser.position.coords.longitude});
dateQuery.withinMiles("locationGeo", userGeo, currentUser.get("distancePref"));

