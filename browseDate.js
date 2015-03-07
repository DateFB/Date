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
        console.log("Got here");
        query.find({
            success: function(results) {
                userInfo = results[0];

                var userQuery = new Parse.Query(Parse.Object.extend("UserInformation"));

                userQuery.equalTo("gender", userInfo.get("genderPref"));
                userQuery.greaterThanOrEqualTo("age", userInfo.get("minAge"));
                userQuery.lessThanOrEqualTo("age", userInfo.get("maxAge"));

				var DateInfo = Parse.Object.extend("Date");
				var dateQuery = new Parse.Query(DateInfo);
				dateQuery.matchesKeyInQuery("userID", "username", userQuery);
				console.log("so far so good");
				/*
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

                dateQuery.find({
                    success: displayDates,
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });

            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
	

	/*
	
	*/
};

var displayDates = function(results) {
    console.log("Display Dates was correctly called");
	if (results.length < 1) {
		$("#dateResults").html('<p>No results found. Please broaden your filters.</p>');
	} else {
		$("#dateResults").html('<p>' + results.length + 'results found!</p>');
		var html = '<div class="row">';
		for (result in results) {
			tdate = results[result];
			html += '<article class="col-md-4">';
			html += '<div class="thumbnail"><img src="' + '' + '>';
			html += '<div class="caption">';
			html += '<h3>' + tdate.get("Headline") + '</h3>';
			html += '<p>' + tdate.get("Description") + '</p>';
			html += '</div>';
			html += '<div class="map"></div>';
			html += '<div class="in-button"><button type="button" class="btn btn-primary btn-lg btn-block" data-user="' + '' + '">Check it out&hellip;</button></div>';
			html += '</div>';
			html += '</article>';
		}
		$('#dateResults').html(html);
	}
};

var loadDetail = function(user) {
	
};

/*
<article class="col-sm-6 col-md-4">
					<div class="thumbnail">
						<img src="images/Unknown.jpeg" alt="">
						<div class="caption">
							<h3>{Date Title}</h3>
							<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
						</div>
						<div class="map"></div>
						<div class="in-button"><button type="button" class="btn btn-primary btn-lg btn-block">Check It Out</button></div>
					</div>
				</article>
*/
//$(function() {
//	console.log("Ready");
//	$("#distancePref, #timePref, #categoryPref").on("change", findDates);
//	$("body").on('click', '.in-button', function() {
//		
//	});
//	findDates();
//});