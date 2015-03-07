
(function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayMap);
    }
}

var gmap;
var focus;
var service;
var infowindow;

function displayMap(position) {
    focus = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
        zoom: 15,
        center: focus
    };
    gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(gmap);
}
google.maps.event.addDomListener(window, 'load', getLocation);
var catBox = document.getElementById("catbox");
catBox.addEventListener("change", updateMap);

function updateMap() {
    var cat = catBox.options[catBox.selectedIndex];
    var request = {
        location: focus,
        radius: 1000,
        types: ["" + cat.value]
    };
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    console.log(results.length);
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

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name + " - " + place.formatted_address);
        infowindow.open(gmap, this);
    });
})();
