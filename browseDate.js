var findDates = function() {
	
    currentUser = Parse.User.current();
    navigator.geolocation.getCurrentPosition(function(position) {
        currentUser.position = position; 
    });

    var userInfo;
    
    // get user info
    if (currentUser) {

        var UserInformationClass = Parse.Object.extend("UserInformation");
        var query = new Parse.Query(UserInformationClass);
        query.equalTo("fbUserName", currentUser.attributes.username);
        query.find({
            success: function(results) {
                userInfo = results[0];

                var userQuery = new Parse.Query(Parse.Object.extend("UserInformation"));

                userQuery.equalTo("gender", userInfo.get("genderPref"));
                //                userQuery.greaterThanOrEqualTo("age", userInfo.get("minAge"));
                //                userQuery.lessThanOrEqualTo("age", userInfo.get("maxAge"));

                userQuery.find({
//                success: function(results) {
//                    console.log(results[0]);
//                },
//                error: function(error) {
//                    alert("Error: " + error.code + " " + error.message);
//                }
                });
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
	

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
    console.log("Display Dates was correctly called");
	if (results.length < 1) {
		$("#results").html('<p>No results found. Please broaden your filters.</p>');
	} else {
		$("#results").html('<p>' + results.length + 'results found!</p>');
	}
};

//$(function() {
//	console.log("Ready");
//	$("#distancePref, #timePref, #categoryPref").on("change", findDates);
//	findDates();
//});