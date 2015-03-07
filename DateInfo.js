/*
    Record for a user's date suggestion.

    example:
        var dateInstance = DateInfo.createNew("user",
                new Date(2015, 03, 07, 12, 00), "The Cinema", 47.616831,
                -122.329461, true, "movie",
                "Let's watch the new Alan Turing movie!");

    userId - the unique string identifier provided by Facebook.
    dateTime - time/date of the meeting (pass in new Date(YYYY, MM, DD, hh, mm))

 */

var DateInfo = Parse.Object.extend("Date", { }, {
    createNew: function(userID, dateTime, locationName, lat, lon, blind, category, description) {
        var d = new DateInfo();
        
        d.set("userID", userID);
        d.set("postDate", new Date());
        d.set("dateTime", dateTime);
        d.set("locationName", locationName);
        
        var point = new Parse.GeoPoint({latitude: lat, longitude: lon});
        d.set("locationGeo", point);
        
        d.set("blind", blind);
        d.set("category", category);
        d.set("description", description);
        return d;
    }
});
