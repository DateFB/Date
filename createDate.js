
// (function() {
    $(function() {
        $("#datepicker").datepicker({dateFormat: "yy-mm-dd"});
        $("#timepicker").timepicker({'timeFormat': 'h:i a'});
    });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayMap);
        }
    }

    var gmap;
    var focus;
    var catBox;
    var service;
    var infowindow;
    var markers = [];

    function displayMap(position) {
        focus = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
            zoom: 15,
            center: focus
        };
        gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(gmap);

        catBox = document.getElementById("catbox");
        catBox.addEventListener("change", updateMap);
        document.getElementById("submit").addEventListener("click", makeDateInfo);
        catBox.change();
    }

    function updateMap() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
        var cat = catBox.options[catBox.selectedIndex];
        var request = {
            location: focus,
            radius: 1609,
            types: ["" + cat.value]
        };
        service.nearbySearch(request, callback);
    }

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var marker = new google.maps.Marker({
            map: gmap,
            position: place.geometry.location
        });
        markers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name + " - " + place.formatted_address);
            infowindow.open(gmap, this);
        });
    }

    function makeDateInfo() {
        var uid = Parse.User.current().attributes.username;
        var headline = document.getElementById("title").value;
        var locationName = document.getElementById("locationName").value;
        var blind = document.getElementById("blind").checked;
        var purpose = catBox.options[catBox.selectedIndex].value;
        var desc = document.getElementById("description").innerHTML;


        var userInfo;
        var currentUser = Parse.User.current();
        var UserInformationClass = Parse.Object.extend("UserInformation");
        var query = new Parse.Query(UserInformationClass);
        query.equalTo("fbUserName", currentUser.attributes.username);
        var age = 0;
        var gender = "";
        var seekmin = 0;
        var seekmax = 100;
        var seekgen = "";
        query.find({
          success: function(results) {
                userInfo = results[0];
                gender = userInfo.get("gender");
                age = userInfo.get("age");
                seekmin = userInfo.get("minAge");
                seekmax = userInfo.get("maxAge");
                seekgen = userInfo.get("genderPref");
            },
            error: function(error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });

        var date = document.getElementById("datepicker").value;
        var p0 = date.split('-');
        var time = document.getElementById("timepicker").value;
        var p1 = time.split(' ');
        var p2 = p1[0].split(':');
        var datetime = new Date(p0[0], p0[1], p0[2], p2[0], p2[1]);

        var locGeo = new Parse.GeoPoint({latitude: position.coords.latitude, longitude: position.coords.longitude});

        saveDateInfo(uid, datetime, headline, locationName, locGeo, blind, purpose, desc, age, gender, seekmin, seekmax, seekgen);
    }

    google.maps.event.addDomListener(window, 'load', getLocation);
// })();
