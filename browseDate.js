console.log("start");
currentUser = Parse.User.current();
navigator.geolocation.getCurrentPosition(function(position) {
	currentUser.position = position; 
});

var findDates = function() {
	
	console.log("got here");
	
	var userQuery = new Parse.Query(Parse.Object.extend("UserInformation"));
	userQuery.equalTo("gender", currentUser.get("genderPref"));
	userQuery.greaterThanOrEqualTo("age", currentUser.get("minAge"));
	userQuery.lessThanOrEqualTo("age", currentUser.get("maxAge"));
/*
	userQuery.find({
		success: displayDates,
		error: alert("Problem with query.")
	});
*/
	/*
	var DateInfo = Parse.Object.extend("Date");
	var dateQuery = new Parse.Query(DateInfo);
	dateQuery.matchesKeyInQuery("userID", "username", userQuery);
	var userGeo = new Parse.GeoPoint({latitude: currentUser.position.coords.latitude, longitude: currentUser.position.coords.longitude});
	dateQuery.withinMiles("locationGeo", userGeo, currentUser.get("distancePref"));
	dateQuery.greaterThanOrEqualTo("dateTime", $("#timePref").val());
	dateQuery.equalTo("category", $("#categoryPref").val());
	dateQuery.equalTo("gender", currentUser.get("gender"));
	dateQuery.greaterThanOrEqualTo("minAge", currentUser.get("age"));
	dateQuery.lessThanOrEqualTo("maxAge", currentUser.get("age"));
	dateQuery.find({
		success: displayDates,
		error: alert("Problem with query.")
	});
	*/
};

var displayDates = function(results) {
	if (results.length < 1) {
		$("#results").html('<p>No results found. Please broaden your filters.</p>');
	} else {
		$("#results").html('<p>' + results.length + 'results found!</p>');
	}
};

$(function() {
	console.log("Ready");
	$("#distancePref, #timePref, #categoryPref").on("change", findDates);
	findDates();
});