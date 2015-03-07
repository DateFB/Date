/*
    Record for a user's date suggestion.

    example:
        var dateInstance = DateInfo.createNew("user",
                new Date(2015, 03, 07, 12, 00), "The Cinema", 47.616831,
                -122.329461, true, "movie",
                "Let's watch the new Alan Turing movie!");

    userId - the unique string identifier provided by Facebook.
    dateTime - time/date of the meeting (pass in new Date(YYYY, MM, DD, hh, mm))
    blind - true or false
 */


function saveDateInfo(uid, datetime, headline, locName, locGeo, blind, purpose,
        desc, age, gender, seekmin, seekmax, seengen) {
    var DateInfo = Parse.Object.extend("DateInfo");
    var dateinfo = new DateInfo();

    dateinfo.set("UserID", "111");
    dateinfo.set("DateString", new Date());
    dateinfo.set("Headline", "Make it a double.");
    dateinfo.set("LocationName", "Starbucks");

    var point = new Parse.GeoPoint({latitude: -40, longitude: 120});
    dateinfo.set("LocationGeo", point);

    dateinfo.set("Blind", false);
    dateinfo.set("Purpose", "coffee");
    dateinfo.set("Description", "do stuff");

    dateinfo.set("PosterAge", 27);
    dateinfo.set("PosterGender", "male");

    dateinfo.set("PosterMinAgePref", 23);
    dateinfo.set("PosterMaxAgePref", 30);
    dateinfo.set("PosterGenderPref", "male");

    dateinfo.save(null, {
        success: function(dateinfo) {
            console.log("yup");
        },
        error: function(dateinfo, error) {
            console.log("nope");
        }
    });
}


var instance = saveDateInfo("111", "2015-03-17", "let's get coffee", "Starbucks", 
        -40, 120, false, "coffee", "do stuff", 27, 23, 30, "male", "male");
